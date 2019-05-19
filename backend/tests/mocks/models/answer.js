import sinon from 'sinon';
import AnswerModel from '../../../src/models/answer';

const AnswerMock = sinon.mock(AnswerModel);

export default {
  findAllWithAssoc: AnswerMock.expects('findAllWithAssoc'),
  findById: AnswerMock.expects('findById'),
  findByPollId: AnswerMock.expects('findByPollId'),
  validCreate: AnswerMock.expects('validCreate')
}