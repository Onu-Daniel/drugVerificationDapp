const ethers = require('ethers');
require('dotenv').config();

async function main() {

  const url = process.env.SEPOLIA_URL;

  let artifacts = await hre.artifacts.readArtifact("Verify");

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let verify = await factory.deploy();

  console.log("Verify address:", verify.address);

  await verify.deployed();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});