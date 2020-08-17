const cacheName = 'v1.7'
getCache = function(){
    return new Promise((res) => {
        fetch('/cache', {
            method: 'post',
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'body=true'
        }).then(result => result.json()).then(result => {
            if (result.error === false) {
                return res(result.cache)
            } else {
                return res(['/'])
            }
        }).catch(err => {
            console.log(err)
            return res(['/'])
        })
    })
}
resetCache = async () => {
    console.log('reseting caches')
    await caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames.map(cache => {
                if (cache !== cacheName) {
                    caches.delete(cache)
                }
            }))}).catch(e => { console.log(e) })
    await caches.open(cacheName).then(cache => {
        getCache().then(cacheItems => {
            for (i = 0; i < cacheItems.length; i++) {
                let that = cacheItems[i]
                caches.match(cacheItems[i]).then(result => {
                    if (!result) {
                        cache.add(that)
                    }
                })
            }
            caches.match('/').then(result => {
                if (!result) cache.add('/')
            })
        }).catch(err => {
            console.log(err)
        })
    }).catch(er => { console.log(er)})
    console.log('UPDATED CACHES')
    return true
}
self.addEventListener('message', function (evt) {
    console.log('postMessage received' + evt.data);
    if (evt.data.updateCache) {
        resetCache()
    }
})
self.addEventListener('install', (e)=>{
    console.log('IDMSW INSTALLED')
    e.waitUntil(caches.open(cacheName).then(cache => {
        getCache().then(cacheItems => {
            for (i = 0; i < cacheItems.length; i++) {
                let that = cacheItems[i]
                caches.match(cacheItems[i]).then(result => {
                    if (!result) {
                        cache.add(that)
                    }
                })
            }
            caches.match('/').then(result => {
                if (!result) cache.add('/')
            })
        }).catch(err => {
            console.log(err)
        })
    }).catch(er => { console.log(er)})
    )
})
self.addEventListener('activate', (e)=>{
    console.log('IDMSW ACTIVATED')
    e.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames.map(cache => {
                if (cache !== cacheName) {
                    caches.delete(cache)
                }
            })
        )
    }).catch(er => {console.log(er)}))
})
self.addEventListener('fetch', (e) => {
    console.log(e.request.url)
    if (/update-cache/.test(e.request.url)) {
        return resetCache()
    }
    e.respondWith(caches.match(e.request).then(res => {
        if (!res) {
            return fetch(e.request)
        } else {
            return res
        }
    }))
})