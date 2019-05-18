import sinon from 'sinon';
import getPollTemplates from '../../../src/routes/poll-template/poll-templates.get';
import getPollTemplateByPollTemplateId from '../../../src/routes/poll-template/poll-templates.id.get';
import getPollTemplateByTitle from '../../../src/routes/poll-template/poll-templates.title.get';
import getPollTemplateByUserId from '../../../src/routes/poll-template/poll-templates.user.get';
import getPollTemplateByUserEmail from '../../../src/routes/poll-template/poll-templates.user.email.get';
import postPollTemplate from '../../../src/routes/poll-template/poll-templates.post';
import mocks from '../../mocks';
import { expect } from 'chai';

const output = 1;
const resMock = sinon.mock(mocks.data.express.res);
const res = {
  send: resMock.expects('send').once().withArgs(output).returns()
}
const PollTemplate = mocks.models.PollTemplateMock;
const Poll = mocks.models.PollMock;
const User = mocks.models.UserMock;
const next = (error) => {
  console.log(error);
}

describe('Poll Template Unit Tests', () => {

  afterEach(() => {
    res.send.reset();
    PollTemplate.findById.reset();
    PollTemplate.findAllWithAssoc.reset();
    PollTemplate.findByTitle.reset();
    PollTemplate.findByUserId.reset();
    PollTemplate.validCreate.reset();
  })

  describe('GET', () => {
    it('poll-templates.get.js', async () => {
      PollTemplate.findAllWithAssoc.once().withExactArgs([Poll]).returns(output);
      const expressMiddleware = getPollTemplates({ models: { PollTemplate, Poll } });
      await expressMiddleware({}, res, next);

      expect(PollTemplate.findAllWithAssoc.verify()).to.true;
      expect(res.send.verify()).to.true;
    });

    it('poll-templates.id.get.js', async() => {
      const input = 1;
      PollTemplate.findById.once().withExactArgs(input).returns(output);
      const expressMiddleware = getPollTemplateByPollTemplateId( { models: { PollTemplate } });
      await expressMiddleware({ params: { id: input } }, res, next);

      expect(PollTemplate.findById.verify()).to.true;
      expect(res.send.verify()).to.true;
    });
  
    it('poll-templates.title.get.js', async() => {
      const input = 'title';
      PollTemplate.findByTitle.once().withExactArgs(input, Poll).returns(output);
      const expressMiddleware = getPollTemplateByTitle( { models: { PollTemplate, Poll } });
      await expressMiddleware({ params: { title: input } }, res, next);

      expect(PollTemplate.findByTitle.verify()).to.true;
      expect(res.send.verify()).to.true;
    })
    
    it('poll-templates.user.get.js', async () => {
      const input = 1;
      PollTemplate.findByUserId.once().withExactArgs(input).returns(output);
      const expressMiddleware = getPollTemplateByUserId( { models: { PollTemplate } });
      await expressMiddleware({ params: { userId: input } }, res, next);
  
      expect(PollTemplate.findByUserId.verify()).to.true;
      expect(res.send.verify()).to.true;
    })

    it('poll-templates.user.email.get.js', async () => {
      const input = 'user@email.com';
      const user = { id: 1 };
      User.findByEmail.once().withExactArgs(input).returns(user);
      PollTemplate.findByUserId.once().withExactArgs(user.id).returns(output);
      const expressMiddleware = getPollTemplateByUserEmail( { models: { PollTemplate, User } });
      await expressMiddleware({ body: { email: input } }, res, next);
      
      expect(User.findByEmail.verify()).to.true;
      expect(PollTemplate.findByUserId.verify()).to.true;
      expect(res.send.verify()).to.true;
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
      const expressMiddleware = postPollTemplate( { models: { PollTemplate } });
      await expressMiddleware(input, res, next);

      expect(PollTemplate.findByTitle.verify()).to.true;
      expect(PollTemplate.validCreate.verify()).to.true;
      expect(input.user.addPollTemplate.verify()).to.true;
      expect(res.send.verify()).to.true;
    })
  })

  

});