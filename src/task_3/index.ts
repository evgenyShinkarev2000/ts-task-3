/** Задача 3 - Моё хранилище
 *	Напишите класс хранилища(Vault)
 *	Из хранилища можно снимать валюту с помощью withdraw(Currency)
 *	В хранилище можно вкладывать валюту через deposit(Currency)
 *	Из хранлилища, можно переводить валюту через transfer(Currency, Vault)
*/
import { Currency } from "../task_1";

export class Vault implements ISecureVaultRequisites {
	public id: number;
	public store: Set<Currency> = new Set<Currency>()
	public withdraw(c: Currency): void {
		let hasCurrency = false;
		for (const x of Array.from(this.store)) {
			if (x.name === c.name) {
				if (c.value > x.value) {
					throw new Error("The loan denied");
				}
				x.value -= c.value;
				hasCurrency = true;
				break;
			}
		}
		if (!hasCurrency) {
			throw new Error(`store doesn't contain ${c.name}`);
		}
	}
	public deposit(c: Currency): void{
		let hasCurrency = false;
		for(const x of Array.from(this.store)) {
			if (x.name === c.name) {
				x.value += c.value;
				hasCurrency = true;
				break;
			}
		}
		if (!hasCurrency){
			this.store.add(c);
		}
	}
	public transfer(c: Currency, v: Vault): void{
		this.withdraw(c);
		v.deposit(c);
	}
}

export interface ISecureVaultRequisites{
	id: number
}
