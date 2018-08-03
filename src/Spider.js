const requestHtml = require('./request')
const cheerio = require('cheerio')

class Spider {
    constructor({ name, url, path, encode }) {
        this.name = name
        this.url = url
        this.path = path
        this.encode = encode
    }
    setOptions({ name, url, path, encode }) {
        this.name = name || this.name
        this.url = url || this.url
        this.path = path || this.path
        this.encode = encode || this.encode
        return this
    }
    async start() {
        await this.getHtml({ 
            url: this.url, 
            encode: this.encode 
        })
        const $ = this.get$()
        console.log($(this.path))
    }
    async getHtml({ url, encode }) {
        const html = this.html = await requestHtml(url, encode)
        return html
    }
    get$ () {
        if (!this.html) {
            return new Error('没有获取到html，调用 getHtml 获取html')
        }
        const $ = this.$ = cheerio.load(this.html)
        return $
    }
}

module.exports = Spider