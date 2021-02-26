// SPDX-License-Identifier: GPL-3.0
pragma solidity ^ 0.7.4;
pragma experimental ABIEncoderV2;

/* import contrat ownable*/
import "./node_modules/@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Voting
   @author Sandy,Julien,Stéphane
   @notice Contrat de vote, getsion par un superadmin
 */
 
 contract Voting is Ownable{
  
  uint8 public winningProposalId;
   
  struct Voter {
    bool isRegistered;
    bool hasVoted;
    uint votedProposalId;
  }

  struct Proposal {
    uint8 id;
    address owner;
    string description;
    uint voteCount;
  }
    
  mapping(address => Voter) public Whitelist;
  mapping(uint => Proposal) public proposals;
    
  enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }
    
    ///@notice Events
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
    
    ///@param _address à ajouter à la whitelist
    function AddVoter(address _address) public onlyOwner {
        
    }
    
    ///@return le statut en cours du vote
    function getEnum() public view returns(WorkflowStatus){}
 }