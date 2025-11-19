// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {CreatorCoin} from "../src/CreatorCoin.sol";
import {CreatorCoinFactory} from "../src/CreatorCoinFactory.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.envAddress("DEPLOYER_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy Factory
        CreatorCoinFactory factory = new CreatorCoinFactory();
        console.log("Factory deployed at:", address(factory));

        // Deploy example creator coin
        address creatorCoin = factory.createCreatorCoin(
            "Test Creator Coin",
            "TCC",
            "Test Creator",
            "This is a test creator coin",
            deployerAddress,
            1000000 // 1M initial supply
        );
        console.log("Creator Coin deployed at:", creatorCoin);

        vm.stopBroadcast();
    }
}
