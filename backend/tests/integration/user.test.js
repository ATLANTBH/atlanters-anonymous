require('dotenv').config();
import { expect } from 'chai';
import getModels from '../lib/init';
import mocks from '../mocks';

let user = mocks.data.user;
let models = null;

describe('Testing models', async () => {

  before(async function () {
    models = await getModels();
  })

  describe('Testing User', () => {
  
    it('find user with given auth token', async() => {
      const userResult = await models.User.findByAuthenticationToken(user.oldUser.tokens[0]);
      expect(userResult.dataValues).to.deep.include(user.oldUser);
    })
  
    it('find user with given email', async () => {
      const userResult = await models.User.findByEmail('veda_df@dfasfasa.com');
      expect(userResult.dataValues).to.deep.include(user.oldUser);
    });
  
    it('password invalid', async() => {
      const invalidPasswords = ['test', [], {}, ''];
      let invalid = false;
      invalidPasswords.forEach(element => {
        if(models.User.isPasswordValid(element)) {
          invalid = true;
        }
      });
      expect(invalid).to.false;
    });
  
    it('user not added to db - email already exists', async() => {
      expect(models.User.insert(user.oldUser)).to.be.rejected;
    })
  
    it('user not added to db - missing fields', async() => {
      let added = false;
      user.invalidUsers.forEach(async(element) => {
        try{
          await models.User.insert(element);
          added = true;
        }
        catch(error) {}
      })
      expect(added).to.false;
    })
  
    it('add user to db', async() => {
      expect(models.User.insert(user.newUser)).to.be.fulfilled;
    })

  })

})
