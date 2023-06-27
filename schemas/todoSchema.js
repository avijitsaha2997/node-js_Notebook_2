const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// instance methods
todoSchema.methods = {
  findActiveWithInstance: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },
};

// static methods
todoSchema.statics = {
  findActiveWithStatic: function () {
    return this.find({ status: "active" });
  },
};

// query methods
todoSchema.query = {
  findWithQuery: function () {
    return this.find({ title: "My 1st todo" });
  },
};

module.exports = todoSchema;
