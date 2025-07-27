const { test, expect } = require('@playwright/test');

test('Delete a Resource using DELETE', async ({ request }) => {
  const resourceId = 3; // ID of the resource to be deleted

  const response = await request.delete(`https://jsonplaceholder.typicode.com/posts/${resourceId}`);

  // Assertions
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200); 
});