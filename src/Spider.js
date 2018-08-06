const urlResolve = require('url').resolve
const {requestHtml} = require('./request')
const { forEach, getValueByRule } = require('./util/tool')
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
        this.go(links, [], true)
    }

    async go (links, output = [], isOut = false) {
        forEach(links, async link => {
            if (!link.url) return
            let $
            let data = []
            try {
                $ = await requestHtml(link.url)
            } catch (e) {
                console.log(chalk.yellow(`获取 ${link.url} 页面发生错误！\n`))
                console.log(chalk.blue(`${e.stack}`))
            }
            forEach(link.rules, async rule => {
                let _data = getValueByRule($, rule.list, rule.rule)
                if(rule.links) {
                    if (rule.list) {
                        forEach(_data, async d => {
                            d.links = []
                            rule.links.forEach(async link => {
                                if (!link.url) {
                                    if(!_data.url) {
                                        return
                                    }
                                    link.url = this.getUrl(this.links.url, d.url)
                                    console.log(chalk.red(link.url))
                                }
                            })
                            // 零时搞一个延迟先
                            if (this.delay) {
                                await this.wait(this.delay)
                            }
                            await this.go(rule.links, d.links)
                        })
                    } else {
                        // _data.url = this.getUrl(this.links.url, _data.url)
                        _data.links = []
                        rule.links.forEach(link => {
                            if (!link.url) {
                                if(!_data.url) {
                                    return
                                }
                                link.url = this.getUrl(this.links.url, _data.url)
                                console.log(chalk.red(link.url))
                            }
                        })
                        // 零时搞一个延迟先
                        if (this.delay) {
                            await this.wait(this.delay)
                        }
                        await this.go(rule.links, _data.links)
                    }
                }
                data.push(_data)
            })

            output.push(data)

            if (isOut && this.callback) {
                this.callback(data)
            }
        })
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