import { useState, useEffect } from 'react';
import Web3 from "web3";
import VotingProposal from "../contracts/VotingProposal";

export const useAuth = web3 => {
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [signedInAddress, setSignedInAddress] = useState(null);
  const [error, setError] = useState(null);

  const getData = async web3Instance => {
    try {
      const ethAccounts = await web3Instance.eth.getAccounts();
      setAccounts(ethAccounts);
      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = VotingProposal.networks[networkId];
      const instance = new web3Instance.eth.Contract(
        VotingProposal.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setContract(instance);
      const account = await web3Instance.eth.getCoinbase();
      setSignedInAddress(account);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (web3) {
      getData(web3);
    }
  }, [web3]);

  return [error, signedInAddress, contract, accounts];
};

export const useWeb3 = () => {
  const [web3Instance, setWeb3Instance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      // Request account access if needed
      window.ethereum.enable()
        .then(() => {
          setWeb3Instance(web3);
        })
        .catch(err => {
          setError(err);
        });
    } else if (window.web3) {
      const { web3 } = window;
      setWeb3Instance(web3);
    } else {
      const provider = Web3.providers.WebsocketProvider(process.env.REACT_APP_LOCAL_BLOCK_CHAIN_WS);
      const web3 = new Web3(provider);
      setWeb3Instance(web3);
    }
  }, []);

  return [error, web3Instance];
};
