export default (models) => {
  return (req, res) => {
    models.User.findAll()
      .then(user => {
        console.log(user)
        res.sendStatus(200);
      })
      .catch(err => console.log(err))
  }
}
