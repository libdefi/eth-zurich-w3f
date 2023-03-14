import { utils } from 'ethers';

import { task } from 'hardhat/config';
import { join } from 'path';


task('etherscan-verify', 'verify').setAction(async ({}, hre) => {

  await hre.run('verify:verify', {
    address: "0x62745D2235c932739A6d11078173c487413B2F68",
    constructorArguments: ["0xE121858e944C59aDAC681Df6C62D13C4B27d8946" ],
  });
});
