import { Router } from "express";
import * as carRouter from "./car/car.routes.js"
import * as fruitRouter from "./fruit/fruit.routes.js"

const router = Router()

router.use("/fruit", fruitRouter.router)
router.use("/car", carRouter.router)

export {router}