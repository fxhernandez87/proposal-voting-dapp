### Proposal Voting DApp

DApp that allows people to vote on a (binary) proposal. 

Each ethereum address should be allowed to vote only once and the vote should cost 0.01 ETH.

- When a user opens the page, it should see the result so far (number of positive votes vs. number of negative votes).
- If an account hasn't voted yet, they should also see two buttons: one for voting "Yes" and one for "No". If they already voted, they should see their vote instead. 
- Votes cannot be updated.
- Results should be updated in real-time: if someone else votes when I have the page open, I should see the new result.

## Getting Started

In order to get this project up and running, follow these instructions.

### Prerequisites

- [Ganache](https://truffleframework.com/docs/ganache/overview) (Local Blockchain) 
- [Node.js](https://nodejs.org/) >= 8.15.0
- [NPM](https://www.npmjs.com/) >= 5.6.0
- [Truffle](https://truffleframework.com/docs/truffle/overview) v5.0.18 (development framework for ethereum)
- [MetaMask](https://metamask.io/) Chrome/Firefox extension to connecto browser with a blockchain 

## Deploy contract in the local Blockchain
- To deploy the contract: ```$ truffle deploy```
- To re-deploy the contract: ```$ truffle deploy --reset ``` optional ```--compile-all```

Clone this repository:

```
1) git clone https://github.com/fxhernandez87/proposal-voting-dapp.git
    - Blockchain
    -------------
    1) cd proposal-voting-dapp
    2) make sure you have ganache running
    3) deploy contract
    
    - Client -
    ---------- 
    1) cd client
    2) yarn install
    3) copy ".env.example" and rename it as ".env"
    4) yarn start
```

## Configuration
with ```truffle-config.js``` you can modify where the contracts (formatted as JSON) are saved. By default they will be saved in client/src/contracts 


## Running the tests

- ```Blockchain```
    - cd proposal-voting-dapp
    - ```truffle test```
- ```React```
    - cd proposal-voting-dapp/client
    - ```yarn test```

## API

- List of Voter functions
  - hasVoted ```returns boolean```
  - upVote ```returns void``` (emit event ```VoteReceived```)
  - downVote ```returns void``` (emit event ```VoteReceived```)
  - voters 
    ```
    input param address
    returns int
    (returns vote from address)
    ```
  - votersCount ```returns int``` (number of voters)
  
- List of Proposal functions
  - getProposalTotalCount ```returns int```
  - proposal ```returns Proposal struc```
  
## Built With

* [Solidity](https://nodejs.org) ^0.5.0
* [React](https://www.npmjs.com/) ^16.8.0
* [Web3](https://web3js.readthedocs.io/en/1.0/) - Ethereum JavaScript API
