import { Connection } from "mongoose"
declare global {
    var mongoose : {
        connection :Connection | null
        promise : Promise | null
    }
}

export {global}
