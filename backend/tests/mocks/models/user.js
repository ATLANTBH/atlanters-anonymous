import sinon from 'sinon';
import UserModel from '../../../src/models/user';

const UserMock = sinon.mock(UserModel);

export default {
  findAllWithAssoc: UserMock.expects('findAllWithAssoc'),
  findByEmail: UserMock.expects('findByEmail'),
  findById: UserMock.expects('findById'),
  findByAuthenticationToken: UserMock.expects('findByAuthenticationToken'),
  insert: UserMock.expects('insert')
}