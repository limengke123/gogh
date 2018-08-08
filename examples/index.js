const Spider = require('../src/index')
const config = require('./config')

// const doubanSpider = new Spider({
//     name: '豆瓣音乐',
//     url: 'https://music.douban.com/artists/',
//     path: '#wrapper #content h1'
// })

// const dyttSpider = new Spider({
//     name: '电影天堂',
//     url: 'http://www.dytt8.net/',
//     encode: 'gb2312'
// })

// const doubanMainSpider = new Spider({
//     name: '豆瓣主页',
//     url: 'https://book.douban.com/',
//     encode: '#content > div > div.article > div.section.books-express > div.bd > div > div > ul:nth-child(2) > li > div.cover > a'
// })

// doubanSpider.start()
//     .then(resp => {
//         // console.log(resp)
//     }).catch(err => {
//         console.log(err)
//     })

// dyttSpider.start()
//     .then(resp => {
//         console.log(resp)
//     }).catch(err => {
//         console.log(err)
//     })

// doubanMainSpider.start()
//     .then(resp => {
//         //console.log(resp)
//     }).catch(err => {
//         console.log(err)
//     })

const iqiSpider = new Spider({
    links: config,
    callback: function (data) {
        console.log(JSON.stringify(data))
    },
    delay:1000
})

iqiSpider.start()