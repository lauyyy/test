/**
 * Created by Administrator on 2016/9/22.
 * 试卷模块
 */
angular.module("app.paper",["ng","app.subject"])
    //试卷列表的控制器
    .controller("paperListController",["$scope",function ($scope) {

    }])
    //试卷添加的控制器
    .controller("paperAddController",["$scope","commonService","$routeParams","paperModel","paperService",function ($scope,commonService,$routeParams,paperModel,paperService) {
        commonService.getAllDepartment(function (data) {
            //将全部方向绑定到作用域的dps中
            $scope.dps=data;
        });
        var subjectId=$routeParams.id;
        if(subjectId!=0){
            paperModel.addSubjectId(subjectId);
            paperModel.addSubjects(angular.copy($routeParams));
        }
        //双向绑定的模板
        $scope.pmodel=paperModel.model;
        $scope.savePaper=function (obj,handler) {
            paperService.savePaper($scope.pmodel,function (data) {
                alert(data);
            })
        }

    }])
    //试卷删除的控制器
    .controller("paperDelController",["$scope",function ($scope) {

    }])
    .factory("paperService",["$httpParamSerializer","$http",function ($httpParamSerializer,$http) {
        return{
            savePaper:function (param,handler) {
                var obj={};
                for(var key in param){
                    var val= param[key];
                    switch(key){
                        case "dps":
                            obj["paper.department.id"]=val;
                            break;
                        case "title":
                            obj["paper.title"]=val;
                            break;
                        case "desc":
                            obj["paper.description"]=val;
                            break;
                        case "at":
                            obj["paper.answerQuestionTime"]=val;
                            break;
                        case "total":
                            obj["paper.totalPoints"]=val;
                            break;
                        case "scores":
                            obj["scores"]=val;
                            break;
                        case "scoresId":
                            obj["subjectIds"]=val;
                            break;
                    }
                }
                obj=$httpParamSerializer(obj);
                $http.post("http://172.16.0.5:7777/test/exam/manager/saveExamPaper.action",{
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    }
                }).success(function (data) {
                    handler(data);
                });
            }
        }
    }])
    //模板 单例
    .factory("paperModel",function () {
        return{
            model:{
                dps:1,//方向id
                title:"",//试卷标题
                desc:"",//试题描述
                at:"",//答题时间
                total:"",//总分
                scores:[],//每个题目的分值
                scoresId:[],//每个题目的id
                subjects:[]
            },
            addSubjectId:function (id) {
                this.model.scoresId.push(id);
            },
            addSubjects:function (subjects) {
                this.model.subjects.push(subjects);
            }
        }
    });