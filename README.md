# weiboTimeline
> 新浪微博的时间线爬虫

##api

| Option        | Type          | Explanation  |
| ------------- |:-------------:| :------------|
| userId        | {String}      | 用户id        |
| type          | {Number}      | 0所有,1原创,2图片,3视频,4音乐 |
| cookie        | {String}      | 选填,填写可获取好友圈和个人的信息 |

## 示例

```
var weiboTimeline=require('weibo-timeline');

var opts={
    userId:'1005051775688862',  // 用户id
    type: 1,                    // 类别(0所有,1原创,2图片,3视频,4音乐)
    cookie: ''                  // 带登录信息的cookie(如果要获取好友圈和个人的信息)
};

weiboTimeline(opts,function(val){
    console.log(val);
});
```