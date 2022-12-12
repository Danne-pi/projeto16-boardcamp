import bcrypt from "bcrypt";
import { usersCollection, sessionsCollection } from "../database/db.js";
import { v4 as uuid } from "uuid";
import { ObjectId } from "mongodb";

export async function signUp(req, res) {
  const user = req.body; // name, email and password

  try {
    const hashPassword = bcrypt.hashSync(user.password, 10);
    await usersCollection.insertOne({ ...user, password: hashPassword });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email, } = req.body;
  const token = uuid();

  try {
    const userExists = await usersCollection.findOne({ email });
    const sessionExists = await sessionsCollection.findOne({ userId: userExists._id })
    if (sessionExists){
      const resp = await sessionsCollection.deleteOne({_id: ObjectId(sessionExists._id)})
      console.log(resp)
    }

    await sessionsCollection.insertOne({
      token,
      userId: userExists._id,
    });

    res.send({ 
      name: userExists.name,
      email: userExists.email,
      token,
      userId: userExists._id,
     });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

