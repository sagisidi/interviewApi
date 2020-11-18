function mockRequest(){
  const req = {};
  req.body = jest.fn().mockReturnValue(req);
  req.headers = jest.fn().mockReturnValue(req);
  return req;
}


function mockResponse(){
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}


function mockNext(){
  return jest.fn();
}



module.exports = {
	mockRequest,
	mockResponse,
	mockNext
}