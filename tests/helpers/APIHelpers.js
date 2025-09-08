async function postRequest(request, endpoint, data, expect) {
  const response = await request.post(endpoint, { data });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
  return response.json();
}

async function getRequest(request, endpoint, expect) {
  const response = await request.get(endpoint);
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  return response.json();
}

async function putRequest(request, endpoint, data, expect) {
  const response = await request.put(endpoint, { data });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  return response.json();
}

async function deleteRequest(request, endpoint, expect) {
  const response = await request.delete(endpoint);
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  return response;
}

module.exports = { postRequest, getRequest, putRequest, deleteRequest };