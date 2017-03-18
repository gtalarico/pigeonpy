angular.module('PigeonPieApp').component('buckets', {
  bindings: { buckets: '<' },

  template: '<h3>Some people:</h3>'
  // template: '<h3>Some people:</h3>' +
  //           '<ul>' +
  //           '  <li ng-repeat="person in $ctrl.people">' +
  //           '    <a ui-sref="person({ personId: person.id })">' +
  //           '      {{person.name}}' +
  //           '    </a>' +
  //           '  </li>' +
  //           '</ul>'
})
