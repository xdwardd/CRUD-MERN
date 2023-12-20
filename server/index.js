const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();
const cors = require("cors");
const { Long } = require("mongodb");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//routes

app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

//Add data
app.post("/adduser", async (req, res) => {
  try {
    const user = await User.create(req.body);
    // res.status(200).json(user);
    res.status(200).json({ success: true, reason: "Addedd Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Fetch Data

app.get("/getusers", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

//Get Data by id

app.get("/getUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//update data

app.put("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, position } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, {
      name: name,
      email: email,
      position: position,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, reason: `Cannot find user with ID ${id}` });
    }

    res.status(200).json({ success: true, reason: "Successfully Updated" });
  } catch (error) {
    res.status(500).json({ success: false, reason: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json({ success: true, reason: "User Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//connect to mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://edwardcatapan:p9HfnKegBXqBJw70@nodeapi.dsgj74g.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
