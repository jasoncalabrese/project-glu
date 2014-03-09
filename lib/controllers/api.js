'use strict';

var mongoose = require('mongoose'),
    Entry = mongoose.model('Entry');

exports.entries = function(req, res) {
  return Entry.find().sort({timestamp: -1}).exec(function(err, entries) {
    if (!err) {
      return res.json(entries);
    } else {
      return res.send(err);
    }
  });
};

exports.addEntry = function(req, res) {
  if (req.body) {
    console.info("entry body", req.body);
    Entry.create({
      timestamp: Date.now(),
      bg: req.body.bg,
      direction: req.body.direction
    });
    res.end("entry added");
  } else {
    res.send(new Error('No data'));
  }
};
