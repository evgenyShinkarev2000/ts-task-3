/**
 * Задание 4 - Гарантия доставки
 * Денюжки со счета на счет перевести легко, а вот дотащить 3 килограмма палладия, может быть затруднительно
 * Изучите интервейс IContract
 * Опищите и реализуйте функционал сущности Договора-контракта
 * BankingContract - банковский перевод, без задержки
 * SmartContract - перевод через блокчейн, задержка 3000мс
 * LogisticContract - перевозка металла, задержка 6000мс
 */
import { Currency } from "../task_1";

abstract class Contract implements IContract {
    public readonly id: number;
    protected _state: ContractState = ContractState.pending;
    public get state(): ContractState {
        return this._state;
    }
    private _value: Currency;
    public get value(): Currency {
        return this._value;
    }
    public readonly receiver: { id: number };
    public readonly sender: { id: number };

    public closeTransfer(): void {
        this._state = ContractState.close;
    }

    public rejectTransfer(): void {
        this._state = ContractState.rejected;
    }

    public abstract signAndTransfer(): void;
}

export class SmartContract extends Contract {
    public signAndTransfer(): void {
        this._state = ContractState.transfer;
        setTimeout(() => this.closeTransfer(), 3000);
    }
}

export class BankingContract extends Contract {
    public signAndTransfer(): void {
        this._state = ContractState.close;
    }
}

export class LogisticContract extends Contract {
    public signAndTransfer(): void {
        this._state = ContractState.transfer;
        setTimeout(() => this.closeTransfer(), 6000);
    }
}

export interface IContract {
    /**
     * Уникальный номер контракта
     */
    id: number;
    /**
     * Текущее состояние контракта
     */
    state: ContractState;
    /**
     * Предмет контракта
     */
    value: Currency;
    /**
     * Реквизиты отправителя
     */
    sender: { id: number };
    /**
     * Реквизиты получателя
     */
    receiver: { id: number };
    /**
     * Начало исполнения контракта
     */
    signAndTransfer: () => void;
    /**
     * Успешное завершение контракта
     */
    closeTransfer: () => void;
    /**
     * Отмена исполнения контракта
     */
    rejectTransfer: () => void;
}

export enum ContractState {
    /**
     * Контракт находится в ожидании исполнения
     */
    pending,
    /**
     * Контракт находится в исполнении
     */
    transfer,
    /**
     * Контракт исполнен успешно
     */
    close,
    /**
     * Контракт отменен, либо отклонен
     */
    rejected,
}