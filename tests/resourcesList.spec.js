const { test, expect } = require('@playwright/test');

test('List all resources using GET', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts');

  // Assertions
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200); // Ensure status is 200 OK

  const responseBody = await response.json();
  console.log(responseBody); // Debug or inspect the list of resources

  expect(Array.isArray(responseBody)).toBeTruthy(); // Ensure it's an array
  expect(responseBody.length).toBeGreaterThan(0); // Ensure the array is not empty
});