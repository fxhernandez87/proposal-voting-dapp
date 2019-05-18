const VotingProposal = artifacts.require("./VotingProposal.sol");

contract("VotingProposal", accounts => {
  beforeEach("Initializing data", async () => {
    this.instance = await VotingProposal.deployed();
  });

  describe("Initial Contract Information", () => {
    it("should load the proposal initial data.", async () => {
      // Get proposal value
      const proposal = await this.instance.proposal();

      assert.equal(proposal[0], "This is my first Proposal example", "The text is not correct.");
      assert.equal(proposal[1], 0, "Initial vote count must be 0");
      assert.equal(proposal[2], 0, "Initial vote count must be 0");
    });

    it("should start with 0 voters", async () => {
      const votersCount = await this.instance.votersCount();
      assert.equal(votersCount, 0);
    });
  });

  describe("Proposal functions", () => {
    it("should return proposal totalVotes");
    it("should increase proposal positiveVotes");
    it("should increase proposal negativeVotes");
  });

  describe("Voting functions", () => {
    it("should return voter hasn't voted yet");
    it("should add a new voter with its positive vote");
    it("should add a new voter with its negative vote");
    it("should return a voter vote value");
    it("should catch a voter is trying to vote again");
  });


  describe("Voting event", () => {
    it("should handle a voting event");
  });

});
