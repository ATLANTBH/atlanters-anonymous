import sinon from 'sinon';
import getPollTemplates from '../../../src/routes/poll-template/poll-templates.get';
import getPollTemplateByPollTemplateId from '../../../src/routes/poll-template/poll-templates.id.get';
import getPollTemplateByTitle from '../../../src/routes/poll-template/poll-templates.title.get';
import getPollTemplatePollsById from '../../../src/routes/poll-template/poll-templates.polls.get';
import getPollTemplatePollsByTitle from '../../../src/routes/poll-template/poll-templates.polls.title.get';
import postPollTemplate from '../../../src/routes/poll-template/poll-templates.post';
import postPollTemplatePollAnswers from '../../../src/routes/poll-template/poll-templates.polls.answers.post';
import putPollTemplate from '../../../src/routes/poll-template/poll-templates.put';
import deletePollTemplate from '../../../src/routes/poll-template/poll-templates.delete';
import utils from './utils';

const output = utils.output;
const res = utils.res;
const next = utils.next;

const models = utils.models;

const PollTemplate = models.PollTemplate;
const Poll = models.Poll;
const Answer = models.Answer;

describe('Poll Template Unit Tests', () => {

  afterEach(() => {
    utils.resetMocks();
  })

  describe('GET', () => {
    test('poll-templates', async () => {
      PollTemplate.findAllWithAssoc.once().withExactArgs([Poll]).returns(output);
      const expressMiddleware = getPollTemplates({models});
      await expressMiddleware({}, res, next);

      expect(PollTemplate.findAllWithAssoc.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    });

    test('poll-templates.id.get', async() => {
      const input = 1;

      PollTemplate.findById.once().withExactArgs(input).returns(output);
      const expressMiddleware = getPollTemplateByPollTemplateId({models});
      await expressMiddleware({ params: { id: input } }, res, next);

      expect(PollTemplate.findById.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    });
  
    test('poll-templates.title', async() => {
      const input = 'title';

      PollTemplate.findByTitle.once().withExactArgs(input, Poll).returns(output);
      const expressMiddleware = getPollTemplateByTitle({models});
      await expressMiddleware({ params: { title: input } }, res, next);

      expect(PollTemplate.findByTitle.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    })
    
    test('poll-templates.polls', async() => {
      const input = {
        params: {
          id: 1
        }
      }

      Poll.findByPollTemplateId.once().withExactArgs(input.params.id).returns(output);
      const expressMiddleware = getPollTemplatePollsById({models});
      await expressMiddleware(input, res, next);
      
      expect(Poll.findByPollTemplateId.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    })

    test('poll-templates.polls.title', async() => {
      const input = {
        params: {
          title: 'title'
        }
      }
      const resTemp = {
        send: utils.resMock.expects('send').once().withArgs(output.Polls).returns()
      }

      PollTemplate.findByTitle.once().withExactArgs(input.params.title, Poll).returns(output);
      const expressMiddleware = getPollTemplatePollsByTitle({models});
      await expressMiddleware(input, resTemp, next);
      
      expect(PollTemplate.findByTitle.verify()).toBe(true);
      expect(resTemp.send.verify()).toBe(true);
    })

  })

  describe('POST', () => {

    test('poll-templates', async () => {
      const user = {
        addPollTemplate: (input) => {}
      }
      const userMock = sinon.mock(user);
      const input = {
        user: {
          addPollTemplate: userMock.expects('addPollTemplate').withExactArgs(output)
        },
        body: {
          title: 'title'
        }
      }

      PollTemplate.findByTitle.once().withExactArgs(input.body.title);
      PollTemplate.validCreate.once().withExactArgs(input.body).returns(output);
      const expressMiddleware = postPollTemplate({models});
      await expressMiddleware(input, res, next);

      expect(PollTemplate.findByTitle.verify()).toBe(true);
      expect(PollTemplate.validCreate.verify()).toBe(true);
      expect(input.user.addPollTemplate.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    })

    test('poll-templates.polls.answers', async () => {
      const input = {
        params: {
          pollId: 1,
          id: 2
        },
        body: []
      }
      const poll = {
        isMaxNumAnswersReached: (input) => {},
        addAnswer: (input) => {},
        incrementNumAnswers: (input) => {}
      }
      const pollMock = sinon.mock(poll);
      const pollDataMock = {
        isMaxNumAnswersReached: pollMock.expects('isMaxNumAnswersReached').once().withExactArgs(Answer),
        addAnswer: pollMock.expects('addAnswer').once().withExactArgs(output),
        incrementNumAnswers: pollMock.expects('incrementNumAnswers').withExactArgs()
      }
      const pollTemplate = {
        questions: []
      }

      Poll.findById.once().withExactArgs(input.params.pollId).returns(pollDataMock);
      PollTemplate.findById.withExactArgs(input.params.id).returns(pollTemplate);
      Answer.validCreate.withExactArgs(pollTemplate.questions, input.body).returns(output);
      const expressMiddleware = postPollTemplatePollAnswers({models});
      await expressMiddleware(input, res, next);

      expect(Poll.findById.verify()).toBe(true);
      expect(PollTemplate.findById.verify()).toBe(true);
      expect(pollDataMock.isMaxNumAnswersReached.verify()).toBe(true);
      expect(Answer.validCreate.verify()).toBe(true);
      expect(pollDataMock.addAnswer.verify()).toBe(true);
      expect(pollDataMock.incrementNumAnswers.verify()).toBe(true);
    })

  })

  describe('PUT', () => {
    test('poll-templates', async () => {
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

      PollTemplate.findById.once().withExactArgs(input.params.id).returns(tempOutputMock);
      const expressMiddleware = putPollTemplate({models});
      await expressMiddleware(input, res, next);

      expect(PollTemplate.findById.verify()).toBe(true);
      expect(tempOutputMock.update.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    })
  })


  describe('DELETE', () => {
    test('poll-templates', async () => {
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

      PollTemplate.findById.once().withExactArgs(input.params.id).returns(tempOutputMock);
      const expressMiddleware = deletePollTemplate({models});
      await expressMiddleware(input, res, next);

      expect(PollTemplate.findById.verify()).toBe(true);
      expect(tempOutputMock.destroy.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    })
  })

});