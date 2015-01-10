'use strict';
angular.module('app')
    .controller('WelcomeCtrl',
        ['$rootScope', '$scope', '$http',
            function($rootScope, $scope, $http) {
                $scope.username = 'Conan_Z';
                $scope.bodyActiveFlag = "news";
                $scope.layoutObj = {"height":document.documentElement.clientHeight - 3};
                var store = new Lawnchair({name:'shelf'}, function(store) {
                });

                // news,fontEnd,tools,css,source,book
                //
                var newsArray = [
                    {"title":"商业价值","des":"发现创新、持续的商业价值","url":"http://content.businessvalue.com.cn/","type":"news"},
                    {"title":"业界资讯","des":"最新的业界资讯","url":"http://www.cnbeta.com/","type":"news"},
                    {"title":"36氪","des":"互联网新闻资讯","url":"http://www.36kr.com/","type":"news","label":"创业"},
                    {"title":"demo8","des":"发现最新的好产品","url":"http://www.demo8.com/","type":"discover","label":"产品"},
                    {"title":"知乎周刊","des":"知乎周刊","url":"http://www.zhihu.com/rss","type":"rss"},
                    {"title":"业界咨询","des":"业界咨询","url":"http://feeds2.feedburner.com/cnbeta_full","type":"rss"},
                    {"title":"w3cfuns","des":"http://www.w3cfuns.com/","url":"http://www.w3cfuns.com/","type":"fontEnd"},
                    {"title":"前端乱炖","des":"前端乱炖，专业的前端社区","url":"http://www.html-js.com/","type":"fontEnd","label":"知识"},
                    {"title":"奇舞周刊","des":"RSS订阅，每周一期","url":"http://www.75team.com/weekly/","type":"fontEnd","label":"订阅"},
                    {"title":"quora","des":"Learn English","url":"https://www.quora.com/","type":"news","label":"英语"},
                    {"title":"简书","des":"重新找到文字的力量","url":"http://www.jianshu.com/","type":"book"}


                ];
                $scope.newsArray = [];
                $scope.checks = newsArray;
                $scope.iframeSrc = "http://www.baidu.com";
                $scope.layoutLoadFlag = false;
                $scope.triggerItem = function(event,item) {
                    if (item == undefined) {
                        return false;
                    }
                    var type = item.type;
                    $scope.layoutLoadFlag = true;
                    if (type == "rss") {
                        $scope.bodyActiveFlag = "rss";
                        $('#rss_content_list').rssfeed(item.url,{"linktarget":"_blank"}, function() {
                            $scope.$apply(function() {
                                $scope.layoutLoadFlag = false;
                            });
                        });
                    } else if (type == "comm") {
                        $scope.bodyActiveFlag = "comm";
//                        $scope.newsArray = $scope._getRecordsOfType("comm");
                    } else {
                        $scope.bodyActiveFlag = "news";
                        var url = item.url;
                        $("#frame").attr("src",url);
                        setTimeout(function() {
                            $scope.$apply(function() {
                                $scope.layoutLoadFlag = false;
                            });
                        },1000);
//                        $(window.frames["frame"].document).find("body").css("width","600px");
                    }
                    $scope.activeUrl = item.url;
                }
                $scope.triggerRss = function() {

                }

                $scope.activeUrl = "";
                $scope.activeType = "news";

                $scope.showList = function(event, type) {
                    if (type == $scope.activeType) {
                        return false;
                    }

                    if (type == "news") {
                        setTimeout(function() {
                            $scope._getRecordsOfType("news");
                        });
                    } else if (type == "rss") {
                        setTimeout(function() {
                            $scope._getRecordsOfType("rss");
                        });
                    } else if (type == "webo") {
                        $scope.newsArray = [
                            {"title":"前端乱炖","des":"前端乱炖，专业的前端社区","url":"http://www.html-js.com/"}
                        ];
                    } else if (type == "comm") {
                        setTimeout(function() {
                            $scope._getRecordsOfType("comm");
                        },10);
                    }
                    $scope.activeType = type;
                }
                $scope.getAll = function() {
                    store.all(function(records) {
                        $scope.newsArray = records;
                    });
                }
                $scope._getRecordsOfType = function(param) {
                    store.all(function(records) {
                        var arr = [];
                        angular.forEach(records, function(item, key) {
                            if (item.type == param) {
                                arr.push(item);
                            }
                        });
                        $scope.$apply(function() {
                            $scope.newsArray = arr
                        });
                    });
                }
                setTimeout(function() {
                    $scope._getRecordsOfType("news");
                    $scope.triggerItem(null,$scope.newsArray[0]);
                },10);
                // create an object
                $scope._addOne = function(oneRecord) {
                    // save it
                    store.save(oneRecord,function(res) {
                        console.log("---"+ res);
                        if (res) {
                            $('#myModal').modal('hide');
                            $scope._getRecordsOfType("news");
                        }
                    });
                }
                $scope._batch = function(arrayObj) {
                    store.batch(arrayObj,function(res) {
                        console.log("---"+ res);
                        if (res) {
                            $('#myModal').modal('hide');
                            $scope.getAll();
                        }
                    });
                }
                $scope.addOneRecord = function(event) {
                    var webSite = $scope.input_url;
                    var title = $scope.input_title;
                    var des = $scope.input_des;

//                    if (webSite.length == 0) {
//                        return false;
//                    }
                    var array = [];
                    $(".checkItem:checked").each(function(index,item) {
                        console.log("==" + JSON.stringify($(item).attr("data")));
                        var data = JSON.parse($(item).attr("data"));
                        data["key"] = data.url;

                        array.push(data);
                        $scope._batch(array);
                    });
//                    var oneRecord = {key:webSite,"url":webSite,"title":title,"des":des,"label":"news"};
                }
                $scope.showAddDetailFlag = false;
                $scope.showAddDetailBtnTip = "展开";
                $scope.showAddDetail = function() {
                    $scope.showAddDetailFlag = !$scope.showAddDetailFlag;
                    if ($scope.showAddDetailFlag) {
                        $scope.showAddDetailBtnTip = "收起";
                    } else {
                        $scope.showAddDetailBtnTip = "展开";
                    }
                }

                //firebase
                var myFirebaseRef = new Firebase("https://keyup.firebaseio.com/");
                myFirebaseRef.set({
                    links: newsArray
                });
setTimeout(function() {

    myFirebaseRef.once('value', function(nameSnapshot) {
        var val = nameSnapshot.val();
                console.log(JSON.stringify(val));
        // val now contains the object { first: 'Fred', last: 'Flintstone' }.
    });

},1000);

         }]);