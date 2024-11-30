import { Router } from "express"
import { carController } from "../car/car.controllers.js"

const router = Router()

router.get("/", carController.getAll.bind(carController))
router.get("/:id", carController.getOneById.bind(carController))
router.post("/", carController.create.bind(carController))
router.patch("/:id", carController.patch.bind(carController))
router.delete("/:id", carController.delete.bind(carController))

export { router }
