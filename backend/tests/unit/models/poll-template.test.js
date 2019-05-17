import sinon from 'sinon';
import getPollTemplates from '../../../src/routes/poll-template/poll-templates.get';
import getPollTemplateByPollTemplateId from '../../../src/routes/poll-template/poll-templates.id.get';
import getPollTemplateByTitle from '../../../src/routes/poll-template/poll-templates.title.get';
import mocks from '../../mocks';
import { expect } from 'chai';

const output = 1;
const resMock = sinon.mock(mocks.data.express.res);
const res = {
  send: resMock.expects('send').once().withArgs(output).returns()
}
const PollTemplate = mocks.models.PollTemplateMock;
const Poll = mocks.models.PollMock;

describe('Poll Template Unit Tests', () => {

  afterEach(() => {
    res.send.reset();
    PollTemplate.findById.reset();
    PollTemplate.findAllWithAssoc.reset();
    PollTemplate.findByTitle.reset();
    PollTemplate.findByUserId.reset();
  })

  it('poll-templates.get.js', async () => {
    PollTemplate.findAllWithAssoc.once().withExactArgs([Poll]).returns(output);
    const expressMiddleware = getPollTemplates({ models: { PollTemplate, Poll } });
    await expressMiddleware({}, res, {});
    
    expect(PollTemplate.findAllWithAssoc.verify()).to.true;
    expect(res.send.verify()).to.true;
  });

  it('poll-templates.id.get.js', async() => {
    const input = 1;
    PollTemplate.findById.once().withExactArgs(input).returns(output);
    const expressMiddleware = getPollTemplateByPollTemplateId( { models: { PollTemplate } });
    await expressMiddleware({ params: { id: input } }, res, {});

    expect(PollTemplate.findById.verify()).to.true;
    expect(res.send.verify()).to.true;
  });

  it('poll-templates.title.get.js', async() => {
    const input = 'title';
    PollTemplate.findByTitle.once().withExactArgs(input, Poll).returns(output);
    const expressMiddleware = getPollTemplateByTitle( { models: { PollTemplate, Poll } });
    await expressMiddleware({ params: { title: input } }, res, {});

    expect(PollTemplate.findByTitle.verify()).to.true;
    expect(res.send.verify()).to.true;
  })

});