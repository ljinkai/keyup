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
                    });
                };

                $scope.initData = function() {
                    // news,fontEnd,tools,css,source,book
                    //
                    var newsArray = {
                        "11_news" :{
                            "items" : [
                                {"title":"商业价值","des":"发现创新、持续的商业价值","url":"http://content.businessvalue.com.cn/","type":"news","label":"商业"},
                                {"title":"业界资讯","des":"最新的业界资讯","url":"http://www.cnbeta.com/","type":"news","label":"新闻"},
                                {"title":"36氪","des":"互联网新闻资讯","url":"http://www.36kr.com/","type":"news","label":"创业"},
                                {"title":"quora","des":"Learn English","url":"https://www.quora.com/","type":"news","label":"英语"}
                            ],
                            "title":"资讯"
                        } ,
                        "12_discover" : {
                            "items":[
                                {"title":"demo8","des":"发现最新的好产品","url":"http://www.demo8.com/","type":"discover","label":"产品"},
                                {"title":"Maka","des":"H5在线制作","url":"http://www.maka.im/home/index.html","type":"discover","label":"H5"},
                                {"title":"微信H5","des":"关于微信的H5应用","url":"http://h5.keyup.cn","type":"discover","label":"微信"}
                            ],
                            "title":"发现"
                        },
                        "13_fontEnd" : {
                            "items":[
                                {"title":"w3cfuns","des":"http://www.w3cfuns.com/","url":"http://www.w3cfuns.com/","type":"fontEnd","label":"综合"},
                                {"title":"前端乱炖","des":"前端乱炖，专业的前端社区","url":"http://www.html-js.com/","type":"fontEnd","label":"知识"},
                                {"title":"奇舞周刊","des":"RSS订阅，每周一期","url":"http://www.75team.com/weekly/","type":"fontEnd","label":"订阅"}
                            ],
                            "title":"前端站"
                        },
                        "14_rss" : {
                            "items":[
                                {"title":"知乎周刊","des":"知乎周刊","url":"http://www.zhihu.com/rss","type":"rss","label":"知乎"},
                                {"title":"业界咨询","des":"业界咨询","url":"http://feeds2.feedburner.com/cnbeta_full","type":"rss","label":"杂"}
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
                                {"title":"j-proxy","des":"翻墙代理工具","url":"http://j-proxy.net","type":"tools","label":"代理"}
                            ],
                            "title":"工具"
                        }
                    };

                    //firebase
                    myFirebaseRef.set({
                        links: newsArray
                    });
                };

                //$scope.initData();
                $scope.initWebSite();

         }]);