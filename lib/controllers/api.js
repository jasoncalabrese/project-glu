'use strict';

var mongoose = require('mongoose'),
    Entry = mongoose.model('Entry'),
    _ = require("lodash");

exports.entries = function(req, res) {
  return Entry.find().sort({timestamp: -1}).limit(1000).exec(function(err, entries) {
    if (!err) {
      var prev = null;
      var filtered = _.filter(entries, function(entry) {
        if (prev === entry.bg) {
          return false;
        } else {
          prev = entry.bg;
          return true;
        }
      });
      return res.json(filtered);
    } else {
      return res.send(err);
    }
  });
};

exports.addEntry = function(req, res) {
  if (req.body) {
    var entry = {
      timestamp: (req.body.timestamp && new Date(req.body.timestamp) || Date.now()),
      bg: req.body.bg,
      direction: req.body.direction
    };
    Entry.create(entry);
    res.end("entry added");
  } else {
    res.send(new Error('No data'));
  }
};
