import Web3 from "web3";
require("dotenv");

import ABI from "./ABI.json";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS_BETCANDIDATE;

export async function doLogin() {
  if (!window.ethereum) throw new Error("Metamask not installed!");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || !accounts.length)
    throw new Error("Metamask not connected or authorization!");

  localStorage.setItem("addressWallet", accounts[0]);

  return accounts[0];
}

function getContract() {
  if (!window.ethereum) throw new Error("Metamask not installed!");

  const from = localStorage.getItem("addressWallet");
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
  return contract;
}

export async function getDispute() {
  const contract = getContract();
  return await contract.methods.dispute().call();
}
