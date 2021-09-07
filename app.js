const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//db connection
mongoose.connect("mongodb://localhost/trell");
var db = mongoose.connection;

app.use(express.json());

//importing models
User = require("./models/user");
Blog = require("./models/blog");

//api for user registration
app.post("/api/user/register", (req, res) => {
  var details = req.body;

  User.createUser(details, (err, user) => {
    if (err) {
      if (err.code == 11000) {
        return res
          .status(500)
          .send({ status: "error", message: "Username already exists" });
      }
      return res.status(500).send({ status: "error", message: "server error" });
    }
    return res.json(user);
  });
});
//api to get all users
app.get("/api/user/allusers", (req, res) => {
  User.allUsers((err, users) => {
    return res.json(users);
  });
});

//api for creating blog
app.post("/api/blog/create", (req, res) => {
  var details = req.body;

  Blog.createBlog(details, (err, blog) => {
    if (err) {
      return res.status(500).send({ status: "error", message: "server error" });
    }
    return res.json(blog);
  });
});

//api for fetching blogs for a user
function sortByProperty(property) {
  return function (a, b) {
    if (a[property] < b[property]) return 1;
    else if (a[property] > b[property]) return -1;

    return 0;
  };
}
app.post("/api/blog/getblogs", (req, res) => {
  var details = req.body;
  var int1 = details.interest1;
  var int2 = details.interest2;
  var int3 = details.interest3;
  Blog.getBlogs((err, blogs) => {
    if (err) {
      return res.status(500).send({ status: "error", message: "server error" });
    }
    var output = [];
    for (let i = 0; i < blogs.length; i++) {
      var temp = blogs[i];
      if (
        temp.tag1 == int1 ||
        temp.tag2 == int1 ||
        temp.tag3 == int1 ||
        temp.tag4 == int1 ||
        temp.tag5 == int1
      ) {
        output.push(blogs[i]);
      }
    }
    for (let i = 0; i < blogs.length; i++) {
      var temp = blogs[i];
      if (
        temp.tag1 == int2 ||
        temp.tag2 == int2 ||
        temp.tag3 == int2 ||
        temp.tag4 == int2 ||
        temp.tag5 == int2
      ) {
        output.push(blogs[i]);
      }
    }
    for (let i = 0; i < blogs.length; i++) {
      var temp = blogs[i];
      if (
        temp.tag1 == int3 ||
        temp.tag2 == int3 ||
        temp.tag3 == int3 ||
        temp.tag4 == int3 ||
        temp.tag5 == int3
      ) {
        output.push(blogs[i]);
      }
    }
    output.sort(sortByProperty("timestamp"));
    for (let i = 0; i < output.length; i++) {
      Blog.updateImpressions(output[i]._id, output[i], {}, (err, blog) => {
        if (err) {
          return res
            .status(500)
            .json({ status: "error", message: "Server error" });
        }
        // return res.json(blog);
        console.log("updated");
      });
    }
    if (output.length > 10) {
      return res.json(output.slice(0, 10));
    }
    return res.json(output);
  });
});

//api for fetching a particular blog
app.get("/api/blog/getSpecificBlog/:id", (req, res) => {
  var details = req.params.id;
  Blog.getSpecificBlog(details, (err, blog) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Server error" });
    }

    Blog.updateViews(details, blog, {}, (err, updatedblog) => {
      if (err) {
        // console.log(err);
        return res
          .status(500)
          .json({ status: "error", message: "Server error" });
      }
      return res.json(updatedblog);
    });
  });
});

//api for fetching blogs by user
app.get("/api/blogs/getuserblogs/:id", (req, res) => {
  var details = req.params.id;
  Blog.getUserBlogs(details, (err, blogs) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Server error" });
    }
    blogs.sort(sortByProperty("impressions"));
    blogs.sort(sortByProperty("views"));
    return res.json(blogs);
  });
});

//api for fetching percentage distribution
app.get("/api/blogs/getpercentage/:id", (req, res) => {
  var details = req.params.id;
  Blog.getUserBlogs(details, (err, blogs) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Server error" });
    }
    var dict = {};
    var temp;
    var val;
    var c = 0;
    for (let i = 0; i < blogs.length; i++) {
      temp = blogs[i].tag1;
      if (temp != "") {
        if (temp in dict) {
          val = dict[temp];
          dict.temp = val + 1;
        } else {
          dict[temp] = 1;
          c++;
        }
      }

      temp = blogs[i].tag2;
      if (temp != "") {
        if (temp in dict) {
          val = dict[temp];
          dict.temp = val + 1;
        } else {
          dict[temp] = 1;
          c++;
        }
      }

      temp = blogs[i].tag3;
      if (temp != "") {
        if (temp in dict) {
          val = dict[temp];
          dict.temp = val + 1;
        } else {
          dict[temp] = 1;
          c++;
        }
      }

      temp = blogs[i].tag4;
      if (temp != "") {
        if (temp in dict) {
          val = dict[temp];
          dict.temp = val + 1;
        } else {
          dict[temp] = 1;
          c++;
        }
      }

      temp = blogs[i].tag5;
      if (temp != "") {
        if (temp in dict) {
          val = dict[temp];
          dict.temp = val + 1;
        } else {
          dict[temp] = 1;
          c++;
        }
      }
    }
    var output = {};
    for (var key in dict) {
      output[key] = (dict[key] / c) * 100;
    }

    return res.json(output);
  });
});

//api for displaying blogs by city
// app.get("/api/blogs/getUserBlogsByCity", (req, res) => {
//   Blog.getBlogs((err, blogs) => {
//     if (err) {
//       return res.status(500).json({ status: "error", message: "Server error" });
//     }
//     var dict = {};
//   });
// });
app.listen(5000);
console.log("Running on port 5000");
