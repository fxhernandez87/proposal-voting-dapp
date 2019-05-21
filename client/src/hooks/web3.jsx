import { useState, useEffect } from 'react';
import Web3 from "web3";

export const useWeb3 = () => {
  const [web3Instance, setWeb3Instance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      console.log("Modern DApp browsers...");
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
      console.log("Legacy DApp browsers...");
      const web3 = window.web3;
      console.log("Injected web3 detected.");
      setWeb3Instance(web3);
    } else {
      const provider = Web3.providers.WebsocketProvider("ws://127.0.0.1:7545");
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      setWeb3Instance(web3);
    }
  }, []);

  return [error, web3Instance];
};
