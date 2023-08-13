const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('Verify', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Verify = await ethers.getContractFactory('Verify');
    const verify = await Verify.deploy();
    const [owner, signer2] = await ethers.getSigners();
    const manufacturerId = 123;
    const manufacturerName = "ABC Manufacturer";
    const drugId = 456; // Unique drug ID
    const drugName = "Painkiller";
    const batchNumber = 789;
    const lotNumber = 987;
    const expiryDate = Math.floor(Date.now() / 1000) + 3600; // Set expiry date 1 hour in the future
    
    console.log('Signer 1 address: ', owner.address);
    return { verify, owner, signer2, manufacturerId, manufacturerName, drugId, drugName, batchNumber, lotNumber, expiryDate };
  }

  
  it('Should register a new manufacturer', async function () {
    const { verify, manufacturerId, manufacturerName } = await loadFixture(deployContractAndSetVariables);
    await verify.registerManufacturer(manufacturerId, manufacturerName);
  });

  it('Should verify if a manufacturer is already registered', async function () {
    const { verify, manufacturerId, manufacturerName } = await loadFixture(deployContractAndSetVariables);
  
    // Register a manufacturer with the given ID and name
    await verify.registerManufacturer(manufacturerId, manufacturerName);
  
    // Attempt to register the same manufacturer ID again
    // This should fail, as the ID is already in use
    await expect(verify.registerManufacturer(manufacturerId, "Another Manufacturer")).to.be.revertedWith("Manufacturer ID already in use");
  });

  it('Should register a new drug only from a registered manufacturer', async function () {
    const { verify, manufacturerId, manufacturerName, drugId, drugName, batchNumber, lotNumber, expiryDate } = await loadFixture(deployContractAndSetVariables);
    // Register the manufacturer
    await verify.registerManufacturer(manufacturerId, manufacturerName);
      // Register a new drug from the registered manufacturer
    await verify.registerDrugInformation(manufacturerId, drugId, drugName, batchNumber, lotNumber, expiryDate);
       
    // // Attempt to register the same drug again from the same registered manufacturer
    // // This should fail, as the drug is already registered for the same manufacturer
    // await expect(verify.registerDrugInformation(manufacturerId, drugId, drugName, batchNumber, lotNumber, expiryDate))
    //     .to.be.revertedWith("Drug is already registered");
  });
   

});