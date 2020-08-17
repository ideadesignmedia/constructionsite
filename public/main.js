if('serviceWorker' in navigator) {
    console.log('service worker is enabled')
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(result => {
            console.log('IDMSW Registered TODAY');
            let date = sessionStorage.getItem('idmdate')
            let cDate = sessionStorage.getItem('cDate')
            if (!date) {
                sessionStorage.setItem('idmdate', new Date().toString())
            } else {
                let today = new Date()
                let time = Math.abs(today - new Date(date))
                if (time >= (1000*60*60*8)) {
                    sessionStorage.clear()
                    sessionStorage.setItem('idmdate', new Date().toString())
                }
            }
            if (!cDate) {
                sessionStorage.setItem('cDate', new Date().toString())
            } else {
                let today = new Date()
                let time = Math.abs(today - new Date(cDate))
                if (time > 1000*60*60*92) {
                    console.log('sent request')
                    let that = new XMLHttpRequest()
                    that.onerror = () => {console.log('main')}
                    that.onabort = () => {console.log('main')}
                    that.onreadystatechange = () => {
                        if (that.readyState === 4) return console.log('main')
                    }
                    that.open('get', '/update-cache')
                    that.send()
                    sessionStorage.setItem('cDate', new Date().toString())
                }
            }
        }).catch((e) => {
            console.log(`IDMSW error: ${e}`)
        })
    })
}