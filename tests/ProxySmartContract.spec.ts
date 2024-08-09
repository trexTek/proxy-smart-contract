import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { ProxySmartContract } from '../wrappers/ProxySmartContract';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('ProxySmartContract', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('ProxySmartContract');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let proxySmartContract: SandboxContract<ProxySmartContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        proxySmartContract = blockchain.openContract(ProxySmartContract.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await proxySmartContract.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: proxySmartContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and proxySmartContract are ready to use
    });
});
