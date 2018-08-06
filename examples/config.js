var iqiyi = {
    title: "爱奇艺列表",
    hash: "1",
    url: "http://www.iqiyi.com/lib/dianying/,,_11_1.html",
    rules: [{
        list: "ul.site-piclist li",
        rule: {
            url: {
                type: "href",
                text: "div.site-piclist_pic a"
            },
            title: {
                type: "title",
                text: "div.site-piclist_pic a"
            }
        },
        links: [{
            title: "爱奇艺内容",
            rules: [{
                    rule: {
                        title: {
                            type: "text",
                            text: "h1.main_title a"
                        },
                        content: {
                            type: "text",
                            text: 'p[data-movlbshowmore-ele="whole"]'
                        }
                    }
                },
                {
                    key: "before",
                    list: '.relatedVideoInfo li',
                    // list: 'ul[data-albumtab-name="预告片"] li',
                    rule: {
                        address: {
                            type: "href",
                            text: "a"
                        },
                        title: {
                            type: "title",
                            text: "a"
                        }
                    }
                },
                {
                    key: "daoyan",
                    list: 'p.episodeIntro-director a',
                    // list: 'em[rseat="导演"] a',
                    rule: {
                        name: {
                            type: "title"
                        },
                        address: {
                            type: "href"
                        }
                    }
                }
            ]
        }]
    }]
}

module.exports = [iqiyi]