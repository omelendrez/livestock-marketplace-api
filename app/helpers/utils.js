const toWeb = (user) => {
  const removeFields = {
    password: undefined
  }
  return { ...user, ...removeFields }
}

module.exports = toWeb;
