var weiboTimeline = require('../index.js');

var opts={
    userName: 'xjchenhao',  // 用户名
    type: 1,                // 类别(0所有,1原创,2图片,3视频,4音乐)
    cookie: '_s_tentry=login.sina.com.cn; Apache=3768589131068.4385.1454557699561; SINAGLOBAL=3768589131068.4385.1454557699561; ULV=1454557699602:1:1:1:3768589131068.4385.1454557699561:; SSOLoginState=1454651577; UOR=,,login.sina.com.cn; SUS=SID-1775688862-1454652470-GZ-6ilmw-0fc4fee47a4e5fd7ae406a99e34a71ea; SUE=es%3D25c372b25a1d9393037b5a8a66aaeb60%26ev%3Dv1%26es2%3Dd42c82fd3992058a6ab1235c0087f09d%26rs0%3DPxjoh6tP%252Fm3KzOYqzNJ82FW0U0PxI7NGKD%252BWZJP%252BNqzvhf2XIkdHbK1LjY6DaMPuDFjxKJyg8t%252Bgociot2MVW63S2YhqnY3wOEqOm2arvQrqs%252BcMRvJH9u0Y%252BPpNR%252BTZ2AXwSKBcd0xwLHlIhrvjy1zcvi2iReKlMDD8yDK%252BAaU%253D%26rv%3D0; SUP=cv%3D1%26bt%3D1454652470%26et%3D1454738870%26d%3Dc909%26i%3D71ea%26us%3D1%26vf%3D0%26vt%3D0%26ac%3D33%26st%3D0%26uid%3D1775688862%26name%3Dwy.chenhao%2540qq.com%26nick%3D%25E9%2580%258D%25E9%2581%25A5%25E8%2587%25B3%25E5%25B0%259A%26fmp%3D%26lcp%3D2013-06-13%252012%253A26%253A23; SUB=_2A257sExmDeRxGedJ7FcX-CbEzT6IHXVYxDqurDV8PUJbstBeLVD_kW9LHesZld4kg9-j7oBxdj3ZwHFFs7XwBw..; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WFvI00mpK7-yCmx4W9yAs.h5JpX5o2p; SUHB=0V5kq_eivDOwhB; ALF=1486187576'              // 带登录信息的cookie(如果要获取好友圈和个人的信息)
};

weiboTimeline(opts,function(val){
    console.log(val);
});