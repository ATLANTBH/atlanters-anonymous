import sinon from 'sinon';
import { expect } from 'chai';
import getPolls from '../../../src/routes/poll/polls.get';
import getPollById from '../../../src/routes/poll/polls.id.get';
import getAnswersByPollId from '../../../src/routes/poll/polls.answers.get';
import postPoll from '../../../src/routes/poll/polls.post';
import putPoll from '../../../src/routes/poll/polls.put';
import deletePoll from '../../../src/routes/poll/polls.delete';
import utils from './utils';

const PollTemplate = utils.models.PollTemplate;
const Poll = utils.models.Poll;
const Answer = utils.models.Answer;

const output = utils.output;
const res = utils.res;
const next = utils.next;

const models = utils.models;

describe('Poll Unit Tests', () => {

  afterEach(() => {
    utils.resetMocks();
  });
  
  describe('GET', () => {
    it('polls.get', async() => {
      Poll.findAllWithAssoc.once().withExactArgs([Answer]).returns(output);
      const expressMiddleware = getPolls({models});
      await expressMiddleware({}, res, next);

      expect(Poll.findAllWithAssoc.verify()).to.true;
      expect(res.send.verify()).to.true;
    });

    it('polls.id.get', async() => {
      const input = {
        params: {
          id: 1
        }
      }

      Poll.findById.once().withExactArgs(input.params.id).returns(output);
      const expressMiddleware = getPollById({models});
      await expressMiddleware(input, res, next);

      expect(Poll.findById.verify()).to.true;
      expect(res.send.verify()).to.true;
    });

    it('polls.answers.get', async() => {
      const input = {
        params: {
          id: 1
        }
      }

      Answer.findByPollId.once().withExactArgs(input.params.id).returns(output);
      const expressMiddleware = getAnswersByPollId({models});
      await expressMiddleware(input, res, next);

      expect(Answer.findByPollId.verify()).to.true;
      expect(res.send.verify()).to.true;
    });
  });

  describe('POST', () => {
    it('polls.post', async() => {
      const user = {
        addPoll: (input) => {}
      }
      const userMock = sinon.mock(user);
      const input = {
        user: {
          addPoll: userMock.expects('addPoll').withExactArgs(output)
        },
        params: {
          pollTemplateId: 1
        },
        body: {}
      }
      const pollTemplate = {
        addPoll: (input) => {}
      }
      const pollTemplateMock = sinon.mock(pollTemplate);
      const pTMockOutput = {
        addPoll: pollTemplateMock.expects('addPoll').withExactArgs(output)
      }

      PollTemplate.findById.once().withExactArgs(input.params.pollTemplateId).returns(pTMockOutput);
      Poll.create.once().withExactArgs(input.body).returns(output);
      const expressMiddleware = postPoll({models});
      await expressMiddleware(input, res, next);

      expect(PollTemplate.findById.verify()).to.true;
      expect(Poll.create.verify()).to.true;
      expect(input.user.addPoll.verify()).to.true;
      expect(pTMockOutput.addPoll.verify()).to.true;
      expect(res.send.verify()).to.true;
    });
  });

  describe('PUT', () => {
    it('polls.put', async() => {
      const input = {
        body: {},
        params: {
          id: 1
        }
      }
      const tempOutput = {
        update: (input) => {}
      };
      const tempOutputMock = {
        update: sinon.mock(tempOutput).expects('update').once().withExactArgs(input.body).returns(output)
      }

      Poll.findById.once().withExactArgs(input.params.id).returns(tempOutputMock);
      const expressMiddleware = putPoll({models});
      await expressMiddleware(input, res, next);

      expect(Poll.findById.verify()).to.true;
      expect(tempOutputMock.update.verify()).to.true;
      expect(res.send.verify()).to.true;
    });
  });

  describe('DELETE', () => {
    it('polls.delete', async() => {
      const input = {
        params: {
          id: 1
        }
      }

      const tempOutput = {
        destroy: (input) => {}
      };
      const tempOutputMock = {
        destroy: sinon.mock(tempOutput).expects('destroy').once().withExactArgs().returns(output)
      }

      Poll.findById.once().withExactArgs(input.params.id).returns(tempOutputMock);
      const expressMiddleware = deletePoll({models});
      await expressMiddleware(input, res, next);

      expect(Poll.findById.verify()).to.true;
      expect(tempOutputMock.destroy.verify()).to.true;
      expect(res.send.verify()).to.true;

    });
  });

});