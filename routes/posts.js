const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

//GET all the posts
router.get("/", async (req, res) => {
  try {
    const allposts = await Post.find(); // retrun all posts ( mongoose)
    res.json(allposts);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

//POST (Submit) a post
router.post("/", async (req, res) => {
  // console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

//Specific post
router.get("/:id", async (req, res) => {
  //console.log(req.params.id);
  try {
    const singlePost = await Post.findById(req.params.id);
    res.json(singlePost);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

//delete a specific post
router.delete("/:id", async (req, res) => {
  try {
    const deletePost = await Post.remove({ _id: req.params.id });
    res.json(deletePost);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
        },
      }
    );
    res.json(updatePost);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

module.exports = router;
