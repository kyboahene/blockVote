var Election = artifacts.require('./Election.sol')

contract('Election', (accounts) => {
  var electionInstance

  it('initializes with two candidates', () => {
    return Election.deployed()
      .then((instance) => {
        return instance.candidatesCount()
      })
      .then((count) => {
        assert.equal(count, 2)
      })
  })

  it('initializes the candidates with correct values', () => {
    return Election.deployed()
      .then((instance) => {
        electionInstance = instance

        return electionInstance.candidates(1)
      })
      .then((candidate) => {
        assert.equal(candidate[0], 1, 'contains the correct id')
        assert.equal(candidate[1], 'Nana Addo', 'contains the correct name')
        assert.equal(candidate[2], 'NPP', 'contains the correct party name')
        assert.equal(candidate[3], 0, 'contains the votes count')

        return electionInstance.candidates(2)
      })
      .then((candidate) => {
        assert.equal(candidate[0], 2, 'contains the correct id')
        assert.equal(candidate[1], 'John Mahama', 'contains the correct name')
        assert.equal(candidate[2], 'NDC', 'contains the correct party name')
        assert.equal(candidate[3], 0, 'contains the votes count')
      })
  })
})
