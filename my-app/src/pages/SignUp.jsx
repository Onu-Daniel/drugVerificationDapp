import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import Verify from "../contracts/Verify.json";
import RegistrationSuccessPopup from "../components/RegistrationSuccessPopup";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = "0x9b486053c71cF377bA4bE0DEA3538bb86DAb020b";
const contractABI = Verify.abi;

const SignUp = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");
  const [manufacturerName, setManufacturerName] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredManufacturerId, setRegisteredManufacturerId] = useState("");
  const [registeredManufacturerAddress, setRegisteredManufacturerAddress] =
    useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize the navigation function

  async function registerManufacturer(e) {
    e.preventDefault();
    try {
      if (!manufacturerId || !manufacturerName) {
        setError("Manufacturer ID and Name cannot be empty.");
        return;
      }

      const parsedManufacturerId = parseInt(manufacturerId, 10);

      if (isNaN(parsedManufacturerId)) {
        setError("Manufacturer ID must be a valid number.");
        return;
      }

      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.registerManufacturer(
        parsedManufacturerId,
        manufacturerName
      );

      await tx.wait();

      console.log("Manufacturer registered successfully!");
      setRegistrationSuccess(true);
      setRegisteredManufacturerId(parsedManufacturerId);
      setRegisteredManufacturerAddress(walletAddress);
    } catch (error) {
      if (error.message.includes("Manufacturer is already registered")) {
        setError("Manufacturer is already registered.");
      } else {
        setError("Error registering manufacturer: " + error.message);
      }
    }
  }

  async function getAccount(e) {
    e.preventDefault();
    console.log("Requesting account");

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          console.log("No accounts returned.");
        }
      } catch (error) {
        setError("Error connecting: " + error.message);
      }
    } else {
      setError("No MetaMask detected.");
    }
  }

  return (
    <div className="page-container">
      <Header />
      <div className="signup-body">
        {registrationSuccess ? (
          <RegistrationSuccessPopup
            manufacturerAddress={registeredManufacturerAddress}
            manufacturerId={registeredManufacturerId}
            onClose={() => {
              setRegistrationSuccess(false);
              setError(null); // Clear error when closing success popup
              navigate("/sign-in"); // Redirect to the login page
            }}
          />
        ) : error ? (
          <div className="error-popup">
            <p>{error}</p>
            {error === "Manufacturer is already registered." && (
              <button onClick={() => navigate("/sign-in")}>Go to Login</button>
            )}
          </div>
        ) : (
          <div className="rectangle">
            <h1 className="topic">Create Account</h1>
            <form action="">
              <div className="form-inside">
                <label htmlFor="address">Address:</label>
                <input
                  type=""
                  className="input-field"
                  id="address"
                  placeholder="Input Address"
                  value={walletAddress}
                  onChange={(e) => {
                    setWalletAddress(e.target.value);
                  }}
                />
                <button className="connect-wallet" onClick={getAccount}>
                  Connect Wallet
                </button>
              </div>

              <div className="form-inside">
                <label htmlFor="manufacturername">Manufacturer Name:</label>
                <input
                  type=""
                  className="input-field"
                  id="manufacturername"
                  placeholder="Manufacturer Name"
                  value={manufacturerName}
                  onChange={(e) => setManufacturerName(e.target.value)}
                />
              </div>

              <div className="form-inside">
                <label htmlFor="manufacturerid">Manufacturer Id:</label>
                <input
                  type=""
                  className="input-field"
                  id="manufacturerid"
                  placeholder="Manufacturer ID"
                  value={manufacturerId}
                  onChange={(e) => setManufacturerId(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="register-button"
                onClick={registerManufacturer}
              >
                Register
              </button>
              <p className="text">
                Have an account? <Link to={`/sign-in`}>Login</Link>{" "}
              </p>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
