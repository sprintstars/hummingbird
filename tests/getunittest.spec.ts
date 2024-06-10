import { test, expect, request } from "@playwright/test";

const headers = {
  "Content-Type": "application/json",
};

const BASE_URL = "http://localhost:3000/api/srevices";

// //GET random
// test("should GET a random URL", async ({ request }) => {
//   const response = await request.get(BASE_URL);
//   //check response body
//   // expect(response.ok()).toBeTruthy();
//   //assert response code to be ok
//   expect(response.status).toEqual(200);
//   console.log(response);
// });

//GET by id
test("should GET a service amazon by its id", async ({ request }) => {
  const serviceId = 6;
  const response = await request.get(
    "http://localhost:3000/api/services?user=204a8d5c-575b-4796-89b6-ad73d24ce44e&limit=48"
  );
  expect(response.ok()).toBeTruthy(); // Assert that the response status is OK (200)
  const responseBody = await response.json();
});

//throw an error with wrong id
test("should throw error for incorrect id ", async ({ request }) => {
  const invalidServiceId = 999;
  const response = await request.get(
    `http://localhost:3000/api/services?user=` + `${invalidServiceId}` + `&limit=48`
  );
  expect(response.ok()).toBeFalsy();
});

// //check error msg 500 is working as it should
// test("should return 500 if user parameter is missing", async ({ request }) => {
//   const response = await request.get(
//     "http://localhost:3000/api/services?user=204a8d5c-575b-4796-89b6-ad73d24ce44e&limit=48"
//   );
//   expect(response.status()).toBe(500);
// });
//   const responseBody = await response.json();
//   expect(responseBody).toEqual({
//     status: "error",
//     message: "A `status` parameter must be supplied",
//   });
// });
