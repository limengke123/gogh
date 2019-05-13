const Spider = require('../src/index')
const config = require('./config')
const chalk = require('chalk')

const doubanSpider = new Spider({
    links: config.douban,
    infos: true,
    callback: function (data) {
        console.log(chalk.blue(JSON.stringify(data)))
    },
    done: function (data) {
        console.log(chalk.green('抓取结束 \n'))
        console.log(JSON.stringify(data))
        console.log(doubanSpider.$.html())
    },
    allPageDone: function () {
        console.log('all spidering works are finished!')
    },
    delay:100,
})

doubanSpider.start()
