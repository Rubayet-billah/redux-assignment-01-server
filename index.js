const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// mongodb setup

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bhwsqpg.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const blogsCollection = client.db("Content").collection("blogs");

    app.get("/blogs", async (req, res) => {
      const blogs = await blogsCollection.find({}).toArray();
      res.send(blogs);
    });
  } catch {}
};

run();

app.get("/", (req, res) => {
  res.send("hui hui hui...server is running");
});

app.listen(port, () => {
  console.log(`server is runing fine hui hui hui`);
});
