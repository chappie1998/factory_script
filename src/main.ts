import { Wallet, ContractFactory, JsonAbi } from "fuels";
import { readFileSync } from "fs";

const main = async () => {
  // We're using `WalletUnlocked` instead of `Wallet`
  // const wallet = new WalletUnlocked(
  //   "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
  // );
  const wallet = new Wallet(
    "0xb47af10f640516e5574255126c4a8dbfc149506b45d471eb7902133e06443577",
    "https://node-beta-1.fuel.network/graphql"
  );
  console.log("address", wallet.address);

  const deploy = async () => {
    const bytecode = readFileSync("./NFT.bin"); // Read the binary file
    const abiJSON = JSON.parse(
      readFileSync("./NFT-abi.json").toString()
    ) as JsonAbi;
    const factory = new ContractFactory(bytecode, abiJSON, wallet);
    console.log("deploy contract");
    const contract = await factory.deployContract({
      gasPrice: 100,
      gasLimit: 1_000_000,
      storageSlots: [],
    }); // deployContract takes no argument here.
    console.log("contract", contract.id.toB256());
  };
  deploy();
};

main()
  .then(() => process.exit)
  .catch((err) => console.log(err));
