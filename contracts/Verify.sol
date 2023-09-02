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

   // Mapping to store Manufacturer information by address
   mapping(address => Manufacturer) public manufacturers;
   // Mapping to keep track of registered Manufacturer IDs
   mapping(uint32 => bool) public manufacturerIdExists;
   // Variable to track the total number of registered Manufacturers
   uint256 public totalManufacturers;

   // Event to notify when a new Manufacturer is registered    
   event ManufacturerRegistered(address indexed manufacturer, uint32 indexed manufacturerId);
   // Event to notify when a new Drug is registered    
   event DrugRegistered(address indexed manufacturer, uint32 indexed manufacturerId, uint32 indexed drugId, string drugName, uint256 transactionId);

   // Nested mapping to associate DrugInformation with the manufacturerId and drugId
   mapping(uint32 => mapping(uint32 => DrugInformation)) public drugInformationByManufacturer;
   // Mapping to store transaction hashes associated with drug information
   mapping(bytes32 => uint256) public transactionIdByHash;

   // Function to register a new Manufacturer
   function registerManufacturer(uint32 _manufacturerId, string calldata _manufacturerName) external {
    // Check if the manufacturer is already registered
    require(!manufacturers[msg.sender].isRegistered, "Manufacturer is already registered");
    // Check if the provided manufacturerId is already in use
    require(!manufacturerIdExists[_manufacturerId], "Manufacturer ID already in use");

    // Register the new manufacturer
    manufacturers[msg.sender] = Manufacturer(_manufacturerName, _manufacturerId, true);
    manufacturerIdExists[_manufacturerId] = true;
    totalManufacturers++;

    emit ManufacturerRegistered(msg.sender, _manufacturerId);
   }

   // Function to register drug information associated with the manufacturerId
   function registerDrugInformation(
       uint32 _manufacturerId,
       uint32 _drugId,
       string calldata _drugName,
       uint32 _batchNumber,
       uint32 _lotNumber,
       uint256 _expiryDate
   ) external {
        // Ensure that the manufacturer is registered
        require(manufacturers[msg.sender].isRegistered, "Manufacturer is not registered");
        // Ensure that the drug hasn't been registered before for the given manufacturerId
        require(!drugInformationByManufacturer[_manufacturerId][_drugId].isRegistered, "Drug is already registered");

        // Validate the expiry date is in the future
        require(_expiryDate > block.timestamp, "Expiry date must be in the future");

        // Generate a unique identifier for this drug information
        bytes32 uniqueId = keccak256(abi.encodePacked(_manufacturerId, _drugId));

        // Create DrugInformation struct and associate it with the manufacturerId and drugId
        drugInformationByManufacturer[_manufacturerId][_drugId] = DrugInformation(
            _drugName,
            _drugId,
            _batchNumber,
            _lotNumber,
            _expiryDate,
            true
        );

        // Store the transaction hash along with the unique identifier
        transactionIdByHash[uniqueId] = block.number; // You can use any other value as needed

        emit DrugRegistered(msg.sender, _manufacturerId, _drugId, _drugName, transactionIdByHash[uniqueId]);
   }

   // Function to retrieve drug information using the transaction hash
    function getDrugInformationByTransactionHash(bytes32 _transactionHash) external view returns (
        uint256 expiryDate,
        uint32 batchNumber,
        string memory drugName,
        uint32 drugId
    ) {
        uint256 transactionId = transactionIdByHash[_transactionHash];
        require(transactionId > 0, "Transaction hash not found");

        // Extract manufacturerId and drugId from the unique identifier
        uint32 manufacturerId = uint32(uint256(_transactionHash) >> 128);
        uint32 extractedDrugId = uint32(uint256(_transactionHash));

        // Retrieve the DrugInformation struct based on the manufacturerId and drugId
        DrugInformation memory drugInfo = drugInformationByManufacturer[manufacturerId][extractedDrugId];
        require(drugInfo.isRegistered, "Drug information not found");

        // Extract individual properties from the drug information struct
        expiryDate = drugInfo.expiryDate;
        batchNumber = drugInfo.batchNumber;
        drugName = drugInfo.drugName;
        drugId = drugInfo.drugId;
    }
}
