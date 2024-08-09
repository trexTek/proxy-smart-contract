import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type ProxySmartContractConfig = {};

export function proxySmartContractConfigToCell(config: ProxySmartContractConfig): Cell {
    return beginCell().endCell();
}

export class ProxySmartContract implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new ProxySmartContract(address);
    }

    static createFromConfig(config: ProxySmartContractConfig, code: Cell, workchain = 0) {
        const data = proxySmartContractConfigToCell(config);
        const init = { code, data };
        return new ProxySmartContract(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
