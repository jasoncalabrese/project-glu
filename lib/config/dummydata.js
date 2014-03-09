//'use strict';

//var mongoose = require('mongoose'),
//  User = mongoose.model('User'),
//  Entry = mongoose.model('Entry');

// Clear old users, then add a default user
//User.find({}).remove(function() {
//  User.create({
//    provider: 'local',
//    name: 'Test User',
//    email: 'test@test.com',
//    password: 'test'
//  }, function() {
//      console.log('finished populating users');
//    }
//  );
//});

//Entry.find({}).remove(function() {
//  for (var bg = 80; bg < 200; bg++) {
//    Entry.create({
//      timestamp: Date.now(),
//      bg: bg,
//      direction: "FortyFiveUp"
//    });
//  }
//});