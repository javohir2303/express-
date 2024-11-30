import { Router } from "express"
import { fruitController } from "../fruit/fruit.controllers.js"

const router = Router()

router.get("/", fruitController.getAll.bind(fruitController))
router.get("/:id", fruitController.getOneById.bind(fruitController))
router.post("/", fruitController.create.bind(fruitController))
router.patch("/:id", fruitController.patch.bind(fruitController))
router.delete("/:id", fruitController.delete.bind(fruitController))

export { router }
