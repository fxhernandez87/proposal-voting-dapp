pragma solidity ^0.5.0;

contract VotingProposal {

  // Proposal Structure
  struct Proposal {
    string text;
    int totalVotes;
  }

  // Defining proposal
  Proposal public proposal;

  // Array of voters key = addresses and values = their Vote
  // values could be a struct of Voter but to keep it simple, we just going to save the vote (1, -1);
  mapping(address => int8) public voters;

  // number of addresses that voted
  uint public votersCount;

  constructor() public {
    proposal = Proposal("This is my first Proposal example", 0);
  }

}
