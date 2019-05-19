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
import mocks from '../../mocks';
import { expect } from 'chai';

const output = {
  Polls: []
};
const resMock = sinon.mock(mocks.data.express.res);
const res = {
  send: resMock.expects('send').once().withArgs(output).returns()
}
const PollTemplate = mocks.models.PollTemplateMock;
const Poll = mocks.models.PollMock;
const Answer = mocks.models.AnswerMock;
const models = {
  PollTemplate,
  Poll,
  Answer
}
const next = (error) => {
  console.log(error);
}

function resetMocks() {
  res.send.reset();
  for(let key in PollTemplate) PollTemplate[key].reset();
  for(let key in Poll) Poll[key].reset();
  for(let key in Answer) Answer[key].reset();
}

describe('Poll Template Unit Tests', () => {

  afterEach(() => {
    resetMocks();
  })

  describe('GET', () => {
    it('poll-templates.get.js', async () => {
      PollTemplate.findAllWithAssoc.once().withExactArgs([Poll]).returns(output);
      const expressMiddleware = getPollTemplates({models});
      await expressMiddleware({}, res, next);

      expect(PollTemplate.findAllWithAssoc.verify()).to.true;
      expect(res.send.verify()).to.true;
    });

    it('poll-templates.id.get.js', async() => {
      const input = 1;

      PollTemplate.findById.once().withExactArgs(input).returns(output);
      const expressMiddleware = getPollTemplateByPollTemplateId({models});
      await expressMiddleware({ params: { id: input } }, res, next);

      expect(PollTemplate.findById.verify()).to.true;
      expect(res.send.verify()).to.true;
    });
  
    it('poll-templates.title.get.js', async() => {
      const input = 'title';

      PollTemplate.findByTitle.once().withExactArgs(input, Poll).returns(output);
      const expressMiddleware = getPollTemplateByTitle({models});
      await expressMiddleware({ params: { title: input } }, res, next);

      expect(PollTemplate.findByTitle.verify()).to.true;
      expect(res.send.verify()).to.true;
    })
    
    it('poll-templates.polls.get.js', async() => {
      const input = {
        params: {
          id: 1
        }
      }

      Poll.findByPollTemplateId.once().withExactArgs(input.params.id).returns(output);
      const expressMiddleware = getPollTemplatePollsById({models});
      await expressMiddleware(input, res, next);
      
      expect(Poll.findByPollTemplateId.verify()).to.true;
      expect(res.send.verify()).to.true;
    })

    it('poll-templates.polls.title.get.js', async() => {
      const input = {
        params: {
          title: 'title'
        }
      }
      const resTemp = {
        send: resMock.expects('send').once().withArgs(output.Polls).returns()
      }

      PollTemplate.findByTitle.once().withExactArgs(input.params.title, Poll).returns(output);
      const expressMiddleware = getPollTemplatePollsByTitle({models});
      await expressMiddleware(input, resTemp, next);
      
      expect(PollTemplate.findByTitle.verify()).to.true;
      expect(resTemp.send.verify()).to.true;
    })

  })

  describe('POST', () => {

    it('poll-templates.post.js', async () => {
      const user = {
        addPollTemplate: (input) => {}
      }
      const userMock = sinon.mock(user);
      const input = {
        user: {
          addPollTemplate: userMock.expects('addPollTemplate').withExactArgs(output)
        },
        body: mocks.data.pollTemplate.pollTemplate.newPollTemplate
      }

      PollTemplate.findByTitle.once().withExactArgs(input.body.title);
      PollTemplate.validCreate.once().withExactArgs(input.body).returns(output);
      const expressMiddleware = postPollTemplate({models});
      await expressMiddleware(input, res, next);

      expect(PollTemplate.findByTitle.verify()).to.true;
      expect(PollTemplate.validCreate.verify()).to.true;
      expect(input.user.addPollTemplate.verify()).to.true;
      expect(res.send.verify()).to.true;
    })

    it('poll-templates.polls.answers.post', async () => {
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

      expect(Poll.findById.verify()).to.true;
      expect(PollTemplate.findById.verify()).to.true;
      expect(pollDataMock.isMaxNumAnswersReached.verify()).to.true;
      expect(Answer.validCreate.verify()).to.true;
      expect(pollDataMock.addAnswer.verify()).to.true;
      expect(pollDataMock.incrementNumAnswers.verify()).to.true;
    })

  })

  describe('PUT', async () => {
    it('poll-templates.put.js', async () => {
      const input = {
        body: mocks.data.pollTemplate.pollTemplate.newPollTemplate,
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

      expect(PollTemplate.findById.verify()).to.true;
      expect(tempOutputMock.update.verify()).to.true;
      expect(res.send.verify()).to.true;
    })
  })


  describe('DELETE', () => {
    it('poll-templates.delete.js', async () => {
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

      expect(PollTemplate.findById.verify()).to.true;
      expect(tempOutputMock.destroy.verify()).to.true;
      expect(res.send.verify()).to.true;
    })
  })

});