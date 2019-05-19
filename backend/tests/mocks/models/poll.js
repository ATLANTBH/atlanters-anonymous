import sinon from 'sinon';
import PollModel from '../../../src/models/poll';

const PollMock = sinon.mock(PollModel);

export default {
  findAllWithAssoc: PollMock.expects('findAllWithAssoc'),
  findByUserId: PollMock.expects('findByUserId'),
  findById: PollMock.expects('findById'),
  findByPollTemplateId: PollMock.expects('findByPollTemplateId'),
  create: PollMock.expects('create')
}