const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

app.use(express.json());
app.use(cors());

const uri = process.env.DB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const courseCollection = client
      .db("courses_managment")
      .collection("course");

    app.get("/api/latest", async (req, res) => {
      const data = await courseCollection
        .find()
        .sort({ created_at: -1 })
        .limit(6)
        .toArray();
      res.send(data);
    });

    app.get("/api/courses", async (req, res) => {
      const data = await courseCollection
        .find()
        .sort({ created_at: -1 })
        .toArray();
      res.send(data);
    });

    app.get("/api/courses/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await courseCollection.findOne(query);
      res.send(result);
    });

    app.post("/api/courses", async (req, res) => {
      const newCourse = req.body;
      newCourse.created_at = new Date();
      const result = await courseCollection.insertOne(newCourse);
      res.send(result);
    });

    app.put("/api/courses/:id", async (req, res) => {
      const id = req.params.id;
      const updateUser = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          title: updateUser.title,
          category: updateUser.category,
          instructor: updateUser.instructor,
          duration: updateUser.duration,
          level: updateUser.level,
          price: updateUser.price,
          image: updateUser.image,
          description: updateUser.description,
        },
      };
      const result = await courseCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.delete("/api/courses/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await courseCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/api/myPost", async (req, res) => {
      try {
        const email = req.query.email;

        if (!email) {
          return res.status(400).send({ error: "Email is required" });
        }

        // MongoDB query: oi email diye course gula find koro
        const courses = await courseCollection.find({ email }).toArray();

        res.status(200).send(courses);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
      }
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(5000, () => console.log("Backend running on port 5000"));
