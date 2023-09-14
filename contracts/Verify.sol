// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Verify {
    // Struct to represent Manufacturer information
    struct Manufacturer {
        string manufactureName;
        uint32 manufacturerId;
        bool isRegistered;
    }

    // Struct to represent Drug Information
    struct DrugInformation {
        string drugName;
        uint32 drugId;
        uint32 batchNumber;
        uint32 lotNumber;
        uint256 expiryDate;
        bool isRegistered;
    }

     // Define a state variable to store the transaction hash
    bytes32 public lastTransactionHash;

    // Mapping to store Manufacturer information by address
    mapping(address => Manufacturer) public manufacturers;

    // Mapping to store Drug information by transaction hash
    mapping(bytes32 => DrugInformation) public drugs;

    // Mapping to store the manufacturer address associated with a drug transaction hash
    mapping(bytes32 => address) public drugManufacturer;

    // Mapping to keep track of drugs registered by each manufacturer
    mapping(uint32 => mapping(uint32 => bool)) public manufacturerDrugs;

    // Variable to track the total number of registered Manufacturers
    uint256 public totalManufacturers;

    // Event to notify when a new Manufacturer is registered    
    event ManufacturerRegistered(address indexed manufacturer, uint32 indexed manufacturerId);

    // Event to notify when a new Drug is registered    
    event DrugRegistered(address indexed manufacturer, uint32 indexed manufacturerId, uint32 indexed drugId, string drugName, bytes32 transactionHash);

    // Function to register a new Manufacturer
    function registerManufacturer(uint32 _manufacturerId, string calldata _manufacturerName) external {
        // Check if the manufacturer is already registered
        require(!manufacturers[msg.sender].isRegistered, "Manufacturer is already registered");

        // Register the new manufacturer
        manufacturers[msg.sender] = Manufacturer(_manufacturerName, _manufacturerId, true);
        totalManufacturers++;

        emit ManufacturerRegistered(msg.sender, _manufacturerId);
    }

    // Function to register new drug information
    function registerNewDrug(
        uint32 _drugId,
        string calldata _drugName,
        uint32 _batchNumber,
        uint32 _lotNumber,
        uint256 _expiryDate
    ) external returns (bytes32) {
        // Check if the manufacturer is registered
        require(manufacturers[msg.sender].isRegistered, "Manufacturer is not registered");

        // Retrieve the manufacturerId associated with msg.sender
        uint32 manufacturerId = manufacturers[msg.sender].manufacturerId;

        // Check if the drug hasn't been registered for the given manufacturerId
        require(!manufacturerDrugs[manufacturerId][_drugId], "Drug already registered for this manufacturer");

        // Generate a unique transaction hash for this drug registration
        bytes32 transactionHash = keccak256(abi.encodePacked(msg.sender, manufacturerId, _drugId, _batchNumber, _lotNumber, _expiryDate));

        // Check if the drug is already registered with this transaction hash
        require(!drugs[transactionHash].isRegistered, "Drug is already registered with this transaction hash");

        // Register the new drug information and associate it with the transaction hash
        drugs[transactionHash] = DrugInformation(_drugName, _drugId, _batchNumber, _lotNumber, _expiryDate, true);
        drugManufacturer[transactionHash] = msg.sender;

        // Mark the drug as registered for the given manufacturer
        manufacturerDrugs[manufacturerId][_drugId] = true;

        // Set the lastTransactionHash to the generated transaction hash
        lastTransactionHash = transactionHash;

        emit DrugRegistered(msg.sender, manufacturerId, _drugId, _drugName, transactionHash);
        return lastTransactionHash;
    }

    // Function to search for drug information by transaction hash and return manufacturer details
    function getDrugInformation(bytes32 _transactionHash) external view returns (string memory, uint32, uint32, uint32, uint256, string memory, uint32) {
        require(drugs[_transactionHash].isRegistered, "Drug information not found for this transaction hash");
        DrugInformation memory drug = drugs[_transactionHash];

        // Retrieve manufacturer details
        Manufacturer memory manufacturer = manufacturers[drugManufacturer[_transactionHash]];

        return (
            drug.drugName,
            drug.drugId,
            drug.batchNumber,
            drug.lotNumber,
            drug.expiryDate,
            manufacturer.manufactureName,
            manufacturer.manufacturerId
        );
    }
}
