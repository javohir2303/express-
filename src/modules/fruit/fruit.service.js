import { Repository } from "../../lib/repository.js"
import { resolve } from "node:path"
import { ResData } from "../../lib/resData.js"
import { CustomError } from "../../lib/customError.js"
import {v4} from "uuid"

class FruitService {
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
            throw new CustomError(404, "Fruit not found")
        }
        return new ResData(200, "success", found)
    }

    async create(dto) {
        const newFruit = { id: v4(), ...dto }
        await this.#repository.writeAdd(newFruit)
        return new ResData(201, "created", newFruit)
    }

    async patch(id, updates) {
        const data = await this.#repository.readFile()
        const index = data.findIndex((item) => item.id === id)
        if (index === -1) {
            throw new CustomError(404, "Fruit not found")
        }

        const updatedFruit = { ...data[index], ...updates }
        data[index] = updatedFruit
        await this.#repository.writeFile(data)

        return new ResData(200, "updated", updatedFruit)
    }

    async delete(id) {
        const data = await this.#repository.readFile()
        const index = data.findIndex((item) => item.id === id)
        if (index === -1) {
            throw new CustomError(404, "Fruit not found")
        }

        const deleted = data.splice(index, 1)
        await this.#repository.writeFile(data)

        return new ResData(200, "deleted", deleted[0])
    }
}

const fruitPath = resolve("database", "fruit.json")
const fruitRepo = new Repository(fruitPath)
const fruitService = new FruitService(fruitRepo)

export { fruitService }
