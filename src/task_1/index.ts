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
    public readonly name: string;
    public readonly unit: string;
    public readonly type: CurrencyType;
    private _value: number;
    private static readonly _selector: {[s: string]: CurrencyType} = {
        "dollar": CurrencyType.Material,
        "ruble": CurrencyType.Material,
        "xrp": CurrencyType.Crypto,
        "etherium": CurrencyType.Crypto,
        "gold": CurrencyType.Metal
    }
    public get value(): number{
        return this._value;
    }
    public set value(n: number){
        if (!isFinite(n) || n < 0){
            throw new Error(`value can't be less 0, got ${n}`);
        }
        this._value = n;
    }
    
    constructor(name: string, value = 0, unit: string){
        if (!this.isStringCorrect(name) || !this.isStringCorrect(unit)){
            throw new Error("required not empty name or unit");
        }
        this.name = name;
        this.type = Currency._selector[name.toLowerCase() as keyof typeof Currency._selector];
        this.unit = unit;
        this.value = value;
    }

    private isStringCorrect(s: string){
        return s && typeof s === "string"
    }
}