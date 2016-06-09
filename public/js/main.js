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
    $scope.tweet = tweet.text;
    $scope.sentiment = sentiments.score;
    $scope.user = tweet.user.screen_name;
    //parse source from payload
    var source = tweet.source.split('>')[1].split('<')[0].split(' ')[2]
    //all hashtags in the tweet
    var hashtags = tweet.entities.hashtags.map(function(el){
      return el.text.toLowerCase()
    })
//////////////////////
    //check source and increment for #trump tweets
    if (hashtags.indexOf('trump') !== -1 && sentiments.score >= 0){
      //first nested for loop, iterates thru returned sentiments
      for (var i = 0; i < sentiments.positive.length; i++) {
        //vvv word in question vvv
        var wInQ = sentiments.positive[i];
        //^^^ word in question ^^^
        var ticker = 0;
        //second nested for loop, iterates thru current positive word array
          for (var j = 0; j < $scope.sentTrumpPos.length; j++) {
          if($scope.sentTrumpPos[j].txt === wInQ){
            //increment wInQ-count(displayed in html), and ticker-count(checks for existance)
            ticker++;
            $scope.sentTrumpPos[j].cnt++;
            if($scope.sentTrumpPos[j].cnt > 10 && $scope.sentTrumpPos[j].big === false){
              $scope.sentTrumpPos[j].big = true
            }
              }
          }
          //close second loop
        if (ticker === 0) {
          //if word doesnt exist, insert it with a count as an object
          var word = {
            txt: wInQ,
            cnt: 1,
            big: false
          };
          $scope.sentTrumpPos.push(word);
        }
      }
      //close first loop
      //do it again for negative words, and then repeat at a higher level for bernie and hillary
      for (var f = 0; f < sentiments.negative.length; f++) {
        var wInQ2 = sentiments.negative[f];
        var ticker2 = 0;
          for (var g = 0; g < $scope.sentTrumpNeg.length; g++) {
          if($scope.sentTrumpNeg[g].txt === wInQ2){
            ticker2++;
            $scope.sentTrumpNeg[g].cnt++;
            if($scope.sentTrumpNeg[g].cnt > 10 && $scope.sentTrumpNeg[g].big === false){
              $scope.sentTrumpNeg[g].big = true
            }
              }
          }
        if (ticker2 === 0) {
          var word2 = {
            txt: wInQ2,
            cnt: 1,
            big: false
          };
          $scope.sentTrumpNeg.push(word2);
        }
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
//////////////////////
    //check source and increment for #trump tweets, but negative

    else if (hashtags.indexOf('trump') !== -1 && sentiments.score < 0){
      for (var i = 0; i < sentiments.positive.length; i++) {
        var wInQ = sentiments.positive[i];
        var ticker = 0;
          for (var j = 0; j < $scope.sentTrumpPos.length; j++) {
          if($scope.sentTrumpPos[j].txt === wInQ){
            ticker++;
            $scope.sentTrumpPos[j].cnt++;
            if($scope.sentTrumpPos[j].cnt > 10 && $scope.sentTrumpPos[j].big === false){
              $scope.sentTrumpPos[j].big = true
            }
              }
          }
        if (ticker === 0) {
          var word = {
            txt: wInQ,
            cnt: 1,
            big: false
          };
          $scope.sentTrumpPos.push(word);
        }
      }

      for (var f = 0; f < sentiments.negative.length; f++) {
        var wInQ2 = sentiments.negative[f];
        var ticker2 = 0;
          for (var g = 0; g < $scope.sentTrumpNeg.length; g++) {
          if($scope.sentTrumpNeg[g].txt === wInQ2){
            ticker2++;
            $scope.sentTrumpNeg[g].cnt++;
            if($scope.sentTrumpNeg[g].cnt > 10 && $scope.sentTrumpNeg[g].big === false){
              $scope.sentTrumpNeg[g].big = true
            }
              }
          }
        if (ticker2 === 0) {
          var word2 = {
            txt: wInQ2,
            cnt: 1,
            big: false
          };
          $scope.sentTrumpNeg.push(word2);
        }
      }

      // $scope.sentTrumpPos.forEach(element, index, function(element, index){
      //   if(element[index].cnt >= 2){
      //     $scope.bigWordTrump[index] = element;
      //   }
      // });
      // $scope.sentTrumpNeg.forEach()
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
        var wInQ = sentiments.positive[i];
        var ticker = 0;
          for (var j = 0; j < $scope.sentBerniePos.length; j++) {
          if($scope.sentBerniePos[j].txt === wInQ){
            ticker++;
            $scope.sentBerniePos[j].cnt++;
            if($scope.sentBerniePos[j].cnt > 10 && $scope.sentBerniePos[j].big === false){
              $scope.sentBerniePos[j].big = true
            }
              }
          }
        if (ticker === 0) {
          var word = {
            txt: wInQ,
            cnt: 1,
            big: false
          };
          $scope.sentBerniePos.push(word);
        }
      }

      for (var f = 0; f < sentiments.negative.length; f++) {
        var wInQ2 = sentiments.negative[f];
        var ticker2 = 0;
          for (var g = 0; g < $scope.sentBernieNeg.length; g++) {
          if($scope.sentBernieNeg[g].txt === wInQ2){
            ticker2++;
            $scope.sentBernieNeg[g].cnt++;
            if($scope.sentBernieNeg[g].cnt > 10 && $scope.sentBernieNeg[g].big === false){
              $scope.sentBernieNeg[g].big = true
            }
              }
          }
        if (ticker2 === 0) {
          var word2 = {
            txt: wInQ2,
            cnt: 1,
            big: false
          };
          $scope.sentBernieNeg.push(word2);
        }
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
        var wInQ = sentiments.positive[i];
        var ticker = 0;
          for (var j = 0; j < $scope.sentBerniePos.length; j++) {
          if($scope.sentBerniePos[j].txt === wInQ){
            ticker++;
            $scope.sentBerniePos[j].cnt++;
            if($scope.sentBerniePos[j].cnt > 10 && $scope.sentBerniePos[j].big === false){
              $scope.sentBerniePos[j].big = true
            }
              }
          }
        if (ticker === 0) {
          var word = {
            txt: wInQ,
            cnt: 1,
            big: false
          };
          $scope.sentBerniePos.push(word);
        }
      }

      for (var f = 0; f < sentiments.negative.length; f++) {
        var wInQ2 = sentiments.negative[f];
        var ticker2 = 0;
          for (var g = 0; g < $scope.sentBernieNeg.length; g++) {
          if($scope.sentBernieNeg[g].txt === wInQ2){
            ticker2++;
            $scope.sentBernieNeg[g].cnt++;
            if($scope.sentBernieNeg[g].cnt > 10 && $scope.sentBernieNeg[g].big === false){
              $scope.sentBernieNeg[g].big = true
            }
              }
          }
        if (ticker2 === 0) {
          var word2 = {
            txt: wInQ2,
            cnt: 1,
            big: false
          };
          $scope.sentBernieNeg.push(word2);
        }
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
        var wInQ = sentiments.positive[i];
        var ticker = 0;
          for (var j = 0; j < $scope.sentHillaryPos.length; j++) {
          if($scope.sentHillaryPos[j].txt === wInQ){
            ticker++;
            $scope.sentHillaryPos[j].cnt++;
            if($scope.sentHillaryPos[j].cnt > 10 && $scope.sentHillaryPos[j].big === false){
              $scope.sentHillaryPos[j].big = true
            }
              }
          }
        if (ticker === 0) {
          var word = {
            txt: wInQ,
            cnt: 1,
            big: false
          };
          $scope.sentHillaryPos.push(word);
        }
      }
      for (var i = 0; i < sentiments.negative.length; i++) {
        var wInQ = sentiments.negative[i];
        var ticker = 0;
          for (var g = 0; g < $scope.sentHillaryNeg.length; g++) {
          if($scope.sentHillaryNeg[g].txt === wInQ){
            ticker++;
            $scope.sentHillaryNeg[g].cnt++;
            if($scope.sentHillaryNeg[g].cnt > 10 && $scope.sentHillaryNeg[g].big === false){
              $scope.sentHillaryNeg[g].big = true
            }
              }
          }
        if (ticker === 0) {
          var word = {
            txt: wInQ,
            cnt: 1,
            big: false
          };
          $scope.sentHillaryNeg.push(word);
        }
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
        var wInQ = sentiments.positive[i];
        var ticker = 0;
          for (var j = 0; j < $scope.sentHillaryPos.length; j++) {
          if($scope.sentHillaryPos[j].txt === wInQ){
            ticker++;
            $scope.sentHillaryPos[j].cnt++;
            if($scope.sentHillaryPos[j].cnt > 10 && $scope.sentHillaryPos[j].big === false){
              $scope.sentHillaryPos[j].big = true
            }
              }
          }
        if (ticker === 0) {
          var word = {
            txt: wInQ,
            cnt: 1,
            big: false
          };
          $scope.sentHillaryPos.push(word);
        }
      }

      for (var i = 0; i < sentiments.negative.length; i++) {
        var wInQ = sentiments.negative[i];
        var ticker = 0;
          for (var g = 0; g < $scope.sentHillaryNeg.length; g++) {
          if($scope.sentHillaryNeg[g].txt === wInQ){
            ticker++;
            $scope.sentHillaryNeg[g].cnt++;
            if($scope.sentHillaryNeg[g].cnt > 10 && $scope.sentHillaryNeg[g].big === false){
              $scope.sentHillaryNeg[g].big = true
            }
              }
          }
        if (ticker === 0) {
          var word = {
            txt: wInQ,
            cnt: 1,
            big: false
          };
          $scope.sentHillaryNeg.push(word);
        }
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
