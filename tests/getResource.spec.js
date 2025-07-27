const { test, expect } = require('@playwright/test');

test('Get a specific resource using GET', async ({ request }) => {
  const resourceId = 7; // test ID of the resource
  const response = await request.get(`https://jsonplaceholder.typicode.com/posts/${resourceId}`);

  // Assertions
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody); 

  expect(responseBody.id).toBe(resourceId); // Ensure the resource matches the ID
});