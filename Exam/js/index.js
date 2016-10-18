//首页index中的核心js文件
$(function(){
    //实现左侧动画效果
    $(".baseUI>li>ul").slideUp(0);
    $(".baseUI>li>a").off("click");
    $(".baseUI>li>a").on("click",function () {
        $(this).parent().children("ul").slideDown();
        $(this).parent().siblings().children("ul").slideUp();
    });
    //默认收起第一个，展示第一个
    $(".baseUI>li>ul").slideUp();
    $(".baseUI>li>a").eq(0).trigger("click");

    $(".baseUI>li>ul>li").off();
    $(".baseUI>li>ul>li").on("click",function () {
        if(!$(this).hasClass("current")){
            $(".baseUI>li>ul>li").removeClass("current");
            $(this).addClass("current");
        }
    });
    //模拟点击
    $(".baseUI>li>ul>li>a").eq(0).trigger("click");

    /*$(function () {
        // $(".close").children().eq(0).trigger("click");
        $(".chose").off();
        $(".chose").on("click","a",function(){
            $(this).siblings(/!*":not(:first)"*!/).removeClass("active3");
            $(this).addClass("active3");
        });
    });*/
});
//核心模块
angular.module("app",["ng","ngRoute","app.subject","app.paper"])
    //核心模块控制器
    .controller("mainCtrl",["$scope",function ($scope) {
        
    }])
    //路由配置
    .config(["$routeProvider",function ($routeProvider) {
        /*
        * a 类型id
        * b 难度id
        * c 方向id
        * d 知识点id
        * */
        $routeProvider.when("/AllSubject/a/:a/b/:b/c/:c/d/:d",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectController"
        }).when("/SubjectAdd",{
            templateUrl:"tpl/subject/subjectAdd.html",
            controller:"subjectController"
        }).when("/SubjectDel/id/:id",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectDelController"
        }).when("/SubjectCheck/id/:id/state/:state",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectCheckController"
        }).when("/PaperAdd/id/:id/stem/:stem/type/:type/topic/:topic/level/:level",{
            templateUrl:"tpl/paper/paperAdd.html",
            controller:"paperAddController"
        }).when("/PaperList",{
            templateUrl:"tpl/paper/paperManager.html",
            controller:"paperListController"
        }).when("/paperSubjectList/a/:a/b/:b/c/:c/d/:d",{
            templateUrl:"tpl/paper/subjectList.html",
            controller:"subjectController"
        })
    }]);