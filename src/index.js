import express from "express"
import cors from "cors"
import { router } from "./modules/module.routes.js"
import { ResData } from "./lib/resData.js"

const server = express()

server.use(cors())
server.use(express.json())

server.use("/api", router)

server.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const resData = new ResData(statusCode, err.massage)
    res.status(resData.statusCode).json(resData)
})

server.listen(2222, ()=>{
    console.log("server ishga tushdi...");
})