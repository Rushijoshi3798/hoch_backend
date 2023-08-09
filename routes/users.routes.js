const express = require("express");

const { UserModel } = require("../models/users.model");

const userRouter = express.Router();

// Get Route
userRouter.get("/", async (req, res) => {
  const { name } = req.body;

  if (name) {
    try {
      const users = await UserModel.find({
        Fname: name,
      });
      res.status(200).send(users);

      if (!users.length) {
        const user = await UserModel.find({
          Lname: name,
        });
        res.status(200).send(user);
      }
    } catch (error) {
      console.log(error);
      res.status(404).send({ msg: "Not Able to Get UserData from Server" });
    }
  } else if (!name) {
    try {
      const users = await UserModel.find();
      res.status(200).send(users);
    } catch (error) {
      console.log(error);
      res.status(404).send({ msg: "Not Able to Get All UserData from Server" });
    }
  }
});

// Post Route
userRouter.post("/add", async (req, res) => {
  try {
    const addUser = new UserModel(req.body);
    await addUser.save();
    res.status(200).send({ msg: "user has been Successfully added " });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "something went Wrong, user has not been added! " });
    console.log(error);
  }
});

// Update Route
userRouter.patch("update/:userID" , async (req, res) => {
    const payload = req.body;
    const userID = req.params.userID;

    const user = await UserModel.findOne({ _id: userID});

    if(user){
        await UserModel.findByIdAndUpdate({ _id: userID}, payload);
        res.status(200).send({msg: "User Details has been successfully Updated"})
    }else {
        res.status(400).send({msg: "Something went wrong, Details not updated"})
    }

})

// Delete Route
userRouter.patch("delete/:userID" , async (req, res) => {
    const userID = req.params.userID;

    const user = await UserModel.findOne({ _id: userID});

    if(user){
        await UserModel.findByIdAndDelete({ _id: userID});
        res.status(200).send({msg: "User Details has been successfully Deleted!"})
    }else {
        res.status(400).send({msg: "Something went wrong, Details not Delteted"})
    }

})

module.exports = {
  userRouter,
};
