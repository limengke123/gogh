# spider

## 用法

```js

const option = {
    links, // 爬取基本设置
    callback, // 爬取单条时的回调
    done, // 全部爬取完毕的回调
    delay, // 爬取时的延迟设置
    timeout, // 超时时间
}

const spider = new Spider(option)

spider.start()
```

## 定义爬取规则

### links设置

- links
  - title 名称
  - url 爬取链接
  - encode 页面编码格式，默认 `urf8`
  - rules 爬取规则
    - list 爬取列表 `css` 规则
    - key 设置字段名
    - rule 列表下单条基本信息
      - url 列表下该条的爬取链接
        - type `url` 取值属性
        - path `css` 规则，同 `list` 设置
      - title 名称
        - type `title` 取值属性
        - path `css` 规则
    - links 子页面抓取规则，设置信息如同上一层，不设置 `url` 时，从上一层的 `rule` 中的 `url` 做为子页面爬取路径

### callback

回调函数中接收子页面爬取回来的数据：

```js
option.callback = function (data) {
    // data 是爬取回来的数据
    // 这里可以做一些保存之类的事情
}
```

### done

单个页面爬取完毕的回调，接受单页面数据：

```js
option.done = function (data) {
  // 对单个页面的数据处理
}
```

### allPageDone

所有分页页面结束的回调函数：

```js
option.allPageDone = function () {
  // 所有页面爬取结束
}
```

### page

如果有对分页爬取的需求，提供一个返回待爬取的分页 `url` 的函数，举个例子，可以用闭包的形式返回一个函数：

```js
option.page = (function () {
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
```

内部依据 `option.page` 的返回值来决定是否继续爬取页面，在上面的这个例子里：

```js
option.page() // https://segmentfault.com/blogs?page=2
option.page() // https://segmentfault.com/blogs?page=3
option.page() // https://segmentfault.com/blogs?page=4
option.page() // https://segmentfault.com/blogs?page=5
option.page() // false
option.page() // false
```

内部拿到 `false` 的时候将停止爬取，同时触发 `allPageDone` 事件。

### delay

跳转下一个页面的间隔时间。