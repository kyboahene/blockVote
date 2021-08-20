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
        uint age;
        string phone;
        string pollingStation;
        string constituency;
        string region;
        bool voted;
        bool authorized;
    }

    //admin
     struct Admin {
        string email;
        string password;
    }

    //owner
    address public owner;

    string public electionName;
    uint public startDate;
    uint public endDate;

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

    uint public totalVotes;

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }


    constructor () public {
        addCandidate('Nana Addo', 'NPP', 'Presidential');
        addCandidate('John Mahama', 'NDC', 'Presidential' );

        LogAdmin('kyeiyaw437@gmail.com', 'password');
    }

    function LogAdmin(string memory email, string memory password) public {
        admin[0] = Admin(email, password);
    }

    function AdminLogin(string memory _email, string memory _password) public {
        string memory regEx = '/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/';
        if( _email.trim() == ''){
            return "Email is required";
        }

        if(!_email.match(regEx)){
            return "Email must be valid";
        }
    }

    function election(string memory _name,  uint _startDate,  uint  _endDate) public {
        owner = msg.sender;
        electionName = _name;
        startDate = _startDate;
        endDate = _endDate;
    }

    function addVoters(string memory  _name,  uint _age, string memory _phone, string memory _pollingStation, string memory  _constituency,  string memory _region) public {
        voters[votersCount] = Voter(votersCount, _name, _age, _phone, _pollingStation, _constituency, _region, false, false);

      votersCount ++;
    }

    function authorize(uint id, string memory voterID) private {
        require(!voters[id].voted);
        voters[id].authorized = true;
    }

    function addCandidate (string memory _name, string memory _party,  string memory _type) public {
        // for (var i = 0; i < candidatesCount; i++) {
        //     require(candidates[i].name !== _name)
        // }
  
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