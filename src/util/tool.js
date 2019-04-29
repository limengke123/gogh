const forEach = (a, cb) => {
    if (Object.prototype.toString.call(a) === '[object Array]') {
        a.forEach(cb)
    } else if (Object.prototype.toString.call(a) === '[object Object]') {
        cb(a)
    } else {
        throw new Error(`传入的 ${a} 必须是数组或是对象！`)
    }
}

/**
 * 根据传入的 key 来给对象增加属性，key 的值可以是'a.b.c'
 * @param {object} input - 需要赋值的对象
 * @param {string} key - 需要设置的 key
 * @param {any} value - 需要设置的 value
 * @returns {object} - 赋值后对象
 */
const addProperty = (input, key, value) => {
    const keys = key.split('.')
    return keys.reduce((accu, key, index, array) => {
        if (index === array.length - 1) {
            // 最后一项
            accu[key] = value
        }
        if (!accu[key]) {
            accu[key] = {}
        }
        return accu
    }, input)
}

const getValueByRule = ($, list, rule) => {
    if (list) {
        // 是一个列表的情况
        let result = []
        $(list).each(function () {
            let data = {}
            const keys = Object.keys(rule)
            keys.forEach(key => {
                const singleRule = rule[key]
                if (singleRule.path) {
                    switch (singleRule.type) {
                    case 'text':
                        if ($(this).find(singleRule.path).text()) {
                            data[key] = $(this).find(singleRule.path).text()
                        }
                        break
                    case 'html' :
                        if ($(this).find(singleRule.path).html()) {
                            data[key] = $(this).find(singleRule.path).html()
                        }
                        break
                    case 'val' :
                        if ($(this).find(singleRule.path).val()) {
                            data[key] = $(this).find(singleRule.path).val()
                        }
                        break
                    default:
                        if ($(this).find(singleRule.path).attr(singleRule.type)) {
                            data[key] = $(this).find(singleRule.path).attr(singleRule.type)
                        }
                        break
                    }
                } else {
                    switch (singleRule.type) {
                    case 'text':
                        if ($(this).text()) {
                            data[key] = $(this).text()
                        }
                        break
                    case 'html' :
                        if ($(this).html()) {
                            data[key] = $(this).html()
                        }
                        break
                    case 'val' :
                        if ($(this).val()) {
                            data[key] = $(this).val()
                        }
                        break
                    default:
                        if ($(this).attr(singleRule.type)) {
                            data[key] = $(this).attr(singleRule.type)
                        }
                        break
                    }
                }
            })
            result.push(data)
        })
        return result
    } else {
        // 不是一个列表
        let data = {}
        const keys = Object.keys(rule)
        keys.forEach(key => {
            const singleRule = rule[key]
            const path = singleRule.path
            if (!path) {
                throw("rule中的缺少path")
            }
            switch (singleRule.type) {
                case 'text':
                    if ($(path).text()) {
                        data[key] = $(path).text()
                    }
                    break
                case 'html' :
                    if ($(path).html()) {
                        data[key] = $(path).html()
                    }
                    break
                case 'val' :
                    if ($(path).val()) {
                        data[key] = $(path).val()
                    }
                    break
                default:
                    if ($(path).attr(singleRule.type)) {
                        data[key] = $(path).attr(singleRule.type)
                    }
                    break
            }
        })
        return data
    }
}

module.exports = {
    forEach,
    addProperty,
    getValueByRule,
}
