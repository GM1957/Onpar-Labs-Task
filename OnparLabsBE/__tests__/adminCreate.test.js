const request = require('supertest')
const {
  adminCreateInput
} = require("./testUtils/adminCreateInputs");

const app = require('../server')

describe("Admin Create - admin create test cases", () => {
  // Create admin with details
  describe("creating admin unit test", () => {
    it('should create a new post', async () => {
      const res = await request(app)
        .post('/Admins')
        .set('Content-Type', 'application/json')
        .send(adminCreateInput())
      expect(res.statusCode).toEqual(201)
    })
  });
});
