const { test, expect } = require('@playwright/test');

test('Filter resources using GET', async ({ request }) => {
  const userId = 2; // Filter by userId
  const response = await request.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

  // Assertions
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody); 

  // Ensure all returned resources belong to the specified userId
  responseBody.forEach(resource => {
    expect(resource.userId).toBe(userId);
  });
});