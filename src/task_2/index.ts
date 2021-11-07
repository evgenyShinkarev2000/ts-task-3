/** Задача 2 - Много стран, много валют
 * Определите классы следующих валют
 * Dollar
 * Ruble
 * XRP
 * Etherium
 * Gold
*/

import { Currency } from "../task_1";

export class Dollar extends Currency{
    constructor(value: number){
        if (value < 0){
            throw new Error("value < 0");
        }
        super("dollar", value, "$");
    }
}
export class Ruble extends Currency{
    constructor(value: number){
        if (value < 0){
            throw new Error("value < 0");
        }
        super("Ruble", value, "Р");
    }
}
export class XRP extends Currency{
    constructor(value: number){
        if (value < 0){
            throw new Error("value < 0");
        }
        super("XRP", value, "XRP");
    }
}
export class Etherium extends Currency{
    constructor(value: number){
        if (value < 0){
            throw new Error("value < 0");
        }
        super("Etherium", value, "eth");
    }
}
export class Gold extends Currency{
    constructor(value: number){
        if (value < 0){
            throw new Error("value < 0");
        }
        super("Gold", value, "oz");
    }
}
