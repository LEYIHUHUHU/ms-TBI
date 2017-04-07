"use strict";

/**
 * Controllers module which defines controllers.
 * @module myApp/controllers
 */
var app = angular.module("myApp.controllers", []);

// Survey controller
app.controller("worksheetCtrl", function($scope, $firebaseArray) {


        var ref = firebase.database().ref();
        // create a synchronized array
        $scope.worksheets = $firebaseArray(ref);
        // timestamp
        $scope.timestamp = new Date().getTime();

        // hide success information/alert
        $scope.successInfo = false;

        // open worksheet modal dialog
        $scope.takeworksheet = function () {
            $("#worksheet").modal("show");
        };

        $scope.slider = {
            value: 0,
            options: {
              floor: -5,
              ceil: 5,
              hidePointerLabels: true,
              hideLimitLabels: true,
              showTicks: false
            }
          };

        // store data in this object
        // and set default values
        $scope.formData = {
            "id": null,
            "outlook": null,
            "goal": null,
            "quality": null,
            "pac": null,
            "LoveOneWant": null,
            "LoveOneChoice": null,
            "question": "If you have any further question, please type here.",
            "feeling":null,
            "value": $scope.slider.value,

            "timestamp": $scope.timestamp
        };

        /**
         * Update rating score to object.
         * @param {Number} rating - Star rating score.
         */
        $scope.updateRating = function(rating) {
            $scope.formData.rating = rating;
        };

        /**
         * Add worksheet to Firebase database.
         */
        $scope.addworksheet = function() {
            if($scope.formData.id) {

                // change button to loading state
                var $btn = $("#addButton").button("loading");

                // push data to Firebase
                $scope.worksheets.$add($scope.formData).then(function() {
                   console.log($scope.formdata);
                    // dismiss worksheet modal dialog
                    $("#worksheet").modal("hide");
                    // reset button loading state
                    $btn.button("reset");
                    // show success information/alert
                    $scope.successInfo = true;
                });
            } else {
                alert("Please input the Reference Number.");
            }
        };

    }
);

// Login controller
app.controller("loginCtrl", function($scope, $location, Auth) {

        // temporary email and password placeholder
        $scope.email = "";
        $scope.password = "";

        /**
         * Login into app and redirect to result page
         */
        $scope.login = function() {

            $scope.authData = null;
            $scope.error = null;

            // change button to loading state
            var $btn = $("#loginButton").button("loading");

            // authentication using an email / password combination
            Auth.$signInWithEmailAndPassword(
                $scope.email,
                $scope.password
            ).then(function(authData) {
                // the data contains all auth info
                $scope.authData = authData;
                // redirect to result page after successful login
                $location.path("/result");
                // reset button loading state
                $btn.button("reset");
            }).catch(function(error) {
                // catch and display error if login fails
                $scope.error = error;
                // reset button loading state
                $btn.button("reset");
            });

        };
    }
);

// Result controller
app.controller("resultCtrl", function($scope, $firebaseArray) {

        var ref = firebase.database().ref();
        // download the data into local object
        $scope.results = $firebaseArray(ref);

    }
);
