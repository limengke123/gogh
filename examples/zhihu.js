const Araneida = require('../src/index')
const config = require('./config')

const spider = new Araneida({
    links: config.zhihu,
    done: data => {
        console.log(data)
    }
})

spider.start()
