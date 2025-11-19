// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CreatorCoin
 * @dev ERC20 token for creator economies on Base network
 */
contract CreatorCoin is ERC20, ERC20Burnable, Ownable {
    // Creator metadata
    string public creatorName;
    string public creatorDescription;
    address public creatorWallet;
    
    // Trading state
    uint256 public tokenPrice = 0.001 ether; // Price per token (configurable)
    bool public tradingEnabled = true;
    
    // Trading fee (in basis points: 1 = 0.01%)
    uint256 public tradingFeePercentage = 250; // 2.5% default fee
    uint256 public treasuryAmount = 0;

    event TokenPriceUpdated(uint256 newPrice);
    event TradingToggled(bool enabled);
    event TreasuryWithdrawn(uint256 amount);
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);
    event TokensSold(address indexed seller, uint256 amount, uint256 proceeds);

    constructor(
        string memory name,
        string memory symbol,
        string memory _creatorName,
        string memory _creatorDescription,
        address _creatorWallet,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        creatorName = _creatorName;
        creatorDescription = _creatorDescription;
        creatorWallet = _creatorWallet;
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /**
     * @dev Buy tokens using ETH
     */
    function buyTokens() external payable returns (uint256) {
        require(tradingEnabled, "Trading is disabled");
        require(msg.value > 0, "Must send ETH to purchase tokens");

        uint256 tokenAmount = msg.value / tokenPrice;
        uint256 fee = (tokenAmount * tradingFeePercentage) / 10000;
        uint256 tokensToUser = tokenAmount - fee;

        treasuryAmount += (msg.value * tradingFeePercentage) / 10000;
        
        _transfer(owner(), msg.sender, tokensToUser);
        emit TokensPurchased(msg.sender, tokensToUser, msg.value);

        return tokensToUser;
    }

    /**
     * @dev Sell tokens for ETH
     */
    function sellTokens(uint256 amount) external returns (uint256) {
        require(tradingEnabled, "Trading is disabled");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        uint256 ethAmount = amount * tokenPrice;
        uint256 fee = (ethAmount * tradingFeePercentage) / 10000;
        uint256 proceeds = ethAmount - fee;

        treasuryAmount += fee;
        
        _transfer(msg.sender, owner(), amount);
        
        (bool success, ) = payable(msg.sender).call{value: proceeds}("");
        require(success, "ETH transfer failed");
        
        emit TokensSold(msg.sender, amount, proceeds);

        return proceeds;
    }

    /**
     * @dev Update token price
     */
    function setTokenPrice(uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "Price must be greater than 0");
        tokenPrice = newPrice;
        emit TokenPriceUpdated(newPrice);
    }

    /**
     * @dev Toggle trading on/off
     */
    function setTradingEnabled(bool enabled) external onlyOwner {
        tradingEnabled = enabled;
        emit TradingToggled(enabled);
    }

    /**
     * @dev Withdraw treasury fees
     */
    function withdrawTreasury(uint256 amount) external onlyOwner {
        require(amount <= treasuryAmount, "Insufficient treasury balance");
        treasuryAmount -= amount;
        
        (bool success, ) = payable(creatorWallet).call{value: amount}("");
        require(success, "Withdrawal failed");
        
        emit TreasuryWithdrawn(amount);
    }

    /**
     * @dev Update creator information
     */
    function updateCreatorInfo(
        string memory _name,
        string memory _description,
        address _wallet
    ) external onlyOwner {
        creatorName = _name;
        creatorDescription = _description;
        creatorWallet = _wallet;
    }

    /**
     * @dev Receive ETH directly to contract
     */
    receive() external payable {}
}
