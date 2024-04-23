const { Web3 } = require("web3");
const axios = require("axios");
const ethereumNodeUrl =
  "https://eth-mainnet.g.alchemy.com/v2/H02UmSIk36utPmllfzVbLDSYLSgknSRv";
const web3 = new Web3(new Web3.providers.HttpProvider(ethereumNodeUrl));
let contractAddress = "0x059EDD72Cd353dF5106D2B9cC5ab83a52287aC3a";
let tokenID = 25;
async function getMetadata(contractAddress, tokenID) {
  try {
    const contractABI = [
      {
        constant: true,
        inputs: [
          { internalType: "uint256", name: "_tokenId", type: "uint256" },
        ],
        name: "tokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ];
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const tokenURI = await contract.methods.tokenURI(tokenID).call();
    let response = await axios.get(tokenURI);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getMetadata(contractAddress, tokenID);
