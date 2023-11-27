// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductCatalog {
    struct Product {
        string name;
        uint256 quantity;
        uint256 dateAdded;
        string description;
        string imageUrl;
        bool exists;
    }

    uint256 public totalProducts;
    mapping(uint256 => Product) public products;
    mapping(bytes32 => uint256) public productIdByName;

    event ProductAdded(uint256 indexed productId, string name, uint256 quantity);

    function addProduct(string memory _name, uint256 _quantity, string memory _description, string memory _imageUrl) public {
        require(_quantity > 0, "Quantity should be greater than zero.");
        bytes32 nameHash = keccak256(abi.encodePacked(_name));
        require(productIdByName[nameHash] == 0, "Product with the same name already exists.");

        uint256 productId = totalProducts;
        productIdByName[nameHash] = productId;
        totalProducts++;

        Product storage newProduct = products[productId];
        newProduct.name = _name;
        newProduct.quantity = _quantity;
        newProduct.dateAdded = block.timestamp;
        newProduct.description = _description;
        newProduct.imageUrl = _imageUrl;
        newProduct.exists = true;

        emit ProductAdded(productId, _name, _quantity);
    }

    function getProductById(uint256 _productId) public view returns (string memory, uint256, uint256, string memory, string memory) {
        Product storage selectedProduct = products[_productId];
        require(selectedProduct.exists, "Product does not exist.");

        return (selectedProduct.name, selectedProduct.quantity, selectedProduct.dateAdded, selectedProduct.description, selectedProduct.imageUrl);
    }

    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](totalProducts);
        for (uint i = 0; i < totalProducts; i++) {
            if (products[i].exists) {
                Product storage product = products[i];
                allProducts[i] = Product({
                    name: product.name,
                    quantity: product.quantity,
                    dateAdded: product.dateAdded,
                    description: product.description,
                    imageUrl: product.imageUrl,
                    exists: product.exists
                });
            }
        }
        return allProducts;
    }

    function getProductIdByName(string memory _name) public view returns (uint256) {
        bytes32 nameHash = keccak256(abi.encodePacked(_name));
        uint256 productId = productIdByName[nameHash];
        require(productId != 0, "Product does not exist.");
        return productId;
    }
}
