const VotingProposal = artifacts.require("./VotingProposal.sol");

contract("VotingProposal", accounts => {
  before("Initializing data", async () => {
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

  describe("Voting functions", () => {

    beforeEach("getting data before modifying the state", async () => {
      this.votersCountBefore = await this.instance.votersCount.call();
      this.proposalBefore = await this.instance.proposal.call();
    });

    it("should add a new voter with its positive vote", async () => {
      await this.instance.upVote({ from: accounts[0], value: web3.utils.toWei("0.01", "ether") });

      const votersCount = await this.instance.votersCount.call();

      assert.equal(votersCount, this.votersCountBefore.toNumber() + 1);

      const proposal = await this.instance.proposal.call();
      assert.equal(proposal[1].toNumber(), this.proposalBefore[1].toNumber() + 1, "1 vote was made earlier");

    });

    it("should add a new voter with its negative vote", async () => {

      await this.instance.downVote({ from: accounts[1], value: web3.utils.toWei("0.01", "ether") });

      const votersCount = await this.instance.votersCount.call();

      assert.equal(votersCount, this.votersCountBefore.toNumber() + 1);

      const proposal = await this.instance.proposal.call();
      assert.equal(proposal[2].toNumber(), this.proposalBefore[2].toNumber() + 1, "1 vote was made earlier");

    });

    it("should return voter hasn't voted yet", async () => {
      const hasVoted = await this.instance.hasVoted.call({ from: accounts[2]});
      assert.equal(hasVoted, false, "Account has voted");
    });

    it("should return a voter vote value", async () => {
      await this.instance.downVote({ from: accounts[3], value: web3.utils.toWei("0.01", "ether") });

      const accountVote = await this.instance.getVote.call({ from: accounts[3] });

      assert.equal(accountVote.toNumber(), -1);
    });

    it("should catch a voter is trying to vote again", async () => {
      try {
        await this.instance.downVote({from: accounts[4], value: web3.utils.toWei("0.01", "ether")});
        await this.instance.upVote({from: accounts[4], value: web3.utils.toWei("0.01", "ether")});
        assert.fail("shouldn't have reached this far");
      } catch (err) {
        assert.notInclude(err.message, "shouldn't have reached this far");
        assert.include(err.message, "cannot vote twice");
      }
    });

    it("should catch a voter didn't send enough ether", async () => {
      try {
        await this.instance.downVote({from: accounts[5], value: web3.utils.toWei("0.001", "ether")});
        assert.fail("shouldn't have reached this far");
      } catch (err) {
        assert.notInclude(err.message, "shouldn't have reached this far");
        assert.include(err.message, "Insufficient funds to vote");
      }
    });


    it("should catch a voter didn't send any ether", async () => {
      try {
        await this.instance.downVote({from: accounts[5]});
        assert.fail("shouldn't have reached this far");
      } catch (err) {
        assert.notInclude(err.message, "shouldn't have reached this far");
        assert.include(err.message, "Insufficient funds to vote");
      }
    });
  });
});

// using function so "this" is decoupled from other suites
contract("Proposal functions", function(accounts) {
  before("Initializing data", async () => {
    // reseted contract
    this.instance = await VotingProposal.deployed();
  });

  beforeEach("getting data before modifying the state", async () => {
    this.votersCountBefore = await this.instance.votersCount.call();
    this.proposalBefore = await this.instance.proposal.call();
  });

  it("should return proposal totalVotes", async () => {
    await Promise.all([
      this.instance.upVote({from: accounts[0], value: web3.utils.toWei("0.01", "ether")}), // + 1
      this.instance.upVote({from: accounts[1], value: web3.utils.toWei("0.01", "ether")}), // + 1
      this.instance.upVote({from: accounts[2], value: web3.utils.toWei("0.01", "ether")}), // + 1
      this.instance.downVote({from: accounts[3], value: web3.utils.toWei("0.01", "ether")})// - 1
    ]);

    const totalVotes = await this.instance.getProposalTotalCount();
    assert.equal(totalVotes.toNumber(), this.votersCountBefore.toNumber() + 2);
  });

  it("should increase proposal positiveVotes", async () => {
    await this.instance.upVote({from: accounts[4], value: web3.utils.toWei("0.01", "ether")});
    await this.instance.upVote({from: accounts[5], value: web3.utils.toWei("0.01", "ether")});

    const proposal = await this.instance.proposal.call();
    assert.equal(proposal[1].toNumber(), this.proposalBefore[1].toNumber() + 2);
  });

  it("should increase proposal negativeVotes", async () => {
    await this.instance.downVote({from: accounts[6], value: web3.utils.toWei("0.01", "ether")});
    await this.instance.upVote({from: accounts[7], value: web3.utils.toWei("0.01", "ether")});

    const proposal = await this.instance.proposal.call();
    assert.equal(proposal[2].toNumber(), this.proposalBefore[2].toNumber() + 1);
  });
});


contract("Voting event", (accounts) => {
  it("should handle a voting event", async () => {
    const instance = await VotingProposal.deployed();

    const result = await instance.downVote({from: accounts[6], value: web3.utils.toWei("0.01", "ether")});
    /* Filter correct event types */
    const events = result.logs.filter(log => log.event === "VoteReceived");

    assert.isNotEmpty(events, "At least 1 event must be generated");
    events.forEach(ev => {
      assert.property(ev, "args");
      assert.property(ev.args, "_from");
      assert.property(ev.args, "_vote");
      assert.property(ev.args, "_totalVotes");
      assert.equal(ev.args._from, accounts[6]);
      assert.equal(ev.args._vote.toNumber(), -1);
      assert.equal(ev.args._totalVotes.toNumber(), -1);
    });
  });
});

