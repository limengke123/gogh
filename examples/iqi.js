const fs = require('fs')
const path = require('path')
const Spider = require('../src/index')
const config = require('./config')
const chalk = require('chalk')

const resultPath = path.resolve(__dirname, '../resultData.json')

const iqiSpider = new Spider({
    links: config.iqiyi,
    infos: true,
    callback: function (data) {
        console.log(chalk.blue(JSON.stringify(data)))
    },
    done: function (data) {
        console.log(chalk.green('抓取结束'))
        fs.writeFileSync(resultPath, JSON.stringify(data), 'utf8')
    },
    delay:100
})

iqiSpider.start()
