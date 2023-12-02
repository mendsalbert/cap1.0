// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Product {
    struct Product {
        string name;
        uint256 quantity;
        uint256 dateAdded;
        string description;
        string imageUrl;
        string country; // New field for the country
        bool exists;
    }

    uint256 public totalProducts;
    mapping(uint256 => Product) public products;
    mapping(bytes32 => uint256) public productIdByName;

    event ProductAdded(uint256 indexed productId, string name, uint256 quantity, string country);

    function addProduct(string memory _name, uint256 _quantity, string memory _description, string memory _imageUrl, string memory _country) public {
        require(_quantity > 0, "Quantity should be greater than zero.");
        bytes32 nameHash = keccak256(abi.encodePacked(_name));
        require(productIdByName[nameHash] == 0, "Product with the same name already exists.");

        uint256 productId = totalProducts++;
        productIdByName[nameHash] = productId;

        Product storage newProduct = products[productId];
        newProduct.name = _name;
        newProduct.quantity = _quantity;
        newProduct.dateAdded = block.timestamp;
        newProduct.description = _description;
        newProduct.imageUrl = _imageUrl;
        newProduct.country = _country; // Setting the country of the product
        newProduct.exists = true;

        emit ProductAdded(productId, _name, _quantity, _country);
    }

    function getProductById(uint256 _productId) public view returns (string memory, uint256, uint256, string memory, string memory, string memory) {
        require(_productId < totalProducts, "Product does not exist.");
        Product storage selectedProduct = products[_productId];
        require(selectedProduct.exists, "Product does not exist.");

        return (
            selectedProduct.name, 
            selectedProduct.quantity, 
            selectedProduct.dateAdded, 
            selectedProduct.description, 
            selectedProduct.imageUrl,
            selectedProduct.country // Returning the country as well
        );
    }

    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](totalProducts);
        for (uint i = 0; i < totalProducts; i++) {
            if (products[i].exists) {
                allProducts[i] = products[i];
            }
        }
        return allProducts;
    }

    function getProductIdByName(string memory _name) public view returns (uint256) {
        bytes32 nameHash = keccak256(abi.encodePacked(_name));
        require(productIdByName[nameHash] != 0, "Product does not exist.");
        return productIdByName[nameHash];
    }
}
