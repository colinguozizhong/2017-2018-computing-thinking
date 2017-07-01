angular.module('app.controllers', [])

.controller('gameLobbyCtrl', ['$scope','$rootScope','$stateParams', '$ionicModal','LobbyService','envInfo','$location',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($rootScope,$scope, $stateParams,$ionicModal,envInfo,$location,LobbyService) {
  //FIXME:$rootScope not working.
  // $rootScope.gamerIds = [];
  //Dynamic host modification
  // envInfo.mqtt.host = $location.host();
  // envInfo.api.host = $location.host();
  // envInfo.api.url = envInfo.api.host+envInfo.api.port+envInfo.api.context;
  // envInfo.mqtt.url = envInfo.mqtt.host+envInfo.mqtt.port;
  //
  $scope.envInfo = envInfo;

  $scope.pairAll = function () {
    LobbyService.pairAll(function(data){
      console.log("LobbyService.getAll(:",  data);
      $scope.lobbyList  = data;
      console.log("$scope.lobbyList:",  $scope.lobbyList);
    });
  }
  $scope.playAll = function(){
    console.log("game start!:");
    LobbyService.playAll(function(data){
      console.log("LobbyService.playAll:",  data);
      for(var i=0;i<data.length;i++){
        LobbyService.gamerIds.push(data[i].id);
      }
      console.log("LobbyService.gamerIds:",LobbyService.gamerIds);
    });
  }
  $scope.dismissAll = function(){
    LobbyService.dismissAll(function(data){
      console.log("LobbyService.dismissAll:",  data);
      $scope.lobbyList  = [];
      console.log("$scope.lobbyList:",  $scope.lobbyList);
    });
  }
  $scope.updateEnvInfo = function(){
    //
    console.log("updated envInfo:",envInfo);
    $scope.modal_settings.hide();
  }

}])

.controller('gameTableCtrl', ['$scope','$rootScope','LobbyService','TableService','ChainCodeService','$ionicModal',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($rootScope,$scope,LobbyService,TableService,ChainCodeService,$ionicModal) {
  // Load the modal from the given template URL
  $scope.modal_settings = null;
  $ionicModal.fromTemplateUrl("templates/modal_settings.html",
    {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
    $scope.modal_settings = modal;
  });
//
  $scope.gamers = [];
  $scope.tableIndex = 0;
  $scope.tableInfo = {};
  $scope.getAll = function(){
    LobbyService.getAll(function(data){
      console.log("LobbyService.getAll:",  data);
      $scope.gamers = data;
    });
  }
  // console.log("scope.gamerIds[$scope.tableIndex]:",$scope.gamerIds[$scope.tableIndex]);
  $scope.getOne = function(){
    // console.log("LobbyService.gamerIds:", LobbyService.gamerIds);
    // TableService.gamerId = LobbyService.gamerIds[$scope.tableIndex];
    // console.log("TableService.gamerId:", TableService.gamerId);
    $scope.tableInfo = $scope.gamers[$scope.tableIndex];
    // $scope.tableInfo = TableService.getOne(function(data){
    console.info("$scope.tableInfo:",$scope.tableInfo);
    //TODO:ChainCode Verify
    // ChainCodeService.gamerId = $scope.tableInfo.id;
    // console.log("ChainCodeService.gamerId:", ChainCodeService.gamerId);
    // $scope.tableInfo = ChainCodeService.getOne(function(data){
    //   sgf = data;
      //
      var gameTableDiv = document.getElementById("gameTableDiv");
      console.log("$scope.gameTableDiv:",gameTableDiv);
      if(gameTableDiv) {
        var player = new WGo.BasicPlayer(gameTableDiv, {
          sgf: $scope.tableInfo.sgf
        });
      }
      $scope.tableIndex++;
      if($scope.tableIndex==$scope.gamers.length){
        $scope.tableIndex = 0; //next round.
      }
    };
  //default calls
  $scope.getAll();
}])

  .controller('gamePlayerCtrl', ['$scope', '$stateParams','envInfo','UserService','$ionicModal',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams,UserService,envInfo,$ionicModal) {

      //Load the modal from the given template URL
      $scope.modal_user_add  = null;
      $ionicModal.fromTemplateUrl("templates/modal_user_add.html",
        {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
        $scope.modal_user_add = modal;
      });
      $scope.anewUser = {fullName:'undefined',rank:0};
      $scope.addUser = function () {
        $scope.modal_user_add.show();
      };
      $scope.userList = [];
      $scope.createUser = function () {
        //
        UserService.anewUser = $scope.anewUser;
        console.info(" UserService.anewUser:", UserService.anewUser);
        //
        UserService.createOne(function(data){
          console.log("UserService.createOne(:",  data);
          $scope.userList.push(data);
          console.log("$scope.userList:",  $scope.userList);
        });
      }

    }])
