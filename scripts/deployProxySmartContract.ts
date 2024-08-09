import { toNano } from '@ton/core';
import { ProxySmartContract } from '../wrappers/ProxySmartContract';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const proxySmartContract = provider.open(ProxySmartContract.createFromConfig({}, await compile('ProxySmartContract')));

    await proxySmartContract.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(proxySmartContract.address);

    // run methods on `proxySmartContract`
}
