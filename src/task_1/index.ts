/** Задача 1 - Сущность любой монетки
 * Опишите класс валюты
 * Он должен определять имя(name) валюты, String
 * Содержать количество(value) валюты, Number
 * Содержать количественный тип(unit), в котором исчисляется валюта, String
 * Класс должен предоставлять информацию о типе валюты: Материальная, криптовалюта или металл-депозит
 * Example new Currency("DOGE", 12.5, "satoshi")
 */

 export enum CurrencyType {
    Material,
    Crypto,
    Metal
}

export class Currency{
    private static readonly _selector: {[name: string]: string[]} = {
        [CurrencyType.Material]: ["Dollar", "Ruble"],
        [CurrencyType.Crypto]: ["Etherium", "XRP"],
        [CurrencyType.Metal]: ["Gold"]
    }
    public readonly name: string;
    public readonly unit: string;
    public readonly type: CurrencyType;
    private _value: number;
    public get value(): number{
        return this._value;
    }
    public set value(n: number){
        if (n < 0){
            throw new Error(`value can't be less 0, got ${n}`);
        }
        this._value = n;
    }
    
    constructor(name: string, value = 0, unit: string){
        if (name?.length === 0 || unit.length === 0){
            throw new Error("required not empty name or unit");
        }
        for (const i in Currency._selector){
            if (name in Currency._selector[i]){
                this.type = parseInt(i);
                break;
            }
        }
        this.name = name;
        this.unit = unit;
        this.value = value;
    }
}
