import { fruitService } from "./fruit.service.js"

class FruitController {
    #fruitService
    constructor(fruitService) {
        this.#fruitService = fruitService
    }

    async getAll(req, res, next) {
        try {
            const resData = await this.#fruitService.getAll()
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }

    async getOneById(req, res, next) {
        try {
            const { id } = req.params
            const resData = await this.#fruitService.getOneById(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const dto = req.body
            const resData = await this.#fruitService.create(dto)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }

    async patch(req, res, next) {
        try {
            const { id } = req.params
            const updates = req.body
            const resData = await this.#fruitService.patch(id, updates)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const resData = await this.#fruitService.delete(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }
}

const fruitController = new FruitController(fruitService)
export { fruitController }
