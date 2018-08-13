const urlResolve = require('url').resolve
const {requestHtml} = require('./request')
const { forEach, getValueByRule } = require('./util/tool')
const chalk = require('chalk')
const ora = require('ora')
const spinner = ora({
    spinner: 'dots'
})

class Spider {
    constructor(option) {
        this.links = option.links
        this.callback = option.callback
        this.done = option.done
        this.infos = option.infos
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
        this.go(links, [], true)
    }

    async go (links, output = [], isOut = false) {
        if(!Array.isArray(links)) {
            links = [links]
        }
        for(let i = 0, len = links.length; i < len; i++) {
            let link = links[i]
            let $
            let data = []
            try {
                $ = await requestHtml(link.url)
            } catch (e) {
                console.log(chalk.yellow(`获取 ${link.url} 页面发生错误！\n`))
                console.log(chalk.blue(`${e.stack}`))
            }
            if (!Array.isArray(link.rules)) {
                link.rules = [link.rules]
            }
            for(let k = 0, len = link.rules.length; k < len; k++) {
                let rule = link.rules[k]
                let _data = getValueByRule($, rule.list, rule.rule)
                if(rule.links) {
                    for (let i = 0, length = _data.length; i < length; i++) {
                        let d = _data[i]
                        let singleInfo
                        forEach(rule.links, link => {
                            singleInfo = link.url = this.getUrl(this.links.url, d.url)
                        })
                        if (this.delay) {
                            await this.wait(200)
                        }
                        d.links = []
                        spinner.start()
                        if (this.infos) {
                            let text = '耗时'
                            if (Array.isArray(rule.links)) {
                                text = `${singleInfo} 耗时`
                            }
                            text = chalk.yellow.bold(text)
                            console.time(text)
                            await this.go(rule.links, d.links)
                            console.timeEnd(text)
                        } else {
                            await this.go(rule.links, d.links)
                        }
                        spinner.stop()
                    }
                }
                data.push(_data)
            }
            output.push(data)
            if (this.callback && !isOut) {
                this.callback(data)
            }
        }
        if (links.length === 1) {
            output = output[0]
        }
        if(isOut) {
            if (this.done) {
                this.done(output)
            }
            return this
        } else {
            return output
        }
    }
    
    /**
     * 根据需要跳转 link 类型得到 跳转绝对 url。针对相对路径和绝对路径做处理。
     * @param {string} hosturl - 原始的 link 路径
     * @param {string} url - 需要跳转的 link  路径
     * @returns {string} absoluteUrl - 跳转的绝对 url
     */
    getUrl (hosturl, url) {
        return /^https?:/.test(url) ? url : urlResolve(hosturl, url)
    }

    wait (time) {
        return new Promise(resolve => setTimeout(resolve, time))
    }
}

module.exports = Spider