import { useState, useEffect } from 'react';
import VotingProposal from "../contracts/VotingProposal";

export const useAuth = web3 => {
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [signedInAddress, setSignedInAddress] = useState(null);

  useEffect(() => {
    if (web3) {
      web3.eth.getAccounts()
        .then(accounts => {
          setAccounts(accounts);
          return web3.eth.net.getId();
        })
        .then(networkId => {
          const deployedNetwork = VotingProposal.networks[networkId];
          const instance = new web3.eth.Contract(
            VotingProposal.abi,
            deployedNetwork && deployedNetwork.address,
          );
          setContract(instance);
          return web3.eth.getCoinbase();
        })
        .then(account => {
          setSignedInAddress(account);
        });
    }
  }, [web3]);

  return [signedInAddress, contract, accounts];
};
