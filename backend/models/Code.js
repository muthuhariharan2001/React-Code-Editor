const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  language: { type: String, required: true },
  version: { type: String, required: true },  // Added version as required
  code: { type: String, required: true },
  output: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Code', codeSchema);
