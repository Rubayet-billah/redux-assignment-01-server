const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const blogsCollection = client.db("Content").collection("blogs");
    // get blogs
    app.get("/blogs", async (req, res) => {
      const blogs = await blogsCollection.find({}).toArray();
      res.send(blogs);
    });
    // post blogs
    app.post("/blogs", async (req, res) => {
      const blog = req.body;
      const result = await blogsCollection.insertOne({
        ...blog,
        createdAt: new Date(),
      });
      res.send(result);
    });
    app.delete("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await blogsCollection.deleteOne(filter);
      res.send(result);
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
