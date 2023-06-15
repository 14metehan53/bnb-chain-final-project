const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const Messenger = await hre.ethers.getContractFactory('Messenger');
  const messenger = await Messenger.deploy();
  await messenger.deployed();
  console.log('Messenger contract deployed to: ', messenger.address);

  let config = `module.exports = {
        messengeradress : "${messenger.address}",
    }
  `;
  let data = JSON.stringify(config);
  fs.writeFileSync('config.js', JSON.parse(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
