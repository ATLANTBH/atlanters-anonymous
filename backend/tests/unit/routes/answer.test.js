import getAnswers from '../../../src/routes/answer/answers.get';
import getAnswersById from '../../../src/routes/answer/answers.id.get';
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

    test('answers', async () => {
      Answer.findAllWithAssoc.once().withExactArgs([Poll]).returns(output);
      const expressMiddleware = getAnswers({models});
      await expressMiddleware({}, res, next);

      expect(Answer.findAllWithAssoc.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    });

    test('answers.id', async () => {
      const input = {
        params: {
          id: 1
        }
      }
      Answer.findById.once().withExactArgs(input.params.id).returns(output);
      const expressMiddleware = getAnswersById({models});
      await expressMiddleware(input, res, next);

      expect(Answer.findById.verify()).toBe(true);
      expect(res.send.verify()).toBe(true);
    });

  })

})