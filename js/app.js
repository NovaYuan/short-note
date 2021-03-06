/**
 * Created by yuan on 2016/4/12.
 */
'use strict';
var app = angular.module("myApp", [
    "ionic",
    "ionic-datepicker",
    "ngRoute",
    "ngCordova",
    "angularFileUpload"
]);

app.run(function($ionicPlatform, $cordovaToast) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $ionicPlatform.registerBackButtonAction(function(e){
        if ($rootScope.backButtonPressedOnceToExit) {
            ionic.Platform.exitApp();
        } else {
            $rootScope.backButtonPressedOnceToExit = true;
            $cordovaToast.showShortTop('再按一次退出系统');
            setTimeout(function () {
                $rootScope.backButtonPressedOnceToExit = false;
            }, 2000);
        }
        e.preventDefault();
        return false;
    }, 101)
});

app.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when('/list', {
            templateUrl: 'templates/list.html'
        }).
        when('/chats', {
            templateUrl: 'templates/chats.html'
        }).
        when('/setting', {
            templateUrl: 'templates/settings.html'
        }).
        when('/setting/profile?:user', {
            templateUrl: 'templates/profile.html'
        }).
        when('/setting/remind', {
            templateUrl: 'templates/remind.html'
        }).
        when('/list/create', {
            templateUrl: 'templates/create.html'
        }).
        otherwise({
            redirectTo: '/list'
        });
}]);

app.config(function(ionicDatePickerProvider){
    var datePickerOpt = {
        inputDate: new Date(),
        setLabel: '选择',
        todayLabel: '今天',
        closeLabel: '关闭',
        mondayFirst: false,
        weeksList: ["日", "一", "二", "三", "四", "五", "六"],
        monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        templateType: 'popup',
        dateFormat: 'yyyy-MM-dd'
    };

    ionicDatePickerProvider.configDatePicker(datePickerOpt);
});
