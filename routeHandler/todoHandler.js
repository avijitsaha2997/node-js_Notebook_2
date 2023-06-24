const express = require("express");
const todoSchema = require("../schemas/todoSchema.js");
const mongoose = require("mongoose");

const Todo = new mongoose.model("Todo", todoSchema);

const routerHandler = express.Router();

// get all the todos
routerHandler.get("/", async (req, res) => {});

// get a single todo
routerHandler.get("/:id", async (req, res) => {});

// post a todo
routerHandler.post("/", async (req, res) => {
  try {
    await Todo.create(req.body);
    res.status(200).send("Todo saved");
  } catch (error) {
    res.status(500).send("Error saving todo");
  }
});
// routerHandler.post("/", async (req, res) => {
//   try {
//     const newTodo = new Todo(req.body);
//     await newTodo.save();
//     res.status(200).send("Todo saved");
//   } catch (error) {
//     res.status(500).send("Error saving todo");
//   }
// });

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
routerHandler.delete("/:id", async (req, res) => {});

module.exports = routerHandler;
