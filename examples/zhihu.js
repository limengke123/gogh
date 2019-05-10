const Araneida = require('../src/index')
const config = require('./config')
const url = 'http://www.baidu.com/s?wd=天气'
const spider = new Araneida({
    links: {
        url: url,
        rules: {
            rule: {
                temp: {
                    path: 'span.op_weather4_twoicon_shishi_title',
                    type: 'text'
                }
            }
        }
    },
    done: data => {
        console.log(data)
    }
})

spider.start()
