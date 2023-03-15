import { utils } from 'ethers';

import { task } from 'hardhat/config';
import { join } from 'path';


task('etherscan-verify', 'verify').setAction(async ({}, hre) => {

  await hre.run('verify:verify', {
    address: "0x8Ba4F4e109F24c4Fbc871A0A5795DaDebF14565b",
    constructorArguments: ["0x288A462c1d2403B86ED2c2F6C51D3B41a794dC54" ],
  });
});
