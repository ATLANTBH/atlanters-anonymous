import sinon from 'sinon';
import getUsers from '../../../src/routes/user/users.get';
import getUserByEmail from '../../../src/routes/user/user.email.get';
import getPollTemplatesByUserEmail from '../../../src/routes/user/user.email.poll-templates.get';
import getPollsByUserEmail from '../../../src/routes/user/user.email.polls.get';
import getUserById from '../../../src/routes/user/user.id.get';
import getPollTemplatesByUserId from '../../../src/routes/user/user.poll-templates.get';
import getPollsByUserId from '../../../src/routes/user/user.polls.get';
import putUser from '../../../src/routes/user/users.put';
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

    test('users', async () => {
      User.findAllWithAssoc.once().withExactArgs([PollTemplate, Poll]).returns(output);
      const expressMiddleware = getUsers({models});
      await expressMiddleware({}, res, next);

      expect(User.findAllWithAssoc.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);      
    });

    test('user.id', async () => {
      const input = 1;

      User.findById.once().withExactArgs(input).returns(output);
      const expressMiddleware = getUserById({models});
      await expressMiddleware({ params: { id: input } }, res, next);

      expect(User.findById.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    })

    test('user.email', async () => {
      const input = {
        body: {
          email: 'user@email.com'
        }
      };

      User.findByEmail.once().withExactArgs(input.body.email).returns(output);
      const expressMiddleware = getUserByEmail({models});
      await expressMiddleware(input, res, next);

      expect(User.findByEmail.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    })

    test('user.email.poll-templates', async () => {
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

      expect(User.findByEmail.verify()).toBe(true);
      expect(PollTemplate.findByUserId.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    })

    test('user.email.polls', async () => {
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

      expect(User.findByEmail.verify()).toBe(true);
      expect(Poll.findByUserId.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    })

    test('user.poll-templates', async () => {
      const input = {
        params: {
          id: 1
        }
      };

      PollTemplate.findByUserId.once().withExactArgs(input.params.id).returns(output);
      const expressMiddleware = getPollTemplatesByUserId({models});
      await expressMiddleware(input, res, next);

      expect(PollTemplate.findByUserId.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    })

    test('user.polls', async() => {
      const input = {
        params: {
          id: 1
        }
      };

      Poll.findByUserId.once().withExactArgs(input.params.id).returns(output);
      const expressMiddleware = getPollsByUserId({models});
      await expressMiddleware(input, res, next);

      expect(Poll.findByUserId.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    })

  })

  describe('PUT', () => {

    test('users', async () => {
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

      expect(User.findById.verify()).toBe(true);
      expect(User.getValidUserRequest.verify()).toBe(true);
      expect(tempOutputMock.update.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    })

  })

})
