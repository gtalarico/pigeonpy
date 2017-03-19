(function () {

    angular.module('PigeonPieApp').component('hubList', {
    //   template:  '<h3>Hubs</h3>',
      template:  '<h3>{{$ctrl.greeting}} Solar System!</h3>' +
                 '<button ng-click="$ctrl.toggleGreeting()">toggle greeting</button>',

      controller: function($forgeService) {
        this.greeting = 'Hubs';

        this.toggleGreeting = function() {
        //   this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello'
          this.greeting = $forgeService.getHttp()
        }
      }
    })



})();
