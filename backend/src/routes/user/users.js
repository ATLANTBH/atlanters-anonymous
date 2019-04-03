export default ({ models }) => {
  const { User } = models;
  return (req, res) => {
    User.findAll()
      .then(user => {
        console.log(user)
        res.sendStatus(200);
      })
      .catch(err => console.log(err))
  }
}
