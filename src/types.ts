import { TTransactionFromAPI, TTransaction } from '@waves/ts-types';
import { BigNumber } from '@waves/bignumber';

export type Asset = {
    name: string;
    ticker?: string;
    decimals: number;
    scripted: boolean;
}

export type Money = {
    amount: BigNumber;
    asset: Asset;
}

export type Balance = {
    available: Money;
    reserved: Money;
    leased: Money;
}

export type LONG = string | number;

export type DataStream<T> = {
    onData: (data: T) => void;
    terminate(): void;
}

export type BalanceStream = {
    hash: Record<string, Balance>;
    change(cb: () => void): void;
}

export type DataManager = {
    getAssets(assetIdList: Array<string | null>): Promise<Array<Asset>>;
    getTransactions(limit: number): Promise<TTransactionFromAPI<LONG>[]>;

    getTransactionsWithAssets(address: string, limit: number): Promise<TTransactionFromAPI<Money>[]>;

    broadcast(tx: TTransaction<Money>): Promise<TTransactionFromAPI<LONG>>;

    createBalanceStream(): Promise<DataStream<Balance>>
}
