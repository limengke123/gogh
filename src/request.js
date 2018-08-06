const request = require('request')
// const request = require('http').request
const iconv = require('iconv-lite')
const cheerio = require('cheerio')

/**
 * 根据 url 获取页面
 * @param {string} url - 请求路径
 * @param {string} encode - 页面编码方式
 * @param {boolean} return$ - 是否直接返回 $ 对象
 */
const requestHtml = (url, encode = 'utf8', return$ = true) => {
    return new Promise((resolve, reject) => {
        if (!url) {
            reject("requestHtml 缺少必要的 url 参数")
        }
        request.get({
            url: url,
            encoding: null
        }, (err, res, body) => {
            if (err) {
                reject(err)
            }
            const htmlString = iconv.decode(body, encode)
            if (return$) {
                resolve(cheerio.load(htmlString))
            } else {
                resolve(htmlString)
            }
        })
    })
}

/**
 * 
 * @param {number} delayTime - 延迟时间
 * @param {string} url - 请求路径
 * @param {string} encode - 页面编码方式
 * @param {boolean} return$ - 是否直接返回 $
 */
const delayRequestHtml = function (delayTime, url, encode = 'utf8', return$ = true) {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            try {
                const result = await requestHtml(url, encode, return$)
                resolve(result)
            } catch (error) {
                reject(error)
            }
        }, delayTime)
    })
}



module.exports = {
    requestHtml,
    delayRequestHtml,
}