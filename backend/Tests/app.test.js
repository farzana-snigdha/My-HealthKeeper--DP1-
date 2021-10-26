const request = require("supertest");
const app = require("../app");
const chai = require("chai");
var expect = chai.expect

describe("test1", () => {
  it("server is connected", (done) => {
    request(app).get("/").expect("App running", done);
  });
});
