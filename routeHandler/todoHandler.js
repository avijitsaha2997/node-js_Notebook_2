const express = require("express");
const todoSchema = require("../schemas/todoSchema.js");
const userSchema = require("../schemas/userSchema.js");
const mongoose = require("mongoose");
const checkLogin = require("../middlewares/checkLogin.js");
const Todo = new mongoose.model("Todo", todoSchema);
const User = new mongoose.model("User", userSchema);

const routerHandler = express.Router();

routerHandler.use("/", checkLogin);

// get all the todos
routerHandler.get("/", async (req, res) => {
  console.log(req.username);
  console.log(req.userId);
  try {
    const data = await Todo.find(
      {},
      {
        _id: 0,
        status: 0,
        __v: 0,
      }
    ).populate("user", " name status -_id");

    res.status(200).json({ res: data, message: "All data found sucessfully" });
  } catch (error) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// get all active the todos instance method
routerHandler.get("/instanceactive", async (req, res) => {
  try {
    const findActiveTodos = new Todo();
    const data = await findActiveTodos.findActiveWithInstance();
    res
      .status(200)
      .json({ res: data, message: "All active data found sucessfully" });
  } catch (error) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// get all active the todos with static method
routerHandler.get("/staticactive", async (req, res) => {
  try {
    const data = await Todo.findActiveWithStatic();
    res
      .status(200)
      .json({ res: data, message: "All active data found sucessfully" });
  } catch (error) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// get all matched the todos with query method
routerHandler.get("/querytitle", async (req, res) => {
  try {
    const data = await Todo.find().findWithQuery();
    res
      .status(200)
      .json({ res: data, message: "All active data found sucessfully" });
  } catch (error) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// get a single todo
routerHandler.get("/:id", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });
    res
      .status(200)
      .json({ res: data, message: "Single data found sucessfully" });
  } catch (error) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// post a todo
routerHandler.post("/", checkLogin, async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      user: req.userId,
    });
    await User.updateOne(
      {
        _id: req.userId,
      },
      {
        $push: {
          todos: todo._id,
        },
      }
    );
    res.status(200).send("Todo saved");
  } catch (error) {
    res.status(500).send("Error saving todo");
  }
  // try {
  //   const newTodo = new Todo(req.body);
  //   const todo = await newTodo.save();

  //   await User.updateOne(
  //     {
  //       _id: req.userId,
  //     },
  //     {
  //       $push: {
  //         todos: todo._id,
  //       },
  //     }
  //   );
  //   res.status(200).send("Todo saved");
  // } catch (error) {
  //   res.status(500).send("Error saving todo");
  // }
});

// post multiple todo
routerHandler.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).send("Todolist saved");
  } catch (error) {
    res.status(500).send("Error saving todolist");
  }
});

// put todo
routerHandler.put("/:id", async (req, res) => {
  //update single-------------------------------------
  //   try {
  //     await Todo.updateOne(
  //       { _id: req.params.id },
  //       {
  //         $set: {
  //           status: "active",
  //         },
  //       }
  //     );
  //     res.status(200).send("Todo updated successfully");
  //   } catch (error) {
  //     res.status(500).send("Error updating todo");
  //   }
  //update many-------------------------------------
  //   try {
  //   await Todo.updateMany(
  //       { status: "active" },
  //       {
  //         $set: {
  //           status: "inactive",
  //         },
  //       }
  //     );
  //     res.status(200).send("Todo updated successfully");
  //   } catch (error) {
  //     res.status(500).send("Error updating todo");
  //   }
  //update and get the result in response-------------------------------------
  try {
    const updateData = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      },
      { new: true }
    );
    console.log(updateData);
    res.status(200).send("Todo updated successfully");
  } catch (error) {
    res.status(500).send("Error updating todo");
  }
});

// delete todo
routerHandler.delete("/", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });

    res.status(200).send("Todo deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting todo");
  }
  //   try {
  //     await Todo.deleteMany({ status: "inactive" });

  //     res.status(200).send("Todo deleted successfully");
  //   } catch (error) {
  //     res.status(500).send("Error deleting todo");
  //   }
});

module.exports = routerHandler;
