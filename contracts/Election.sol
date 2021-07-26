pragma solidity ^0.5.0;

contract Election {
    //model a candidate
    struct Candidate {
        uint id;
        string name;
        string party;
        uint votes;
    }

    //candidate count
    uint public candidatesCount;

    //fetch candidate
    mapping(uint => Candidate) public candidates;

    //store accounts that has voted
    mapping(address => bool) public voters;

    event electionUpdated(
         uint id,
        string name,
        string party,
        uint votes
    ); 

    constructor () public {
        addCandidate('Nana Addo', 'NPP');
        addCandidate('John Mahama', 'NDC');
    }

    function addCandidate (string memory _name, string memory _party) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name,  _party, 0);
    }

    function vote (uint _candidateId) private {
        //record that voter has voted
        require(!voters[msg.sender], 'You have already voted');

        //increase of the vote count of the candidate selected
        candidates[_candidateId].votes ++;

        voters[msg.sender] = true;

        emit electionUpdated(_candidateId, candidates[_candidateId].name, candidates[_candidateId].party, candidates[_candidateId].votes);
    }
}