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

function directionToTrend(direction) {
	var trend = 8;

	switch (direction) {
		case "NONE":
			trend = 0;
			break;
		case "DoubleUp":
			trend = 1;
			break;
		case "SingleUp":
			trend = 2;
			break;
		case "FortyFiveUp":
			trend = 3;
			break;
		case "Flat":
			trend = 4;
			break;
		case "FortyFiveDown":
			trend = 5;
			break;
		case "SingleDown":
			trend = 6;
			break;
		case "DoubleDown":
			trend = 7;
			break;
		case "NOT COMPUTABLE":
			trend = 8;
			break;
		case "RATE OUT OF RANGE":
			trend = 9;
			break;
		default:
			trend = 8;
	}

	return trend;
}

exports.pebble = function(req, res) {
	return Entry.find().sort({timestamp: -1}).limit(3).exec(function(err, entries) {
		if (err)
			return res.send(err);
		else {
			var reversed = entries.reverse(),
				prev = null,
				bgDelta = 0,
				timeDelta = 0;

			var bgs = reversed.map(function(entry) {
				if (prev && prev.bg > 39 && entry.bg > 39) {
					bgDelta = entry.bg - prev.bg;
					timeDelta = entry.timestamp - prev.timestamp;
				}
				prev = entry;

				return {
					datetime: new Date(entry.timestamp),
					sgv: entry.bg.toString(),
					trend: directionToTrend(entry.direction),
					direction: entry.direction,
					bgDelta: bgDelta,
					timeDelta: timeDelta
				};

			}).reverse();

			return res.json({
				status: [{now: new Date()}],
				bgs: bgs
			});

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
