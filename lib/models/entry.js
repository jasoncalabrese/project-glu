'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var EntrySchema = new Schema({
	timestamp: Date,
	bg: Number,
	direction: String
});



mongoose.model('Entry', EntrySchema);
