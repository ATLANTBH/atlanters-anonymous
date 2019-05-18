import sinon from 'sinon';
import PollTemplateModel from '../../../src/models/poll-template';

const PollTemplateMock = sinon.mock(PollTemplateModel);

export default {
  findAllWithAssoc: PollTemplateMock.expects('findAllWithAssoc'),
  findById: PollTemplateMock.expects('findById'),
  findByTitle: PollTemplateMock.expects('findByTitle'),
  findByUserId: PollTemplateMock.expects('findByUserId'),
  create: PollTemplateMock.expects('create'),
  validate: PollTemplateMock.expects('validate'),
  validCreate: PollTemplateMock.expects('validCreate')
}