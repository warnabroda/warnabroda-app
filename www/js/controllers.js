angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $stateParams, $rootScope, $state, WarningService, contact_service) {

  var contact = contact_service.find($stateParams.contact_id);

  $scope.warning = {
    id_contact_type: 3,
    browser: "android",
    operating_system: "android",
    device: "android",
    raw: "android",
    warning_resp: {},
    enableName: false,
    ip: "android",
    lang_key: "pt-br"
  };

  if (contact == null) {
    $scope.data = {
      sms: "",
      whatsapp: "",
      email: "" 
    };
  } else {
    $scope.data = {
      sms: contact.phoneNumbers[0].value,
      whatsapp: contact.phoneNumbers[0].value,
      email: contact.emails[0].value
    };
  }  

  var listContactType = WarningService.getContactTypes();
  listContactType.then(function(result) {
    if (result) {
		    $rootScope.contact_types = result;
		    //$scope.warning.id_message = $routeParams.id_message*1;
    }
  });

  var listMessage = WarningService.getMessages($scope.warning.lang_key);
  listMessage.then(function(result) {
    if (result) {
		    $rootScope.messages = result;
		    //$scope.warning.id_message = $routeParams.id_message*1;
    }
  });


  $scope.send = function(){


			$scope.warning.created_date = new Date();
			$scope.warning.timezone = (new Date()).getTimezoneOffset()+"";

			var warnService = WarningService.send($scope.warning);
			warnService.then(function(data) {
  			$scope.handleServerResponse(data);
        	}, function(error) {
  	       $scope.error = error;
	    });
    	$scope.error = null;

	};

  $scope.handleServerResponse = function (data){

			$scope.error = null;

			$scope.invalid_facebook = null;
			$scope.email_error = null;
			$scope.invalid_phone_number = null;
			$scope.invalid_ddd = null;
			$scope.server_msg_danger = null;
			$scope.server_msg_sucess = null;

			switch(data.id){
				case 200:

					$scope.server_msg_danger = null;
					$scope.server_msg_sucess = data.name;
	                $scope.warning.id_message = null;
	                $scope.warning.contact = null;
	                $scope.sms = null;
	                $scope.email = null;
	                $scope.facebook = null;

				break;

				default:
					$scope.server_msg_danger = data.name;
					$scope.server_msg_sucess = null;
				break;

			}
		};

    $scope.$watch('data.sms', function(value, oldValue, scope) {
      $scope.warning.contact = String(value);
    });

    $scope.$watch('data.whatsapp', function(value, oldValue, scope) {
      $scope.warning.contact = String(value);
    });

    $scope.$watch('data.email', function(value, oldValue, scope) {
      $scope.warning.contact = String(value);
    });
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ContactsCtrl', function($scope, $stateParams, contact_service) {
  $scope.contacts = contact_service.all();
})

.controller('AccountCtrl', function($scope, $rootScope, $translate, LANGUAGES, WarningService) {

  $scope.settings = {
    lang_key: 'pt-br'
  };

  $scope.languages = LANGUAGES;

  $scope.$watch('settings.lang_key', function(value, oldValue, scope) {
    var lang_key = String(value);
    $translate.use(lang_key);
    var listMessage = WarningService.getMessages(lang_key);
    listMessage.then(function(result) {
      if (result) {
          $rootScope.messages = result;
          //$scope.warning.id_message = $routeParams.id_message*1;
      }
    });
  });

});
