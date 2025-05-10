import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import router from "./Router/index.js";
const app = express();
dotenv.config()


app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router)

app.listen(process.env.PORT, async (e) => {
    console.log("server runnimg on", process.env.PORT);
})
