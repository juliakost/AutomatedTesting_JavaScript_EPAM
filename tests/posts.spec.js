const { test, expect } = require('@playwright/test');

test.describe('Posts API', () => {
  let postId;

  test('Create a Resource using POST', async ({ request, baseURL }) => {
    // Create a new post with POST
    const createResponse = await request.post('/posts', {
      data: {
        title: 'Yuliia Title',
        body: 'Yuliia Body',
        userId: 2,
      },
    });
    expect(createResponse.ok()).toBeTruthy();
    expect(createResponse.status()).toBe(201);
  });

  test('verify existing post with GET', async ({ request }) => {
    // Use a known postId to verify
    const knownPostId = 2; // Example postId

    const fetchResponse = await request.get(`/posts/${knownPostId}`);
    expect(fetchResponse.ok()).toBeTruthy();
  });
});