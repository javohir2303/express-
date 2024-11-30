import { Repository } from "../../lib/repository.js"
import { resolve } from "node:path"
import { ResData } from "../../lib/resData.js"
import { CustomError } from "../../lib/customError.js"
import {v4} from "uuid"

class CarService {
    #repository
    constructor(repository) {
        this.#repository = repository
    }

    async getAll() {
        const data = await this.#repository.readFile()
        return new ResData(200, "success", data)
    }

    async getOneById(id) {
        const data = await this.#repository.readFile()
        const found = data.find((item) => item.id === id)
        if (!found) {
            throw new CustomError(404, "Car not found")
        }
        return new ResData(200, "success", found)
    }

    async create(dto) {
        const newCar = { id: v4(), ...dto }
        await this.#repository.writeAdd(newCar)
        return new ResData(201, "created", newCar)
    }

    async patch(id, updates) {
        const data = await this.#repository.readFile()
        const index = data.findIndex((item) => item.id === id)
        if (index === -1) {
            throw new CustomError(404, "Car not found")
        }

        const updatedCar = { ...data[index], ...updates }
        data[index] = updatedCar
        await this.#repository.writeFile(data)

        return new ResData(200, "updated", updatedCar)
    }

    async delete(id) {
        const data = await this.#repository.readFile()
        const index = data.findIndex((item) => item.id === id)
        if (index === -1) {
            throw new CustomError(404, "Car not found")
        }

        const deleted = data.splice(index, 1)
        await this.#repository.writeFile(data)

        return new ResData(200, "deleted", deleted[0])
    }
}

const CarPath = resolve("database", "car.json")
const CarRepo = new Repository(CarPath)
const carService = new CarService(CarRepo)

export { carService }
