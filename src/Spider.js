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
            // console.log(chalk.yellow(link.url))
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
                    for (let i = 0, length = _data.length; i < length; i++) {
                        let d = _data[i]
                        // console.log(rule.links)
                        forEach(rule.links, link => {
                            link.url = this.getUrl(this.links.url, d.url)
                            console.log(link.url)
                        })
                        // 零时搞一个延迟先
                        if (this.delay) {
                            await this.wait(this.delay)
                        }
                        d.links = []
                        await this.go(rule.links, d.links)
                        // console.log(_linkResult)
                    }
                    // forEach(_data, async d => {
                    //     console.log('start')
                    //     // console.log(rule.links)
                    //     forEach(rule.links, link => {
                    //         // console.log(link.url)
                    //         link.url = this.getUrl(this.links.url, d.url)
                    //         // console.log(chalk.red(link.url))
                    //     })
                    //     console.log(2)
                    //     // 零时搞一个延迟先
                    //     if (this.delay) {
                    //         await this.wait(5000)
                    //     }
                    //     console.log(3)
                    //     const _linkResult = await this.go(rule.links, [])
                    //     // console.log(_linkResult)
                    //     d.links = _linkResult
                    //     if (isOut && this.callback) {
                    //         this.callback(data)
                    //     }
                    // })
                    
                }
                data.push(_data)
                if (isOut && this.callback) {
                    this.callback(data)
                }
            })
            output.push(data)
        })
        return output
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