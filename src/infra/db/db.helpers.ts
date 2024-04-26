import { init } from "@paralleldrive/cuid2"

export function generateCUID() {
    const cuid = init({ length: 50 })
    return cuid()
}