import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Verify from "../contracts/Verify.json";
import { ethers } from "ethers";

const contractAddress = "0xCE6Ea6D0dDC93BAec1Fb79f44873DbEfc639175D";
const contractABI = Verify.abi;

const DrugUpload = () => {
  const [manufacturerId, setManufacturerId] = useState("");
  const [drugName, setDrugName] = useState("");
  const [drugId, setDrugId] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [manufacturerAddress, setManufacturerAddress] = useState("");
  const [transactionId, setTransactionId] = useState("");

  // Initialize the contract instance
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // Function to retrieve the manufacturer ID for the connected Ethereum address
  async function getManufacturerIdForAddress() {
    try {
      // Call the smart contract's 'manufacturers' mapping with the connected address
      const address = await signer.getAddress();
      const manufacturer = await contract.manufacturers(address);
      setManufacturerId(manufacturer.manufacturerId); // Convert to number
    } catch (error) {
      console.error("Error fetching manufacturer ID:", error);
    }
  }

  useEffect(() => {
    getManufacturerIdForAddress();
  }, []);

  // Function to handle drug information upload
  async function uploadDrugInfo() {
    try {
      // Convert input values to the appropriate data types
      const drugIdValue = parseInt(drugId);
      const lotNumberValue = parseInt(lotNumber);
      const batchNumberValue = parseInt(batchNumber);

      // Convert the expiry date to a Unix timestamp
      const expiryDateValue = Date.parse(expiryDate) / 1000; // Convert milliseconds to seconds

      // Check if the expiry date is in the future
      if (expiryDateValue <= Math.floor(Date.now() / 1000)) {
        console.error("Expiry date must be in the future");
        return;
      }

      // Call the smart contract function
      const tx = await contract.registerDrugInformation(
        manufacturerId,
        drugIdValue,
        drugName,
        batchNumberValue,
        lotNumberValue,
        expiryDateValue
      );

      // Wait for the transaction to be mined
      await tx.wait();
      // Set the registration status message
      setRegistrationStatus("Drug information uploaded successfully!");
      // Hide the form
      setIsFormVisible(false);

      // Fetch manufacturer address
      const manufacturerAddress = await signer.getAddress();
      setManufacturerAddress(manufacturerAddress);

      // Fetch transaction ID
      const transactionId = tx.hash; // Assuming 'tx' is the transaction object
      setTransactionId(transactionId);

      console.log("Drug information uploaded successfully!");
    } catch (error) {
      console.error("Error uploading drug information:", error);
      // Set an error message
      setRegistrationStatus("Error uploading drug information.");
      // Hide the form
      setIsFormVisible(false);
    }
  }

  // Function to return to drug uploading
  function returnToUpload() {
    // Clear the registration status message
    setRegistrationStatus(null);
    // Show the form
    setIsFormVisible(true);
  }

  return (
    <div className="page-container">
      <Header />
      <div className="signup-body">
        <div className="drugrect">
          <h1>Upload Drug Information</h1>
          {/* Conditionally render the form or the registration status */}
          {isFormVisible ? (
            <div>
              <div className="form-inside">
                <label htmlFor="drugname">Drug Name:</label>
                <input
                  type="text"
                  className="druginput-field"
                  id="drugname"
                  placeholder="Drug Name"
                  onChange={(e) => setDrugName(e.target.value)}
                />
              </div>
              <div className="form-inside">
                <label htmlFor="drugid">Drug ID:</label>
                <input
                  type="number"
                  className="druginput-field"
                  id="drugid"
                  placeholder="Drug ID"
                  onChange={(e) => setDrugId(e.target.value)}
                />
              </div>
              <div className="form-inside">
                <label htmlFor="lotnumber">Lot Number:</label>
                <input
                  type="number"
                  className="druginput-field"
                  id="lotnumber"
                  placeholder="Lot Number"
                  onChange={(e) => setLotNumber(e.target.value)}
                />
              </div>
              <div className="form-inside">
                <label htmlFor="batchnumber">Batch Number:</label>
                <input
                  type="number"
                  className="druginput-field"
                  id="batchnumber"
                  placeholder="Batch Number"
                  onChange={(e) => setBatchNumber(e.target.value)}
                />
              </div>
              <div className="form-inside">
                <label htmlFor="expirydate">Expiry Date:</label>
                <input
                  type="date"
                  className="druginput-field"
                  id="expirydate"
                  placeholder="Expiry Date"
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="register-button"
                onClick={uploadDrugInfo}
              >
                Upload Drug Info
              </button>
            </div>
          ) : (
            <div>
              <p className="registration-status">{registrationStatus}</p>
              {registrationStatus ===
                "Drug information uploaded successfully!" && (
                <div style={{ color: "white" }}>
                  <p>Manufacturer Address: {manufacturerAddress}</p>
                  <p>Manufacturer ID: {manufacturerId}</p>
                  <p>Drug Name: {drugName}</p>
                  <p>Drug ID: {drugId}</p>
                  <p>
                    Transaction ID: {transactionId.slice(0, 43)} <br />
                    {transactionId.slice(32)}
                  </p>
                </div>
              )}
              {/* Button to return to drug uploading */}
              <button
                type="button"
                className="return-button"
                onClick={returnToUpload}
              >
                Return to Drug Uploading
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DrugUpload;
