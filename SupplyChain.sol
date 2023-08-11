// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Product {
        string name;
        uint256 carbonFootprint;
        address owner;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount = 0;

    function addProduct(string memory _name, uint256 _carbonFootprint) public {
        products[productCount] = Product(_name, _carbonFootprint, msg.sender);
        productCount++;
    }

    function transferProduct(uint256 _productId, address newOwner) public {
        require(products[_productId].owner == msg.sender, "Only the owner can transfer");
        products[_productId].owner = newOwner;
    }

    function getProduct(uint256 _productId) public view returns (string memory, uint256, address) {
        return (products[_productId].name, products[_productId].carbonFootprint, products[_productId].owner);
    }
}
