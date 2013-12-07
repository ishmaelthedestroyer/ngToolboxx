app.controller('bxCtrl', [
  '$scope', '$rootScope', '$q', 'bxNotify', 'bxQueue', 'bxSession', function($scope, $rootScope, $q, Notify, Queue, Session) {
    var apply, session;
    Notify.setScope($scope);
    Queue.setScope($scope);
    session = null;
    $scope.notifications = Notify.list();
    $scope.queue = Queue.list();
    $scope.removeNotification = function(index) {
      return Notify.remove(index);
    };
    (function() {
      var deferred;
      deferred = $q.defer();
      Queue.push(deferred.promise);
      return Session.refresh().then(function(data) {
        return deferred.resolve(true);
      });
    })();
    $rootScope.$on('Session:loaded', function(event, data) {
      return session = data;
    });
    return apply = function(scope, fn) {
      if (scope.$$phase || scope.$root.$$phase) {
        return fn();
      } else {
        return scope.$apply(fn);
      }
    };
  }
]);