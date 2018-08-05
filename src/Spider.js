const cheerio = require('cheerio')
const requestHtml = require('./request')
const { forEach, addProperty, getValueByRule } = require('./util/tool')
const chalk = require('chalk')

class Spider {
    constructor(option) {
        this.links = option.links
        this.callback = option.callback
        this.delay = option.delay
        this.timeout = option.timeout
    }
    setOptions({ name, url, path, encode }) {
        this.name = name || this.name
        this.url = url || this.url
        this.path = path || this.path
        this.encode = encode || this.encode
        return this
    }
    start(links = this.links) {
        this.go(links, {}, true)
    }

    async go (links, output = {}, isOut = false) {
        forEach(links, link => {
            let $
            try {
                $ = await requestHtml(link.url)
            } catch (e) {
                console.log(chalk.yellow(`获取 ${url.link} 页面发生错误！\n`))
                console.log(chalk.blue(`${e.stack}`))
            }
            forEach(rules, rule => {
                getValueByRule($, rule.list, rule.rule)
            })

            if (this.callback) {
                this.callback(output)
            }
        })
    }
}

module.exports = Spider