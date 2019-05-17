import sinon from 'sinon';
import PollTemplateModel from '../../../src/models/poll-template';

const PollTemplateMock = sinon.mock(PollTemplateModel);

export default {
  findAllWithAssoc: PollTemplateMock.expects('findAllWithAssoc'),
  findById: PollTemplateMock.expects('findById'),
  findByTitle: PollTemplateMock.expects('findByTitle'),
  findByUserId: PollTemplateMock.expects('findByUserId')
}