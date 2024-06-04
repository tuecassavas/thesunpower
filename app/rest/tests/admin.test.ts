import sinon from 'sinon';
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';

if (process.env.NODE_ENV !== 'test') {
  throw new Error('env must be test');
}
dotenv.config({
  path: `.test.env`
});

const URL = `http://localhost:${process.env.PORT}/v1`;
let sandbox: sinon.SinonSandbox = sinon.createSandbox();
let stub: sinon.SinonStub;

beforeEach(() => jest.useFakeTimers());

chai.use(chaiHttp);

describe('Admin Sign-in Test', function () {
  it('should response 402 when user not exists', async () => {
    const res = await chai.request(app).post(`/v1/admin/sign-in`).send({ username: '0337778226', password: '123' });

    assert.equal(res.status, 422);
    assert.equal(res.body.code, 'E002_USER_NOT_EXISTS');
  });
});
