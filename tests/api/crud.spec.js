const { test, expect } = require('@playwright/test');
const { postRequest, getRequest, putRequest, deleteRequest } = require('../helpers/APIHelpers');

test.describe('CRUD Operations for Posts API', () => {
  let predefinedPostId = 1;

  test('Perform CRUD operations end-to-end', async ({ request }) => {
    const endpoint = 'https://jsonplaceholder.typicode.com/posts';

    // Create a new resource (POST)
    const newPost = { title: 'YuliiaK Title', body: 'YuliiaK Body', userId: 3 };
    const createdPost = await postRequest(request, endpoint, newPost, expect);
    const createdPostId = createdPost.id;

    // Verify an existing resource (GET)
    const fetchedPost = await getRequest(request, `${endpoint}/${predefinedPostId}`, expect);
    expect(fetchedPost.id).toBe(predefinedPostId);

    // Update the resource (PUT)
    const updatedPost = { id: predefinedPostId, title: 'Updated Title', body: 'Updated Body', userId: 1 };
    const updatedData = await putRequest(request, `${endpoint}/${predefinedPostId}`, updatedPost, expect);
    expect(updatedData.title).toBe('Updated Title');

    // Delete the resource (DELETE)
    await deleteRequest(request, `${endpoint}/${predefinedPostId}`, expect);
  });
});