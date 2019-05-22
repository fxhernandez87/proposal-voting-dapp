import { useState, useEffect } from 'react';
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
