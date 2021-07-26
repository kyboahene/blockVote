module.exports.validLoginInput = (email, password) => {
  const errors = {}
  if (email.trim() == '') {
    errors.email = 'Email is required'
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address'
    }
  }

  if (password == '') {
    errors.password = 'Password is required'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

module.exports.validVoterInput = (voterID, voterKey) => {
  const errors = {}
  if (voterID.trim() == '') {
    errors.voterID = 'Voter ID is required'
  } else {
    const check = parseInt(voterID)
    if (check.length < 8) errors.voterID = 'Incorrect Voter ID'
  }

  if (voterKey.trim() == '') {
    errors.voterKey = 'Voter Key is required'
  }
}
