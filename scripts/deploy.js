async function main() {
  // const Verify = await hre.ethers.getContractFactory("Verify");
  // const verify = await Verify.deploy();

  const Verify = await ethers.getContractFactory('Verify');
  const verify = await Verify.deploy();

  // await verify.deployed();

  console.log(
    `Verify deployed to: ${verify.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
