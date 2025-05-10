import express from "express"
import PostApi from "./PostApi.js"
const router = express.Router()

router.use("/posts", PostApi);

export default router;