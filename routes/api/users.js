const router = require("express").Router();
const { User, Thought } = require("../../models");

router.get("/", async (req, res) => {
  //get all users. 'get'-/api/users/
  try {
    const getAllUsers = await User.find();
    res.status(200).json(getAllUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:_id", async (req, res) => {
  //get user by id. 'get'-/api/users/:_id
  try {
    const getUser = await User.findOne({
      _id: req.params._id,
    }).populate("thoughts", "friends");
    res.status(200).json(getUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  //create user. 'post'-/api/users/
  try {
    const createUser = await User.create(req.body);
    createUser;
    res.status(200).send("user created");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:_id", async (req, res) => {
  //update user info by _id. 'put'-/api/users/
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:_id", async (req, res) => {
  //delete user and their thoughts
  try {
    const findUsersThoughts = await User.findOne({ _id: req.params._id });
    if (findUsersThoughts.thoughts.length !== 0) {
      const usersThoughts = findUsersThoughts.thoughts;
      usersThoughts.forEach(async (element) => {
        const deleteThoughts = await Thought.findOneAndRemove({
          _id: element._id,
        });
        deleteThoughts;
      });
    }
    const deleteUser = await User.findOneAndRemove({
      _id: req.params._id,
    });
    deleteUser;
    res.status(200).send("user and their thoughts successfully deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:userId/friends/:friendId", async (req, res) => {
  //add a friend
  try {
    const addFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    res.status(200).json(addFriend);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:userId/friends/:friendId", async (req, res) => {
  //remove a friend
  try {
    const addFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    res.status(200).json(addFriend);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
