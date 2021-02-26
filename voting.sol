// SPDX-License-Identifier: GPL-3.0
pragma solidity ^ 0.7.4;
pragma experimental ABIEncoderV2;

/* import contrat ownable*/
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/access/Ownable.sol";

/**
 * @title Voting
 */
 
 contract Voting is Ownable{
   uint8 public winningProposalId;
   struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint voteCount;
    }
    
    mapping(address => Voter) public Whitelist;
    
    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }
    
   
    /* Voir library Ownable d'openZepplin*/
    
    event VoterRegistered(address voterAddress);
    event ProposalsRegistrationStarted();
    event ProposalsRegistrationEnded();
    event ProposalRegistered(uint proposalId);
    event VotingSessionStarted();
    event VotingSessionEnded();
    event Voted (address voter, uint proposalId);
    event VotesTallied();
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus
    newStatus);
    
    
   
    constructor() public{
       emit ProposalsRegistrationStarted();
       
    }
    
    function AddVoter(address _address) public onlyOwner {
        
    }
    
    function getEnum() public view returns(WorkflowStatus){}
 }