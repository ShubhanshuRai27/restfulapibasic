require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 4000;

//Middleware
app.use(cors());
app.use(express.json());


//Import routes
app.get("/", (req, res) => {
  res.send("Working HOME PAGE");
});

const postsRoute = require("./routes/posts");

app.use("/posts", postsRoute);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connection established");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
