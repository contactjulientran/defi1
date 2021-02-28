const { assert } = require("chai");

const Voting = artifacts.require("Voting");

contract("Voting", accounts => {
    let [account1, account2] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await Voting.new();
    });

    it("workflow status should be RegisteringVoters", () => {
        return Voting.deployed()
            .then(instance => instance.status())
            .then(status => assert.equal(status.toNumber(), 0), "status should RegisteringVoters upon deploy")

    })

    // it('should fail', () => {
    //     assert.equal(2 + 2, 1)
    // })

    it('should pass', () => {
        assert.equal(2 + 2, 4)
    })
})