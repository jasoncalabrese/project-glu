'use strict';

var mongoose = require('mongoose'),
  crypto = require('crypto'),
  base32hex = require('../base32hex.js'),
  moment = require('moment'),
  Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var EntrySchema = new Schema({
  _id: String,
  timestamp: Date,
  bg: Number,
  direction: String
}, { _id: false });


EntrySchema.pre('save', function (next) {
  if (!this._id) {
    var hasher = crypto.createHash('sha1');

    var timestamp = moment(this.timestamp).format('YYYY-MM-DDTHH:mm:ss'),
      bg = this.bg.toString(),
      direction = this.direction;

    hasher.update(timestamp);
    hasher.update(bg);
    hasher.update(direction);
    this._id = base32hex.encodeBuffer(hasher.digest(), { paddingChar: '-' });
    console.info('entry: pre-save', this);
  }
  next();
});

mongoose.model('Entry', EntrySchema);
