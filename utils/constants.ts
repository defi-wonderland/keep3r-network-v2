export const addressRegistry = {
  // TOKENS
  kp3rV1: {
    1: '0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44', // Keep3rV1
    10: '0xca87472DBfB041c2e5a2672d319eA6184Ad9755e', // nextKP3R
    137: '0x4a2bE2075588BcE6A7E072574698a7DbbAc39b08', // nextKP3R
    5: '0x16F63C5036d3F48A239358656a8f123eCE85789C', // KP3RforTest
    11155111: '0x80B4327021946fF962d570c808B6aaC47224AeF1', // KP3RforTest
    420: '0x3Db593146464816F10d4eBA4743C76A5A4D08425', // wKP3RforTest
    31337: '0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44',
  },
  weth: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    10: '0x4200000000000000000000000000000000000006',
    137: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    5: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
    11155111: '0xfff9976782d46cc05630d1f6ebab18b2324d6b14',
    420: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
    31337: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  kp3rFaucet: {
    1: '0x976b01c02c636Dd5901444B941442FD70b86dcd5', // Keep3rV1Proxy
    5: '0x16F63C5036d3F48A239358656a8f123eCE85789C', // KP3RforTest
    11155111: '0x80B4327021946fF962d570c808B6aaC47224AeF1', // KP3RforTest
    31337: '0x976b01c02c636Dd5901444B941442FD70b86dcd5',
  },
  wkLP: {
    10: '0xf232D1Afbed9Df3880143d4FAD095f3698c4d1c6', // nextKLP
    137: '0x7cf93c434260519537184631A347eE8AD0Bc68Cb', // nextKLP
    420: '0xA437aC90d360c7645f25f30ddE201a94fe137Af5', // wkLP
    31337: '0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44', // kLP
  },
  // GOVERNANCE
  governor: {
    1: '0x0D5Dc686d0a2ABBfDaFDFb4D0533E886517d4E83',
    10: '0x7d6daDb31dBeBc68c8A0b2cCfE5C1f26F24bD41d',
    137: '0x9A040a31bc38919D50FD740973dBB6F8fdee1426',
    5: 0, // deployer
    11155111: 0,
    420: 0,
    31337: 0,
  },
  // ORACLES
  kp3rWethOracle: {
    1: '0x11b7a6bc0259ed6cf9db8f499988f9ecc7167bf5', // UniV3Pool
    10: '0x6A060BF6579318c15138160Ee1f1d225fcC9D409', // SidechainOracle
    137: '0x6A060BF6579318c15138160Ee1f1d225fcC9D409', // SidechainOracle
    5: '0x317ceCd3eB02158f97DF0B67B788edCda4E066e5', // UniV3Pool
    11155111: '0xb39Dea2246Ac99575eebc86A2590BADF046eda91', // UniV3Pool
    420: '0x4ECFF2c532d47D7be3D957E4a332AB134cad1fd9', // SidechainOracle
    31337: '0x11b7a6bc0259ed6cf9db8f499988f9ecc7167bf5',
  },
  wethUsdOracle: {
    10: '0x03af20bdaaffb4cc0a521796a223f7d85e2aac31', // WETH-DAI 0.3%
    137: '0x45dda9cb7c25131df268515131f647d726f50608', // WETH-USDC 0.05%
    420: '0x4ECFF2c532d47D7be3D957E4a332AB134cad1fd9', // SidechainOracle
    31337: '0x60594a405d53811d3bc4766596efd80fd545a270', // UniV3Pool
  },
  usdDecimals: {
    10: '0x0000000000000000000000000000000000000012', // 18
    137: '0x0000000000000000000000000000000000000006', // USDC uses 6 decimals
    420: '0x0000000000000000000000000000000000000012', // 18
    31337: '0x0000000000000000000000000000000000000012', // 18
  },
  uniV3Factory: {
    1: '0x1f98431c8ad98523631ae4a59f267346ea31f984', 
    10: '0x1f98431c8ad98523631ae4a59f267346ea31f984', 
    137: '0x1f98431c8ad98523631ae4a59f267346ea31f984', 
    5: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c', 
    11155111: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c', 
    420: '0x1f98431c8ad98523631ae4a59f267346ea31f984', 
    31337: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
  }
};
