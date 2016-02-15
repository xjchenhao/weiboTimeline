var request = require('request'),
    _ = require('underscore');

var cheerio = require('cheerio');

var weiboTimeline = function (opts, callBack) {

    // 设置参数
    opts = _.extend({
        userName: '',       // 用户名
        cookie: '',         // 带登录信息的cookie
        type: 1             // 类别(0所有,1原创,2图片,3视频,4音乐)
    }, opts);

    var page = 1,                   // 页面页码
        ajaxPage = 1,               // ajax请求页码
        timeLineArr = new Set([]),  // 时间线数组
        urlParamType = '';          // 请求类别

    // 根据类别传值拼接url上表示类别的参数
    switch (opts.type) {
        case 1:
            urlParamType = 'is_ori=1';
            break;
        case 2:
            urlParamType = 'is_pic=1';
            break;
        case 3:
            urlParamType = 'is_video=1';
            break;
        case 4:
            urlParamType = 'is_music=1';
            break;
        default:
            urlParamType = 'is_all=1';
    }


    // 获取页面渲染的数据
    var reqPage = function (resolve) {
        request({
            url: 'http://weibo.com/' + opts.userName + '?is_search=0&visible=0&is_ori=1&' + urlParamType + '&is_tag=0&profile_ftype=1&page=' + page + '#feedtop',
            headers: {
                'User-agent': 'spider',
                'Cookie': opts.cookie
            }
        }, function (error, response, html) {
            if (error) {
                console.log(error);
                return false;
            }

            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html, {decodeEntities: false}),
                    $WB_text = $('.WB_text');

                for (var i = 0, l = $WB_text.length; i < l; i++) {
                    var obj = $WB_text.eq(i);

                    timeLineArr.add(obj.html());
                }
                resolve(!!l);
            }
        });
    };


    // 获取异步请求的数据(在`获取页面渲染的数据`的函数执行回调中执行)
    var reqAjax = function (resolve) {
        request({
            url: 'http://weibo.com/p/aj/v6/mblog/mbloglist?ajwvr=6&domain=100505&profile_ftype=1&' + urlParamType + '&pre_page=' + page + '&page=' + page + '&pagebar=' + ajaxPage + '&filtered_min_id=&pl_name=Pl_Official_MyProfileFeed__24&id=1005051775688862&script_uri=/' + opts.userName + '&feed_type=0&domain_op=100505&__rnd=1454569704050',
            headers: {
                'User-agent': 'spider',
                'Cookie': opts.cookie
            }
        }, function (error, response, data) {
            if (error) {
                console.log(error);
                return false;
            }

            if (!error && response.statusCode == 200) {

                try {
                    var $ = cheerio.load(JSON.parse(data).data, {decodeEntities: false}),
                        $WB_text = $('.WB_text');


                    for (var i = 0, l = $WB_text.length; i < l; i++) {
                        var obj = $WB_text.eq(i);

                        timeLineArr.add(obj.html());
                    }

                    resolve();
                } catch (e) {

                    if (e.toString() == 'SyntaxError: Unexpected token <') {
                        console.log('cookie过期,请重新填写');
                        return false;
                    }

                    console.log('意外的错误');
                }

            }
        });
    };

    // 处理页面数据的异步的递归
    var promisePage = function () {
        var promise = new Promise(function (resolve) {
            reqPage.call(this, resolve)
        });

        promise.then(function (next) {

            if (next) {
                promiseAjax();
            } else {
                console.log('end');
                callBack(timeLineArr);
            }

        }).catch(function (error) {
            console.error(error);
        });
    };

    // 处理ajax数据的异步的递归
    var promiseAjax = function () {
        var promise = new Promise(function (resolve) {
            reqAjax.call(this, resolve)
        });

        promise.then(function () {
            console.log('page: ' + page);
            console.log('ajaxPage: ' + ajaxPage);
            ajaxPage++;
            if (ajaxPage <= 2) {
                promiseAjax();
            } else {
                ajaxPage = 1;
                page++;
                promisePage();
            }

        }).catch(function (error) {
            console.error(error);
        });
    };

    // 开始执行
    promisePage();

};


module.exports = weiboTimeline;