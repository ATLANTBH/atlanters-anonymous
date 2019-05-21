import getAnswers from '../../../src/routes/answer/answers.get';
import getAnswersById from '../../../src/routes/answer/answers.id.get';
import { expect } from 'chai';
import utils from './utils';

const output = utils.output;
const res = utils.res;
const next = utils.next;

const models = utils.models;

const Poll = models.Poll;
const Answer = models.Answer;

describe('Answer Unit Tests', () => {

  afterEach(() => {
    utils.resetMocks();
  })

  describe('GET', () => {

    it('answers.get', async () => {
      Answer.findAllWithAssoc.once().withExactArgs([Poll]).returns(output);
      const expressMiddleware = getAnswers({models});
      await expressMiddleware({}, res, next);

      expect(Answer.findAllWithAssoc.verify()).to.true;
      expect(res.send.verify()).to.true;
    });

    it('answers.id.get', async () => {
      const input = {
        params: {
          id: 1
        }
      }
      Answer.findById.once().withExactArgs(input.params.id).returns(output);
      const expressMiddleware = getAnswersById({models});
      await expressMiddleware(input, res, next);

      expect(Answer.findById.verify()).to.true;
      expect(res.send.verify()).to.true;
    });

  })

})