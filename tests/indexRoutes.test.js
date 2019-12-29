var request = require("supertest");
var app = require("../app");

describe('Index routes', () => {
  it("Index routes should return 200", async () => {
    let res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });
});

describe('GET /users/login', () => {
  it("Should return login form", async () => {
    let res = await request(app).get("/users/login");
    expect(res.statusCode).toEqual(200);
  });
});

