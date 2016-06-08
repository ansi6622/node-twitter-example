var twitterStream = angular.module('myApp', ['chart.js'])

twitterStream.controller("mainCtrl", ['$scope', 'socket',
function ($scope, socket) {
  //chart labels
  $scope.labels = ["iPhone", "iPad", "Android", "Web Client", "Other"];
  //chart colors
  $scope.colors = ['#ffffff','#ddccdd','#ddffaa','#ccccff', '#aa99dd'];
  //intial data values
  $scope.trumpData = [0,0,0,0,0];
  $scope.trumpData2 = [0,0,0,0,0];
  $scope.sentTrumpPos = [];
  $scope.sentTrumpNeg = [];
  $scope.sandersData = [0,0,0,0,0];
  $scope.sandersData2 = [0,0,0,0,0];
  $scope.sentBerniePos = [];
  $scope.sentBernieNeg = [];
  $scope.hillaryData = [0,0,0,0,0];
  $scope.hillaryData2 = [0,0,0,0,0];
  $scope.sentHillaryPos = [];
  $scope.sentHillaryNeg = [];

  socket.on('newTweet', function (tweet, sentiments) {
    $scope.tweet = tweet.text
    $scope.sentiment = sentiments.score;
    $scope.user = tweet.user.screen_name;
    //parse source from payload
    var source = tweet.source.split('>')[1].split('<')[0].split(' ')[2]
    //all hashtags in the tweet
    var hashtags = tweet.entities.hashtags.map(function(el){
      return el.text.toLowerCase()
    })

    //check source and increment for #trump tweets
    if (hashtags.indexOf('trump') !== -1 && sentiments.score >= 0){
      for (var i = 0; i < sentiments.positive.length; i++) {
        $scope.sentTrumpPos.push(sentiments.positive[i]);
        }
      for (var i = 0; i < sentiments.negative.length; i++) {
          $scope.sentTrumpNeg.push(sentiments.negative[i]);
          }
      switch (source) {
        case 'iPhone': $scope.trumpData[0]++
        break;
        case 'iPad': $scope.trumpData[1]++
        break;
        case 'Android': $scope.trumpData[2]++
        break;
        case 'Web': $scope.trumpData[3]++
        break;
        default: $scope.trumpData[4]++
      }
    }
    //check source and increment for #trump tweets, but negative

    else if (hashtags.indexOf('trump') !== -1 && sentiments.score < 0){
      for (var i = 0; i < sentiments.positive.length; i++) {
        $scope.sentTrumpPos.push(sentiments.positive[i]);
        }
      for (var i = 0; i < sentiments.negative.length; i++) {
          $scope.sentTrumpNeg.push(sentiments.negative[i]);
          }
      switch (source) {
        case 'iPhone': $scope.trumpData2[0]++
        break;
        case 'iPad': $scope.trumpData2[1]++
        break;
        case 'Android': $scope.trumpData2[2]++
        break;
        case 'Web': $scope.trumpData2[3]++
        break;
        default: $scope.trumpData2[4]++
      }
    }

    //check source and increment for #feelthebern tweets
    else if (hashtags.indexOf('feelthebern') !== -1 && sentiments.score >= 0) {
      for (var i = 0; i < sentiments.positive.length; i++) {
        $scope.sentBerniePos.push(sentiments.positive[i]);
        }
      for (var i = 0; i < sentiments.negative.length; i++) {
          $scope.sentBernieNeg.push(sentiments.negative[i]);
          }
      switch (source) {
        case 'iPhone': $scope.sandersData[0]++
        break;
        case 'iPad': $scope.sandersData[1]++
        break;
        case 'Android': $scope.sandersData[2]++
        break;
        case 'Web': $scope.sandersData[3]++
        break;
        default: $scope.sandersData[4]++
      }
    }

    //check source and increment for #feelthebern tweets, but negative
    else if (hashtags.indexOf('feelthebern') !== -1 && sentiments.score < 0) {
      for (var i = 0; i < sentiments.positive.length; i++) {
        $scope.sentBerniePos.push(sentiments.positive[i]);
        }
      for (var i = 0; i < sentiments.negative.length; i++) {
          $scope.sentBernieNeg.push(sentiments.negative[i]);
          }
      switch (source) {
        case 'iPhone': $scope.sandersData2[0]++
        break;
        case 'iPad': $scope.sandersData2[1]++
        break;
        case 'Android': $scope.sandersData2[2]++
        break;
        case 'Web': $scope.sandersData2[3]++
        break;
        default: $scope.sandersData2[4]++
      }
    }

    else if (hashtags.indexOf('hillaryclinton') !== -1 && sentiments.score >= 0) {
      for (var i = 0; i < sentiments.positive.length; i++) {
        $scope.sentHillaryPos.push(sentiments.positive[i]);
        }
      for (var i = 0; i < sentiments.negative.length; i++) {
          $scope.sentHillaryNeg.push(sentiments.negative[i]);
          }
      switch (source) {
        case 'iPhone': $scope.hillaryData[0]++
        break;
        case 'iPad': $scope.hillaryData[1]++
        break;
        case 'Android': $scope.hillaryData[2]++
        break;
        case 'Web': $scope.hillaryData[3]++
        break;
        default: $scope.hillaryData[4]++
      }
    }

    //check source and increment for #feelthebern tweets, but negative
    else if (hashtags.indexOf('hillaryclinton') !== -1 && sentiments.score < 0) {
      for (var i = 0; i < sentiments.positive.length; i++) {
        $scope.sentHillaryPos.push(sentiments.positive[i]);
        }
      for (var i = 0; i < sentiments.negative.length; i++) {
          $scope.sentHillaryNeg.push(sentiments.negative[i]);
          }
      switch (source) {
        case 'iPhone': $scope.hillaryData2[0]++
        break;
        case 'iPad': $scope.hillaryData2[1]++
        break;
        case 'Android': $scope.hillaryData2[2]++
        break;
        case 'Web': $scope.hillaryData2[3]++
        break;
        default: $scope.hillaryData2[4]++
      }
    }
  });
}
]);


/*---------SOCKET IO METHODS (careful)---------*/

twitterStream.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
});
