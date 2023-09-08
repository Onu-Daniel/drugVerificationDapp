import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ethers } from "ethers";
import Verify from "../contracts/Verify.json";

const contractAddress = "0xCE6Ea6D0dDC93BAec1Fb79f44873DbEfc639175D";
const contractABI = Verify.abi;

const Home = () => {
  const [transactionHashInput, setTransactionHashInput] = useState(""); // Input from the user
  const [transactionHash, setTransactionHash] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [drugName, setDrugName] = useState("");
  const [drugId, setDrugId] = useState("");
  const [contract, setContract] = useState(null);

  const handleTransactionHashChange = (e) => {
    const userInput = e.target.value.trim(); // Remove leading/trailing whitespace
    setTransactionHashInput(userInput);
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    setContract(contractInstance);
  }, []);

  const fetchDrugInfo = async () => {
    try {
      // Format the user input as a valid Ethereum transaction hash
      const formattedTransactionHash = transactionHashInput.startsWith("0x")
        ? transactionHashInput // Input already has "0x" prefix
        : "0x" + transactionHashInput; // Add "0x" prefix if missing

      console.log(formattedTransactionHash);

      const result = await contract.getDrugInformationByTransactionHash(
        formattedTransactionHash,
        { gasLimit: 300000 } // Adjust the gas limit as needed
      );
      setTransactionHash(formattedTransactionHash);
      setExpiryDate(result[0]);
      setBatchNumber(result[1]);
      setDrugName(result[2]);
      setDrugId(result[3]);
    } catch (error) {
      console.error("Error:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      console.error("Error data:", error.data);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <div className="user-body">
        <div className="user-inside">
          <h2>Search for Drug Information here</h2>
          <input
            type="text"
            className="search-bar"
            id="searchInput"
            placeholder="Input Transaction Hash"
            onChange={handleTransactionHashChange}
          />
          <button className="button-user" onClick={fetchDrugInfo}>
            Search
          </button>
        </div>
        <div className="user-inside">
          <h2>Drug Information</h2>
          <div className="table">
            <div className="row">
              <div className="label">Transaction Hash:</div>
              <div className="value">{transactionHash}</div>
            </div>
            <div className="row">
              <div className="label">Drug Name:</div>
              <div className="value">{drugName}</div>
            </div>
            <div className="row">
              <div className="label">Drug ID:</div>
              <div className="value">{drugId}</div>
            </div>
            <div className="row">
              <div className="label">Expiry Date:</div>
              <div className="value">{expiryDate}</div>
            </div>
            <div className="row">
              <div className="label">Batch Number:</div>
              <div className="value">{batchNumber}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
