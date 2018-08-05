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

回调函数中接收爬取回来的数据：

```js
option.callback = function (data) {
    // data 是爬取回来的数据
    // 这里可以做一些保存之类的事情
}
```