/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */

global.rootRequire = path => require(`${process.cwd()}/${path}`);

const fixtures = require("./fixtures");
const chai = require("chai");

const fileUtil = rootRequire("lib/utils/files.util");
const UserService = fileUtil.requireService("user");

const { expect } = chai;

describe("User's Test", () => {
  before(() => {
    this.user = {};

    const app = rootRequire("app/init/index");
    app.boot();

    global.app = app;
  });

  it("should create a valid user", async () => {
    const serviceInstance = new UserService();
    const user = await serviceInstance.createUser(fixtures.user);
    this.user = user;

    expect(user).to.have.property("id");
  });

  it("should not duplicate user with same twitter username", async () => {
    const serviceInstance = new UserService();
    const user = await serviceInstance.createUser(fixtures.user);
    expect(user).to.have.string("already exist");
  });

  it("should list users", async () => {
    const serviceInstance = new UserService();

    const res = await serviceInstance.listUsers();
  });

  it("should update user", async () => {
    const serviceInstance = new UserService();

    const res = await serviceInstance.updateUser(
      this.user.id,
      fixtures.updateUser
    );
    expect(res.Attributes).to.have.property("full_name");
  });

  it("should not udpate an invalid user", async () => {
    const serviceInstance = new UserService();

    const res = await serviceInstance.updateUser(
      "asd3142345",
      fixtures.updateUser
    );
    expect(res)
      .to.have.property("statusCode")
      .to.be.equal(400);
  });

  it("should delete an user", async () => {
    const serviceInstance = new UserService();

    const res = await serviceInstance.deleteUser(this.user.id);
    expect(res).to.be.empty;
  });
});
