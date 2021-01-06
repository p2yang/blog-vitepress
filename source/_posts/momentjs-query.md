---
title: 小试 Momentjs Query API
date: 2017-11-28 00:33:55
updated:
tags:
- moment
---

moment用的好，可省一大笔精力和时间。

<!-- more -->
## 起始与结束
1. 周期的开始时间

```
moment().startOf(String)
```

2. 周期的结束时间

```
moment().endOf(String)
```

* String 支持以下参数：
  - year
  - month
  - quarter
  - week
  - isoWeek
  - day
  - date
  - hour
  - minute
  - second

示例如下：

```
moment().startOf('month');
moment().startOf('year');
moment().startOf('week');
```


## Boolean 判断
判断时间A是否在目标时间B之前或之后, 如：
```
/*
  A／B 类型支持 Moment|String|Number|Date|Array

  参数 String 可以是 year／month／week／day／hour／minute／second,可省略
 */
moment(A).isBefore(B, String)
```
  示例：
  ```
  const a = moment()
  a.isBefore('2017-11-27'); // true
  a.isAfter('2017-11-27'); // false
  ```

类似还有：
1. `isSame`
2. `isSameBefore`
3. `isSameAfter`
4. `isBetween`
  ```
  moment('2010-10-20').isBetween('2010-01-01', '2012-01-01', 'year'); // false
  ```

5. `isDST`
checks if the current moment is in daylight saving time.

  ```
  moment([2011, 2, 12]).isDST(); // false, March 12 2011 is not DST
  ```

6. `isDSTShifted`
7. `isMoment`
8. `isLeapYear`
9. `isDate`

## 其他
### 时间戳
```
moment().valueOf(); // 毫秒数
moment().unix(); // 秒数
```

## 后记
官方文档示例和描述清晰明了，可点击[查看官方文档](http://momentjs.com/docs/#/parsing/)，不多赘述。
