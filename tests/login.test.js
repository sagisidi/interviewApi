const login = require('../controllers/login');
const mocks = require('./mocks');

describe('Testing login controller', () => {


	test('1: Test for invalid authorization value', async () => {
		expect.assertions(1)
		const req = mocks.mockRequest();
		const res = mocks.mockResponse();

		req.headers.authorization = null;
		await login.getLogin(req,res);
		expect(res.status.mock.calls[0][0]).toBe(401);
	})

	test('2: Test missing email value', async () => {
		expect.assertions(1)
		const req = mocks.mockRequest();
		const res = mocks.mockResponse();

		req.body.email = null;
		await login.postLogin(req,res);
		expect(res.status.mock.calls[0][0]).toBe(422);
	})

})


