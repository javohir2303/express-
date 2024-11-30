import { carService} from "./car.service.js"

class CarController {
    #carService
    constructor(carService) {
        this.#carService = carService
    }

    async getAll(req, res, next) {
        try {
            const resData = await this.#carService.getAll()
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }

    async getOneById(req, res, next) {
        try {
            const { id } = req.params
            const resData = await this.#carService.getOneById(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const dto = req.body
            const resData = await this.#carService.create(dto)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }

    async patch(req, res, next) {
        try {
            const { id } = req.params
            const updates = req.body
            const resData = await this.#carService.patch(id, updates)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const resData = await this.#carService.delete(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }
}

const carController = new CarController(carService)
export { carController }
