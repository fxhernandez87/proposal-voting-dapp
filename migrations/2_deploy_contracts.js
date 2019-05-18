const VotingProposal = artifacts.require("./VotingProposal.sol");

module.exports = function(deployer) {
  deployer.deploy(VotingProposal);
};
