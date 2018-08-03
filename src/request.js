const request = require('request')
// const request = require('http').request
const iconv = require('iconv-lite')

requestHtml = (url, encode = 'utf8') => {
    return new Promise((resolve, reject) => {
        request.get({
            url: url,
            encoding: null
        }, (err, res, body) => {
            if (err) {
                reject(err)
            }
            const htmlString = iconv.decode(body, encode)
            resolve(htmlString)
        })
    })
}

module.exports = requestHtml