pragma solidity ^0.5.0;

contract Election {
    //model a candidate
    struct Candidate {
        uint id;
        string name;
        string party;
        string Type;
        uint votes;
    }

    struct Voter {  
        uint id;
        string name;
        uint voterId;
        uint age;
        string phone;
        string pollingStation;
        string constituency;
        bytes32 password;
        string region;
        bool voted;
        bool authorized;
    }

    //admin
     struct Admin {
        string email;
        string password;
    }

    struct ElectionDetails{
        address owner;
        string  electionName;
        string  description;
        uint  startDate;
        uint  endDate; 
        uint totalVotes;
    }


    uint public votersCount = 0;
    //candidate count
    uint public candidatesCount = 0;

    mapping(uint => Admin) public admin;
    //fetch candidate
    mapping(uint => Candidate) public candidates;
    //store accounts that has voted
    mapping(uint => Voter) public voters;



    event electionUpdated(
         uint id,
        string name,
        string party,
        uint votes
    ); 

    constructor () public {
        addCandidate('Nana Addo', 'NPP', 'Presidential');
        addCandidate('John Mahama', 'NDC', 'Presidential' );
        addCandidate('Christian Kwabena Andrews', 'GUM', 'Presidential');
        addCandidate('Ivor Kobina Green', 'CPP', 'Presidential');
        addCandidate('Akua Donkor', 'GPP', 'Presidential');

        LogAdmin('kyeiyaw437@gmail.com', 'password');
    }

    function LogAdmin(string memory email, string memory password) public {
        admin[0] = Admin(email, password);
    }


    function election(string memory _name,  string memory _description, uint _startDate,  uint  _endDate) public view {
        ElectionDetails memory details;

        details.owner = msg.sender;
        details.electionName = _name;
        details.description = _description;
        details.startDate = _startDate;
        details.endDate = _endDate;
    }

    function getDetails()public returns (string memory electionName, string memory description, uint startDate, uint endDate) {
        ElectionDetails memory details;
        return  (details.electionName, details.description, details.startDate, details.endDate);
    }

    function addVoters(string memory  _name, uint _voterId, uint _age, string memory _phone, string memory _password, string memory _pollingStation, string memory  _constituency,  string memory _region) public{ 
        voters[votersCount] = Voter(votersCount, _name, _voterId, _age, _phone, _pollingStation, _constituency, bytes32(keccak256(abi.encodePacked(_password))), _region, false, false);
        votersCount ++; 
    }
    
    function getVoter(uint _id) public view returns(uint id, bytes32 _password){
        for (uint i = 0; i < votersCount; i++) {
            voters[i].voterId == _id;
            return (voters[i].voterId, voters[i].password);
        }
    }

    function unHashPassword(string memory _password, uint _voterId) public view returns (bool) {
        return keccak256(abi.encodePacked(_password)) == voters[_voterId].password;
    }

    function authorize(uint id) private {
        require(!voters[id].voted);
        voters[id].authorized = true;
    }

    function addCandidate (string memory _name, string memory _party,  string memory _type) public {
  
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _party, _type, 0);
        candidatesCount ++;
    }

    function vote (uint _candidateId, uint _id) public {

        require(!voters[_id].voted);
        require(voters[_id].authorized);

        // increase of the vote count of the candidate selected
        candidates[_candidateId].votes ++;

        // voters[msg.sender].voted = true;

        emit electionUpdated(_candidateId, candidates[_candidateId].name, candidates[_candidateId].party, candidates[_candidateId].votes);
    }
}