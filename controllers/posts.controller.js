import { ObjectId } from "mongodb";
import {
  sessionsCollection,
  usersCollection,
  postsCollection,
} from "../database/db.js";
import { postsSchema } from "../models/posts.model.js";

export async function createPost(req, res) {
  const { type, desc, value } = req.body;
  const user = req.user;
  
  const { error } = postsSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  try {
    const newPost = {
      type,
      desc,
      value,
      user: user._id,
    };

    await postsCollection.insertOne(newPost);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function findPosts(req, res) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await sessionsCollection.findOne({ token });
    const user = await usersCollection.findOne({ _id: session?.userId });

    if (!user) {
      return res.sendStatus(401);
    }

    const posts = await postsCollection.find({user: ObjectId(user._id)}).sort({ _id: -1 }).toArray();
    res.send(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
