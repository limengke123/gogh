var iqiyi = {
    title: "爱奇艺列表",
    hash: "1",
    url: "http://www.iqiyi.com/lib/dianying/,,_11_1.html",
    rules: [{
        list: "ul.site-piclist li",
        rule: {
            url: {
                type: "href",
                path: "div.site-piclist_pic a"
            },
            title: {
                type: "title",
                path: "div.site-piclist_pic a"
            }
        },
        links: [{
            title: "爱奇艺内容",
            rules: [{
                    rule: {
                        title: {
                            type: "text",
                            path: "h1.main_title a"
                        },
                        content: {
                            type: "text",
                            path: 'p[data-movlbshowmore-ele="whole"]'
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
                            path: "a"
                        },
                        title: {
                            type: "title",
                            path: "a"
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

var iqiyi2 = {
    title: "爱奇艺列表",
    hash: "1",
    url: "http://www.iqiyi.com/lib/dianying/,,_11_1.html",
    rules: [{
        list: "ul.site-piclist li",
        rule: {
            url: {
                type: "href",
                path: "div.site-piclist_pic a"
            },
            title: {
                type: "title",
                path: "div.site-piclist_pic a"
            }
        },
        links: [{
            title: "爱奇艺内容",
            rules: [{
                    rule: {
                        title: {
                            type: "text",
                            path: "h1.main_title a"
                        },
                        content: {
                            type: "text",
                            path: 'p[data-movlbshowmore-ele="whole"]'
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
                            path: "a"
                        },
                        title: {
                            type: "title",
                            path: "a"
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

var segementFault = {
    title: 'segementFault',
    url: 'https://segmentfault.com/blogs?page=1',
    rules: {
        list: "div.blog-stream section",
        rule: {
            url: {
                type: "href",
                path: "h2.title a"
            },
            title: {
                type: "text",
                path: "h2.title a"
            },
            author: {
                type: "text",
                path: "ul.author span a:first-child"
            }
        },
        links: {
            rules: [
                {
                    list: 'ul.article__title--tag li',
                    rule: {
                        tagName: {
                            path: 'a',
                            type: 'data-original-title'
                        }
                    }
                }
            ]
        }
    }
}

module.exports = {
    iqiyi: [iqiyi],
    iqiyi2: iqiyi2,
    segementFault
}