import { hash, compare } from 'bcrypt';

export default (models) => {
  return async (req, res, next) => {
    let userObj = req.body;
    let user = await models.User.findByEmail(userObj.email);
    if (!user) next(new Error("User with this email does not exist"));
    else {
      let isPasswordEqual = await compare(userObj.password, user.password);
      if (!isPasswordEqual) next(new Error("Password incorrect"));
      else {
        res.cookie('user_id', user.id, {
          httpOnly: true,
          secured: true,
          signed: true
        });
        res.json({
          msg: "Logged in"
        })
      }
    }
  }
  
}