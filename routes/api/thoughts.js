const router = require("express").Router();
const { User, Thought } = require("../../models");

router.get("/", async (req, res) => {
  //get all thoughts
  try {
    const getAllThoughts = await Thought.find();
    res.status(200).json(getAllThoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:_id", async (req, res) => {
  //get thought through id
  try {
    const getThought = await Thought.findOne({
      _id: req.params._id,
    });
    res.status(200).json(getThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:userId", async (req, res) => {
  //create new thought, and add to the user
  try {
    const createThought = await Thought.create(req.body);
    const addThoughtToUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { thoughts: createThought } },
      {
        new: true,
      }
    );
    addThoughtToUser;
    res.status(200).send(`thought added to user ${req.params.userId}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:_id", async (req, res) => {
  //update a thought through _id
  try {
    const updateThought = await Thought.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    res.status(200).json(updateThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:_id", async (req, res) => {
  //delete thought through _id
  try {
    const deleteThought = await Thought.findOneAndDelete({
      _id: req.params._id,
    });
    deleteThought;
    res.status(200).send(`Thought deleted by id ${req.params._id}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:thoughtId/reactions", async (req, res) => {
  //create a reaction associated with a thought
  try {
    const createReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reaction: req.body } },
      { new: true }
    );
    res.status(200).json(createReaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:thoughtId/reactions", async (req, res) => {
  //delete a reaction associated with a thought
  try {
    const deleteReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: req.body } },
      { new: true }
    );
    res.status(200).json(deleteReaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
