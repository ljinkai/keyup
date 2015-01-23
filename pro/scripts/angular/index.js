'use strict';
angular.module('app')
    .controller('IndexCtrl',
        ['$rootScope', '$scope', '$http',
            function($rootScope, $scope, $http) {
                $scope.webSiteArray = [];
                $scope.layoutLoadFlag = true;
                var myFirebaseRef = new Firebase("https://keyup.firebaseio.com/");
                $scope.initWebSite = function() {
                    //firebase
                    myFirebaseRef.once('value', function(nameSnapshot) {
                        var val = nameSnapshot.val();

                        $scope.$apply(function() {
                            $scope.webSiteArray = val.links;
                            $scope.layoutLoadFlag = false;
                        });
                        $scope.weibo();
                    });
                };
                $scope.bodyActive = "site";
                $scope.showBody = function(event,type) {
                    $scope.bodyActive = type;
                    if (type == "rss") {
                        $scope.readRssData();
                    }
                };
                var rssArray = [
                        {"title":"业界资讯","des":"业界资讯","url":"http://cnbeta.feedsportal.com/c/34306/f/624776/index.rss","type":"rss","label":"杂"},
                        {"title":"36氪","des":"36氪","url":"http://www.36kr.com/feed/","type":"rss","label":"创业"},
                        {"title":"知乎周刊","des":"知乎周刊","url":"http://www.zhihu.com/rss","type":"rss","label":"知乎"},
                        {"title":"极客公园","des":"极客早知道","url":"http://www.geekpark.net/rss","type":"rss","label":"极客"},
                        {"title":"善用佳软","des":"善用佳软","url":"http://feed.xbeta.info/","type":"rss","label":"佳软"},
                        {"title":"爱范儿","des":"爱范儿","url":"http://www.ifanr.com/feed","type":"rss","label":"爱范儿"},
                        {"title":"泛科学","des":"泛科学","url":"http://pansci.tw/feed","type":"rss","label":"泛科学"},
                        {"title":"联合早报国际","des":"联合早报国际","url":"http://zaobao.feedsportal.com/c/34003/f/616931/index.rss","type":"rss","label":"国外"}
                ];
                $scope.rssArray = rssArray;
                $scope.readRssData = function() {
                    angular.forEach(rssArray, function(item, key) {
                        $('#rss_block_' + key).rssfeed(item.url,{"linktarget":"_blank"}, function() {
                        });
                    });

                };
                $scope.initData = function() {
                    // news,fontEnd,tools,css,source,book
                    //
                    var newsArray = {
                        "11_fontEnd" : {
                            "items":[
                                {"title":"w3cfuns","des":"http://www.w3cfuns.com/","url":"http://www.w3cfuns.com/","type":"fontEnd","label":"综合"},
                                {"title":"w3cplus","des":"http://www.w3cplus.com/","url":"http://www.w3cplus.com/","type":"fontEnd","label":"综合"},
                                {"title":"前端乱炖","des":"前端乱炖，专业的前端社区","url":"http://www.html-js.com/","type":"fontEnd","label":"知识"},
                                {"title":"前端里","des":"前端里","url":"http://www.yyyweb.com/","type":"fontEnd","label":"综合"},
                                {"title":"web前端开发","des":"web前端开发","url":"http://www.css88.com/","type":"fontEnd","label":"综合"},
                                {"title":"web前端资源网","des":"web前端资源网","url":"http://www.58img.com/","type":"fontEnd","label":"资源"}
                            ],
                            "title":"前端站"
                        },
                        "12_news" :{
                            "items" : [
                                {"title":"商业价值","des":"发现创新、持续的商业价值","url":"http://content.businessvalue.com.cn/","type":"news","label":"商业"},
                                {"title":"业界资讯","des":"最新的业界资讯","url":"http://www.cnbeta.com/","type":"news","label":"新闻"},
                                {"title":"36氪","des":"互联网新闻资讯","url":"http://www.36kr.com/","type":"news","label":"创业"},
                                {"title":"quora","des":"Learn English","url":"https://www.quora.com/","type":"news","label":"英语"}
                            ],
                            "title":"资讯"
                        },
                        "13_discover" : {
                            "items":[
                                {"title":"demo8","des":"发现最新的好产品","url":"http://www.demo8.com/","type":"discover","label":"产品"},
                                {"title":"Maka","des":"H5在线制作","url":"http://www.maka.im/home/index.html","type":"discover","label":"H5"},
                                {"title":"微信H5","des":"关于微信的H5应用","url":"http://h5.keyup.cn","type":"discover","label":"微信"},
                                {"title":"牛玩","des":"新鲜、试玩","url":"http://knewone.com/","type":"discover","label":"试玩"},
                                {"title":"teahour","des":"IT播客","url":"http://teahour.fm/","type":"discover","label":"播客"}
                            ],
                            "title":"发现"
                        },
                        "14_rss" : {
                            "items":[
                                {"title":"知乎周刊","des":"知乎周刊","url":"http://www.zhihu.com/rss","type":"rss","label":"知乎"},
                                {"title":"业界咨询","des":"业界咨询","url":"http://feeds2.feedburner.com/cnbeta_full","type":"rss","label":"杂"},
                                {"title":"奇舞周刊","des":"RSS订阅，每周一期","url":"http://www.75team.com/weekly/","type":"fontEnd","label":"订阅"}
                            ],
                            "title":"订阅"
                        },
                        "15_book" : {
                            "items":[
                                {"title":"简书","des":"重新找到文字的力量","url":"http://www.jianshu.com/","type":"book","label":"读书"},
                                {"title":"GitBook","des":"GitBook","url":"https://www.gitbook.com/dashboard","type":"book","label":"写作"}
                            ],
                            "title":"读书"
                        },
                        "16_tool" : {
                            "items":[
                                {"title":"leanCloud","des":"为应用开发加速","url":"https://leancloud.cn/","type":"tools","label":"js"},
                                {"title":"apiCloud","des":"重新定义移动开发","url":"https://www.apicloud.com/","type":"tools","label":"后台api"},
                                {"title":"j-proxy","des":"翻墙代理工具","url":"http://j-proxy.net","type":"tools","label":"代理"},
                                {"title":"animate.css","des":"css动画效果查询","url":"http://daneden.github.io/animate.css/","type":"tools","label":"css"},
                                {"title":"snabbt.js","des":"css动画效果查询","url":"http://daniel-lundin.github.io/snabbt.js/","type":"tools","label":"js"},
                                {"title":"import.io","des":"页面内容抓取","url":"https://import.io/","type":"tools","label":"爬虫"},
                                {"title":"uiparade","des":"在线设计图标工具","url":"http://livetools.uiparade.com/index.html","type":"tools","label":"图标"},
                                {"title":"cssload","des":"css loading","url":"http://cssload.net/en//","type":"tools","label":"loading"},
                                {"title":"flattyshadow","des":"在线阴影图标设计","url":"http://flattyshadow.com/","type":"tools","label":"shadow"},
                                {"title":"cssanimate","des":"在线css动画制作工具","url":"http://cssanimate.com/","type":"tools","label":"animate"}
                            ],
                            "title":"工具"
                        }
                    };


                    //firebase
                    myFirebaseRef.set({
                        links: newsArray
                    });
                };

//                $scope.initData();
                $scope.initWebSite();

                $scope.weibo = function() {
                    // weibo


                    WB2.anyWhere(function(W){
                        //数据交互
                        W.parseCMD('/2/favorites.json', function(oResult, bStatus) {
                            console.log("fav::" + oResult);
                            if(bStatus) {
                                //to do something...
                            }
                        }, {
                            access_token : '58a282dfb5d90518c5c86b1d00a6c0ee'
                        }, {
                            method : 'get',
                            cache_time : 30
                        });
                    });
                }

         }]);