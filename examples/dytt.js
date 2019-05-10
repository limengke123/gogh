const Spider = require('../src/index')
const config = require('./config')
const chalk = require('chalk')

const segSpider = new Spider({
    links: config.dytt,
    infos: true,
    callback: function (data) {
        console.log(chalk.blue(JSON.stringify(data)))
    },
    done: function (data) {
        console.log(chalk.green('抓取结束 \n'))
        console.log(JSON.stringify(data))
    },
    allPageDone: function () {
        console.log('all spidering works are finished!')
    },
    delay:100,
    encode: 'gbk',
})

segSpider.start()
