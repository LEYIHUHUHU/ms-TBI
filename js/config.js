"use strict";

/**
 * Config module which defines Firebase URL.
 * @module myApp/config
 */
var app = angular.module("myApp.config", []);

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCS8XCsEWPGzrnJcy6bNCAKjIp1INJ_gSQ",
    authDomain: "ms-tbi.firebaseapp.com",
    databaseURL: "https://ms-tbi.firebaseio.com",
    storageBucket: "ms-tbi.appspot.com",
    messagingSenderId: "49753783300"
  };
  firebase.initializeApp(config);

  // double-check whether the app has been configured
if (config.authDomain === "angularfire-survey.firebaseapp.com") {
    angular.element(document.body).html("<h1>Please configure app/js/config.js before running!</h1>");
}
