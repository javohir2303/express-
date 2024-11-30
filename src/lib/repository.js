import fs from "node:fs/promises"

class Repository {
    #dir
    constructor(dir) {
        this.#dir = dir
    }

    async readFile() {
        let data = await fs.readFile(this.#dir, {encoding : "utf8"})

        if (data) {
            data = JSON.parse(data)
        } else {
            data = []
        }
        return data
    }


    async writeFile(data) {
        await fs.writeFile(this.#dir, JSON.stringify(data, null, 4), {encoding : "utf8"})
    }


    async writeAdd(data) {
        const add = this.readFile()
        add.push(data)
        await this.writeFile(add)
    }
}


export {Repository}