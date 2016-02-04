var request = require('request'),
    _ = require('underscore');

var cheerio = require('cheerio');

var weiboTimeline = function (opts) {

    // 设置参数
    opts = _.extend({
        userName: '',       // 用户名
        cookie: ''          // 带登录信息的cookie
    }, opts);

    var page = 1,           // 页面页码
        timeLineArr = [];   // 时间线数组


    var reqPage = function (resolve) {
        request({
            url: 'http://weibo.com/' + opts.userName + '?is_search=0&visible=0&is_ori=1&is_all=1&is_tag=0&profile_ftype=1&page=' + page + '#feedtop',
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

                    timeLineArr.push(obj.html());
                }
                resolve(!!l);
            }
        });
    };

    var ajaxPage = 1;
    var reqAjax = function (resolve) {
        request({
            url: 'http://weibo.com/p/aj/v6/mblog/mbloglist?ajwvr=6&domain=100505&profile_ftype=1&is_ori=1&pre_page=' + page + '&page=' + page + '&pagebar=' + ajaxPage + '&filtered_min_id=&pl_name=Pl_Official_MyProfileFeed__24&id=1005051775688862&script_uri=/' + opts.userName + '&feed_type=0&domain_op=100505&__rnd=1454569704050',
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

                var $ = cheerio.load(JSON.parse(data).data, {decodeEntities: false}),
                    $WB_text = $('.WB_text');


                for (var i = 0, l = $WB_text.length; i < l; i++) {
                    var obj = $WB_text.eq(i);

                    console.log(obj.html());
                }

                resolve();
            }
        });
    };

    var promisePage = function () {
        var promise = new Promise(function (resolve) {
            reqPage(resolve);
        });

        promise.then(function (next) {
            promiseAjax();
            page++;
            if (next) {
                promisePage();
            } else {
                console.log('end');
            }

        }).catch(function (error) {
            console.error(error);
        });
    };

    var promiseAjax = function () {
        var promise = new Promise(function (resolve) {
            reqAjax(resolve);
        });

        promise.then(function () {
            console.log('page: ' + page);
            console.log('ajaxPage: ' + ajaxPage);
            ajaxPage++;
            if (ajaxPage <= 2) {
                promiseAjax();
            } else {
                ajaxPage = 1;
            }

        }).catch(function (error) {
            console.error(error);
        });
    };

    promisePage();

};

module.exports = weiboTimeline;