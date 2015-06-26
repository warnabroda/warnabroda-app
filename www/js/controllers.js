angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $stateParams, $rootScope, $state, $cordovaContacts, WarningService) {

  var deviceInformation = ionic.Platform.device();
  var currentPlatform = ionic.Platform.platform();
  var contact = null;//contact_service.find();

  $scope.warning = {
    id_contact_type: 3,
    browser: "warnabroda app: " + currentPlatform,
    operating_system: currentPlatform,
    device: currentPlatform,
    raw: "warnabroda app: " + currentPlatform,
    warning_resp: {},
    enableName: false,
    ip: "android",
    lang_key: "pt-br"
  };

  $scope.data = {
    do_find: false
  };

  var format_contact = function(contact) {
    $scope.data.sms = contact.phoneNumbers[0].value,
    $scope.data.whatsapp = contact.phoneNumbers[0].value,
    $scope.data.email = contact.emails[0].value
  };

  $scope.click_edit = function() {
    function onSuccess(contact) {
      format_contact(contact);
    };
    $cordovaContacts.pickContact().then(onSuccess);
  };

  $scope.click_cancel = function() {
    $scope.data.do_find = false;
  };

  if (contact == null) {
    $scope.data.sms = "";
    $scope.data.whatsapp = "";
    $scope.data.email = "";
  } else {
    format_contact(contact);
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

    $scope.goAcc = function() {
      $state.go('tab.account');
    };

    $scope.isPhoneNumberIlegal = function(){
      if($scope.warning.id_contact_type === 1) {
         return $scope.data.email == null;
      } else if($scope.warning.id_contact_type === 2) {
         return $scope.data.sms == null;
      }
      return $scope.data.whatsapp == null;
    };
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

.controller('ContactsCtrl', function($scope, $stateParams, $cordovaContacts) {

  $scope.data = {
    do_find: false,
    search: ""
  };

  $scope.click_edit = function() {
    $scope.data.do_find = true;
  };

  $scope.click_cancel = function() {
    $scope.data.do_find = false;
    $scope.data.search = "";
  };

  $scope.$watch('data.search', function(value, oldValue, scope) {
    //if ( String(value) != "" ) {
    //  $scope.contacts = contact_service.find_by_email(String(value));
    //} else {
    //  $scope.contacts = contact_service.all();
    //}
    //console.log($scope.contacts);
    $scope.contacts = [];
    function onSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        $scope.contacts.push(contact);
      }
    };
    function onError(contactError) {
      alert(contactError);
    };
    var options = {};
    options.multiple = true;
    if ( String(value) != "" ) {
       options.filter = String(value);
    } 
    $cordovaContacts.find(options).then(onSuccess, onError);
  });


})

.controller('AccountCtrl', function($scope, $rootScope, $translate, LANGUAGES, COUNTRIES, WarningService) {

  $scope.settings = {
    lang_key: 'pt-br',
    dial_code: '+55'
  };

  $scope.languages = LANGUAGES;
  $scope.countries = COUNTRIES;

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

  $scope.$watch('settings.dial_code', function(value, oldValue, scope) {
      //console.log(String(value));
    });

});
