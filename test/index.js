var weiboTimeline = require('../index.js');

var opts={
    userId:'1005051630861780',  // 用户id
    type: 1,                    // 类别(0所有,1原创,2图片,3视频,4音乐)
    cookie: ''                  // 带登录信息的cookie(如果要获取好友圈和个人的信息)
};

weiboTimeline(opts,function(val){
    console.log(val);
});