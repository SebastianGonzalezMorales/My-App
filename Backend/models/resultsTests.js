const mongoose = require('mongoose');


const resultsTestsSchema = new mongoose.Schema({
    total: {
      type: Number,
      required: true,
    },
    severity: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  });
  

  exports.ResultsTests = mongoose.model('resultsTests', resultsTestsSchema);
  exports.resultsTestsSchema = resultsTestsSchema;
  