const Spider = require('../src/index')
const config = require('./config')
const chalk = require('chalk')

const segSpider = new Spider({
    links: config.segementFault,
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
    page: (function () {
        let index = 2
        let result
        return function () {
            if (index > 5) {
                result = false
            } else {
                result = `https://segmentfault.com/blogs?page=${index}`
            }
            index ++
            return result
        }
    })()
})

segSpider.start()
