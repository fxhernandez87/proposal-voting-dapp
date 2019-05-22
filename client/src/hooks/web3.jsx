import { useState, useEffect } from 'react';
import Web3 from "web3";

// eslint-disable-next-line import/prefer-default-export
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
      const provider = Web3.providers.WebsocketProvider("ws://127.0.0.1:7545");
      const web3 = new Web3(provider);
      setWeb3Instance(web3);
    }
  }, []);

  return [error, web3Instance];
};
