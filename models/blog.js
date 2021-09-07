const mongoose = require("mongoose");

const blogschema = mongoose.Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  tag1: {
    type: String,
  },
  tag2: {
    type: String,
  },
  tag3: {
    type: String,
  },
  tag4: {
    type: String,
  },
  tag5: {
    type: String,
  },
  user: {
    type: String,
  },
  timestamp: {
    type: Number,
  },
  impressions: {
    type: Number,
  },
  views: {
    type: Number,
  },
});

const Blog = (module.exports = mongoose.model("Blog", blogschema));

module.exports.createBlog = (details, callback) => {
  Blog.create(details, callback);
};
module.exports.getSpecificBlog = (details, callback) => {
  Blog.findById(details, callback);
};
module.exports.getBlogs = (callback) => {
  Blog.find(callback);
};

module.exports.getUserBlogs = (details, callback) => {
  Blog.find({ user: details }, callback);
};

module.exports.updateImpressions = (id, details, options, callback) => {
  var query = { _id: id };
  var update = {
    title: details.title,
    text: details.text,
    tag1: details.tag1,
    tag2: details.tag2,
    tag3: details.tag3,
    tag4: details.tag4,
    tag5: details.tag5,
    user: details.user,
    timestamp: details.timestamp,
    impressions: details.impressions + 1,
    views: details.views,
  };
  Blog.findOneAndUpdate(query, update, options, callback);
};

module.exports.updateViews = (id, details, options, callback) => {
  console.log(id);
  console.log(details);
  var query = { _id: id };
  var update = {
    title: details.title,
    text: details.text,
    tag1: details.tag1,
    tag2: details.tag2,
    tag3: details.tag3,
    tag4: details.tag4,
    tag5: details.tag5,
    user: details.user,
    timestamp: details.timestamp,
    impressions: details.impressions,
    views: details.views + 1,
  };
  Blog.findOneAndUpdate(query, update, options, callback);
};
