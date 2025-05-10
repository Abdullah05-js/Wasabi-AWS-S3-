import express from "express"
import multer from "multer";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from "sharp";
import { v4 as uuid } from 'uuid';
import dotenv from "dotenv"
import prisma from "../DataBase/db.js";
dotenv.config()
const router = express.Router();
const storge = multer.memoryStorage()
const upload = multer({ storage: storge })
const bucket_Name = process.env.BUCKET_NAME
const bucket_Region = process.env.BUCKET_REGION
const bucket_AccessKey = process.env.BUCKET_ACCESS_KEY
const bucket_SecretKey = process.env.BUCKET_SECRET_KEY

const s3 = new S3Client({
    endpoint: 'https://s3.eu-south-1.wasabisys.com',
    credentials: {
        accessKeyId: bucket_AccessKey,
        secretAccessKey: bucket_SecretKey
    },
    region: bucket_Region,
    forcePathStyle: true
})

router.post("/CreatePost", upload.single("image"), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer()

        const imageName = uuid()
        const params = {
            Bucket: bucket_Name,
            Key: imageName,
            Body: buffer,
            ContentType: req.file.mimetype
        }
        const command = new PutObjectCommand(params)
        await s3.send(command)
        await prisma.post.create({
            data: {
                imgID: imageName,
                content: req.body.text,
                userId: 1,
            }
        })
        res.status(200)
    } catch (error) {
        console.log("error form /CreatePost :", error);
        res.status(404).json({
            error
        })
    }
})


router.get("/", async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                User: true
            }
        })

        console.log(posts);
        const ReturnPosts = []

        for (const post of posts) {
            const params = {
                Bucket: bucket_Name,
                Key: post.imgID
            }
            const command = new GetObjectCommand(params)

            const url = await getSignedUrl(s3, command, { expiresIn: 3600 })


            ReturnPosts.push({
                author: post.User.userName,
                content: post.content,
                url: url
            })
        }

        res.status(200).json(ReturnPosts)
    } catch (error) {
        console.log("error form /Posts : ", error);
        res.status(404).json({
            error
        })
    }
})


router.post("/createUser", async (req, res) => {
    try {
        const { userName } = req.body

        await prisma.user.create({
            data: {
                userName
            }
        })

        res.status(200).json({
            "message": "user created successfully"
        })
    } catch (error) {
        console.log("error form /createUser :", error);
        res.status(500).json({
            error
        })
    }
})

export default router