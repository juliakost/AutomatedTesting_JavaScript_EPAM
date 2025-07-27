const { test, expect } = require('@playwright/test');

test('Update a Resource using PUT', async ({ request }) => {
  const resourceId = 1; // ID of the resource to update
  const updatedPayload = {
    id: resourceId, // Keep the original ID
    title: 'Updated Y title',
    body: 'Updated Y body',
    userId: 1,
  };

  const response = await request.put(`https://jsonplaceholder.typicode.com/posts/${resourceId}`, {
    data: updatedPayload,
  });

  // Assertions
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200); // Status for update is 200 OK
  const responseBody = await response.json();
  console.log(responseBody);

  expect(responseBody.title).toBe(updatedPayload.title);
  expect(responseBody.body).toBe(updatedPayload.body);
});