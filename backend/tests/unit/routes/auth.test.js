import sinon from 'sinon';
import signIn from '../../../src/routes/auth/sign-in';
import signOut from '../../../src/routes/auth/sign-out';
import signUp from '../../../src/routes/auth/sign-up';
import utils from './utils';

const output = utils.output;
const next = utils.next;

const models = utils.models;

const User = models.User;

function getResHeaderMock() {

  const resData = {
    send: (input) => {

    }
  }
  const headerData = {
    header: (input, input2) => {
      return resData;
    }
  }
  const cookieData = {
    cookie: (input, id, obj) => {
      return input;
    }
  }

  const cookieMock = sinon.mock(cookieData);
  const resMock = sinon.mock(resData);
  const headerMock = sinon.mock(headerData);

  const header = {
    send: resMock.expects('send').once().withExactArgs(output)
  }
  const res = {
    header: headerMock.expects('header').once().withExactArgs('x-auth', '').returns(resData),
    cookie: cookieMock.expects('cookie').once().withExactArgs('user_id', output.id, {
      httpOnly: true,
      secured: true,
      signed: true,
    })
  }

  return { res, header };
}

function getSignOutResUserMock() {
  const userData = {
    removeAuthenticationToken: (token) => {
      return token;
    }
  }
  const userMock = sinon.mock(userData);
  const user = {
    removeAuthenticationToken: userMock.expects('removeAuthenticationToken').once().withExactArgs("")
  }

  const resData = {
    send: () => {}
  }
  const resMock = sinon.mock(resData);
  const res = {
    send: resMock.expects('send').once()
  }

  return { res, user };
}

describe('Auth Unit Tests', () => {

  afterEach(() => {
    utils.resetMocks();
  })

  describe('GET', () => {

    test('sign-up', async () => {
      const input = {
        body: {}
      }

      const { res, header } = getResHeaderMock();

      User.insert.once().withExactArgs(input.body).returns({user: output, token: ''});
      const expressMiddleware = signUp({models});
      await expressMiddleware(input, res, next);

      expect(User.insert.verify()).toBe(true);
      expect(res.header.verify()).toBe(true);
      expect(header.send.verify()).toBe(true);  
    })

    test('sign-in', async () => {
      const input = {
        body: {
          email: 'user@email.com',
          password: 'pw123456'
        }
      }
      
      const { res, header } = getResHeaderMock();

      User.authenticate.once().withExactArgs(input.body.email, input.body.password).returns(output);
      User.generateAuthenticationToken.once().withExactArgs(output).returns("");
      const expressMiddleware = signIn({models});
      await expressMiddleware(input, res, next);

      expect(User.authenticate.verify()).toBe(true);
      expect(User.generateAuthenticationToken.verify()).toBe(true);
      expect(res.cookie.verify()).toBe(true);  
      expect(res.header.verify()).toBe(true);
      expect(header.send.verify()).toBe(true);   
    })

    test('sign-out', async () => {
      
      const { res, user } = getSignOutResUserMock();
      const input = {
        user,
        token: ""
      }

      await signOut(input, res, next);

      expect(user.removeAuthenticationToken.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);   
    })

  })

})