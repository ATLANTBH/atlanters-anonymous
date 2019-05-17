import PollTemplateMock from './poll-template';
import PollMock from './poll';
import AnswerModel from '../../../src/models/answer';
import UserModel from '../../../src/models/user';

export default {
  PollTemplateMock,
  PollMock,
  Answer: AnswerModel,
  User: UserModel
}