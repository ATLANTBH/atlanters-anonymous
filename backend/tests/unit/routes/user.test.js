import sinon from 'sinon';
import getUsers from '../../../src/routes/user/users.get';
import getUserByEmail from '../../../src/routes/user/user.email.get';
import getPollTemplatesByUserEmail from '../../../src/routes/user/user.email.poll-templates.get';
import getPollsByUserEmail from '../../../src/routes/user/user.email.polls.get';
import getUserById from '../../../src/routes/user/user.id.get';
import getPollTemplatesByUserId from '../../../src/routes/user/user.poll-templates.get';
import getPollsByUserId from '../../../src/routes/user/user.polls.get';
import putUser from '../../../src/routes/user/users.put';
import { expect } from 'chai';
import utils from './utils';

const output = utils.output;
const res = utils.res;
const next = utils.next;

const models = utils.models;

const User = models.User;
const Poll = models.Poll;
const PollTemplate = models.PollTemplate;

describe('User Unit Tests', () => {

  afterEach(() => {
    utils.resetMocks();
  })

  describe('GET', () => {

    it('users.get', async () => {
      User.findAllWithAssoc.once().withExactArgs([PollTemplate, Poll]).returns(output);
      const expressMiddleware = getUsers({models});
      await expressMiddleware({}, res, next);

      expect(User.findAllWithAssoc.verify()).to.true;
      expect(res.send.verify()).to.true;      
    });

    it('user.id.get', async () => {
      const input = 1;

      User.findById.once().withExactArgs(input).returns(output);
      const expressMiddleware = getUserById({models});
      await expressMiddleware({ params: { id: input } }, res, next);

      expect(User.findById.verify()).to.true;
      expect(res.send.verify()).to.true;
    })

    it('user.email.get', async () => {
      const input = {
        body: {
          email: 'user@email.com'
        }
      };

      User.findByEmail.once().withExactArgs(input.body.email).returns(output);
      const expressMiddleware = getUserByEmail({models});
      await expressMiddleware(input, res, next);

      expect(User.findByEmail.verify()).to.true;
      expect(res.send.verify()).to.true;
    })

    it('user.email.poll-templates.get', async () => {
      const input = {
        body: {
          email: 'user@email.com'
        }
      };
      const userOutput = {
        id: 1
      }

      User.findByEmail.once().withExactArgs(input.body.email).returns(userOutput);
      PollTemplate.findByUserId.once().withExactArgs(userOutput.id).returns(output);
      const expressMiddleware = getPollTemplatesByUserEmail({models});
      await expressMiddleware(input, res, next);

      expect(User.findByEmail.verify()).to.true;
      expect(PollTemplate.findByUserId.verify()).to.true;
      expect(res.send.verify()).to.true;
    })

    it('user.email.polls.get', async () => {
      const input = {
        body: {
          email: 'user@email.com'
        }
      };
      const userOutput = {
        id: 1
      }

      User.findByEmail.once().withExactArgs(input.body.email).returns(userOutput);
      Poll.findByUserId.once().withExactArgs(userOutput.id).returns(output);
      const expressMiddleware = getPollsByUserEmail({models});
      await expressMiddleware(input, res, next);

      expect(User.findByEmail.verify()).to.true;
      expect(Poll.findByUserId.verify()).to.true;
      expect(res.send.verify()).to.true;
    })

    it('user.poll-templates.get', async () => {
      const input = {
        params: {
          id: 1
        }
      };

      PollTemplate.findByUserId.once().withExactArgs(input.params.id).returns(output);
      const expressMiddleware = getPollTemplatesByUserId({models});
      await expressMiddleware(input, res, next);

      expect(PollTemplate.findByUserId.verify()).to.true;
      expect(res.send.verify()).to.true;
    })

    it('user.polls.get', async() => {
      const input = {
        params: {
          id: 1
        }
      };

      Poll.findByUserId.once().withExactArgs(input.params.id).returns(output);
      const expressMiddleware = getPollsByUserId({models});
      await expressMiddleware(input, res, next);

      expect(Poll.findByUserId.verify()).to.true;
      expect(res.send.verify()).to.true;
    })

  })

  describe('PUT', () => {

    it('users.put', async () => {
      const input = {
        body: {},
        params: {
          id: 1
        }
      }
      const updateInput = {};
      const tempOutput = {
        update: (input) => {}
      };
      const tempOutputMock = {
        update: sinon.mock(tempOutput).expects('update').once().withExactArgs(updateInput).returns(output)
      }

      User.findById.once().withExactArgs(input.params.id).returns(tempOutputMock);
      User.getValidUserRequest.once().withExactArgs(tempOutputMock, input.body).returns(updateInput);
      const expressMiddleware = putUser({models});
      await expressMiddleware(input, res, next);

      expect(User.findById.verify()).to.true;
      expect(User.getValidUserRequest.verify()).to.true;
      expect(tempOutputMock.update.verify()).to.true;
      expect(res.send.verify()).to.true;
    })

  })

})
