import express from "express";

import { verifyToken } from "../verifyToken.js";
import {
  update,
  deleteUser,
  dislike,
  getUser,
  like,
  subscribe,
  unsubscribe,
} from "../controllers/user.js";

const router = express.Router();

export default router;

// Update User
router.put("/:id", verifyToken, update);

// delete User
router.delete("/:id", verifyToken, deleteUser);

// get a User
router.get("/find/:id",getUser);

// Subscribe a user
router.put("/sub/:id", verifyToken,subscribe);

// Unsubscribe a user
router.put("/unsub/:id",verifyToken, unsubscribe);

// like a video
router.put("/like/:videoId",verifyToken, like);

// dislike a video
router.put("/dislike/:videoId",verifyToken, dislike);
