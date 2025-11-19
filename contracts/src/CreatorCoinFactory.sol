// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CreatorCoin.sol";

/**
 * @title CreatorCoinFactory
 * @dev Factory contract for creating new creator coins
 */
contract CreatorCoinFactory {
    address[] public creatorCoins;
    mapping(address => address[]) public creatorToCoins;
    mapping(address => bool) public isCreatorCoin;

    event CreatorCoinCreated(
        address indexed tokenAddress,
        address indexed creator,
        string name,
        string symbol,
        uint256 initialSupply
    );

    /**
     * @dev Create a new creator coin
     */
    function createCreatorCoin(
        string memory name,
        string memory symbol,
        string memory creatorName,
        string memory description,
        address creatorWallet,
        uint256 initialSupply
    ) external returns (address) {
        require(bytes(name).length > 0, "Name required");
        require(bytes(symbol).length > 0, "Symbol required");
        require(creatorWallet != address(0), "Invalid creator wallet");
        require(initialSupply > 0, "Initial supply must be greater than 0");

        CreatorCoin newCoin = new CreatorCoin(
            name,
            symbol,
            creatorName,
            description,
            creatorWallet,
            initialSupply
        );

        address tokenAddress = address(newCoin);
        creatorCoins.push(tokenAddress);
        creatorToCoins[msg.sender].push(tokenAddress);
        isCreatorCoin[tokenAddress] = true;

        emit CreatorCoinCreated(
            tokenAddress,
            msg.sender,
            name,
            symbol,
            initialSupply
        );

        return tokenAddress;
    }

    /**
     * @dev Get all creator coins
     */
    function getAllCoins() external view returns (address[] memory) {
        return creatorCoins;
    }

    /**
     * @dev Get coins by creator
     */
    function getCreatorCoins(address creator) external view returns (address[] memory) {
        return creatorToCoins[creator];
    }

    /**
     * @dev Get total number of coins
     */
    function getCoinCount() external view returns (uint256) {
        return creatorCoins.length;
    }
}
