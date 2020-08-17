// REQUIREMENTS FOR APP TO RUN
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const loggingtool = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongo = require('mongoose')
const fs = require('fs');
const track = require('./api/sessions/track.js')
app.set('trust proxy', true);
dotenv.config();
app.use(loggingtool('dev'));
mongo.connect("mongodb://localhost/db1", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => console.log('Successful MongoDB Connection'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/sw.js', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/javascript' })
    fs.readFile('./IDM_SW.js', (error, data) => {
        if (error) {
            res.write('404 error: page failed')
        } else {
            res.write(data)
        }
        res.end()
    })
})
app.use('/manifest.webmanifest', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/web+manifest'})
    fs.readFile('./manifest.webmanifest', (err, data) => {
        if (err) {
            res.write('404 error: page failed')
        } else {
            res.write(data)
        }
        res.end()
    })
})
app.use('/cache', track, async (req, res) => {
    let arr = []
    let readFiles = function(){
        return new Promise((res) => {
            fs.readdir('./public/cache', (err, data) => {
                if (err) {
                    console.log('Unable to scan directory: ' + err);
                }
                if (!data) {
                    return res(true)
                }
                for (i = 0; i < data.length; i++) {
                    arr.push(`/static/cache/${data[i]}`)
                    if (i === data.length - 1) {
                        return res(true)
                    }
                }
            })
        })
    }
    readFiles().then(result => {
        return res.status(200).json({
            error: false,
            cache: arr
        })
    }).catch(e => {
        return res.status(500).json({
            error: true,
            message: e
        })
    })
})
app.use('/robots.txt', (req, res) => {
    res.writeHead(200, {'Content-type': 'text'})
    fs.readFile('./robots.txt', (err, data) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'Issue Processing Your Request'
            })
        } else {
            res.write(data)
        }
        res.end()
    })
})
app.use('/static', express.static('./public'))
//ROUTING
const Visitor = require('./api/models/visitor')
app.post('/idm/tracking', (req, res) => {
    let page = req.body.page
    let target = req.body.target
    let event = req.body.event
    if (event && page && target) {
        const cat = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim() || req.ip
        let dateDisplay = new Date();
        Visitor.findOne({ip: cat}).then(result => {
            if (!result) {
                let visitor = new Visitor({
                    _id: new mongo.Types.ObjectId(),
                    ip: cat,
                    visits: 1,
                    visit: [{
                        date: dateDisplay,
                        page: [page, {target: target, event: event}]
                    }]
                })
                visitor.save().then(()=>{
                    return res.status(200).json({
                        error: false
                    })
                }).catch((e) => {
                    res.status(500).json({
                        message: 'PAGE FAILED PLEASE TRY AGAIN | IDM Error Code:5991'
                    });
                });      
            } else if (result) {
                result.visits += 1
                result.visit.push({date: dateDisplay, page: [page, {target: target, event: event}]})
                result.save().then(() => {
                    return res.status(200).json({
                        error: false
                    })
                }).catch((e) => {
                res.status(500).json(
                    {message: 'PAGE FAILED PLEASE TRY AGAIN | IDM Error Code:5990'}
                    );
                });
            }
        }).catch((e)=>{
            res.status(500).json({
                message: 'PAGE FAILED PLEASE TRY AGAIN | IDM Error Code:5989'
            });
        });
    }
})
const Lead = require('./api/models/lead')
app.post('/get-started', (req, res, next) => {
    if (!req.body || req.body == 'null') {
        return res.status(500).json({
            error: true,
            message: 'Empty Body'
        })
    } else {
        if (!req.body.firstName && req.body.lastName) {
            return res.status(500).json({
                error: true,
                message: 'Please enter your first and last name.'
            })
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
            return res.status(500).json({
                error: true,
                message: 'Invalid Email Address'
            })
        } else if (!/^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/.test(req.body.phone)) {
            return res.status(500).json({
                error: true,
                message: 'Invalid Phone Number, Must be 10 digits'
            })
        }
        let fname = req.body.firstName
        let lname = req.body.lastName
        let email = req.body.email
        let phone = req.body.phone
        let name = `${fname} ${lname}`
        let ip = req.ip
        console.log(`${name} ${phone} ${email}`)
        let a = new Lead ({
            _id: new mongo.Types.ObjectId(),
            name: name,
            email: email,
            phone: phone,
            ips: [{ip: ip}]
        })
        a.save().then(result => {
            return res.status(200).json({
                error: false,
                info: {
                    requestNumber: result._id,
                    name: result.name
                },
                message: 'Thank you for requesting our services. We will be in contact with you shortly.'
            })
        }).catch(e => {
            console.log(e)
            return res.status(500).json({
                error: true,
                message: 'Issue processing your request, please check back later.'
            })
        })
    }
})
//ROUTING
app.use('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile('./index.html', (error, data) => {
        if (error) {
            res.write('404 error: page failed')
        } else {
            res.write(data)
        }
        res.end()
    })
})
app.use((req, res, next) => {
    const error = new Error('page not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app