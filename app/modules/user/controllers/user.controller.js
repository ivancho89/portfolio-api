const fileUtil = rootRequire("lib/utils/files.util");
const i18n = require("i18n");

const UserService = fileUtil.requireService("user");

/**
 * Call service to create an user
 */
exports.createUser = async (req, res) => {
  try {
    const serviceInstance = new UserService();
    const result = await serviceInstance.createUser(req.body);
    res.ok({ data: result });
  } catch (e) {
    console.log(" 1 ");
    res.badRequest(e);
  }
};
/**
 * Call service to list all users
 */

exports.listUsers = async (req, res) => {
  try {
    const serviceInstance = new UserService();
    const result = await serviceInstance.listUsers();
    res.ok(result);
  } catch (e) {
    res.badRequest(e);
  }
};
/**
 * Call service to update an user
 */
exports.updateUser = async (req, res) => {
  try {
    const serviceInstance = new UserService();
    const userId = req.params.userId || "";

    const result = await serviceInstance.updateUser(userId, req.body);
    res.ok({ data: result });
  } catch (e) {
    res.badRequest(e);
  }
};
