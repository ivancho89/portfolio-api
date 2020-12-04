const fileUtil = rootRequire("lib/utils/files.util");

const userController = fileUtil.requireController("user");

module.exports = {
  routes: [
    /*
     * Entity
     */

    ["users"],

    /**
     * @api {post} /users
     *
     *
     * @apiName Create User
     * @apiGroup User
     *
     * @apiDescription create a new user
     *
     * @apiParam {String} full_name  user's full name
     * @apiParam {String} image_url	 user's image url (after load the image un s3 bucket)
     * @apiParam {String} description user's work description or general description to display
     * @apiParam {String} twitter_username user's twitter user name to get timeline
     *
     * @apiParamExample {json} Request-Example:
     *
     * {
     * 	"full_name":"Jhon Doe"
     * 	"image_url": ""
     * 	"description" :"My description"
     * 	"twitter_username": "my_username"
     * }
     *
     * @apiSuccessExample {json} Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *   "code": 200,
     *   "userMessage":"",
     *   "serverInfo": "",
     *   "data":{}
     *  }
     *
     * @apiErrorExample {json} Error-Response:
     *  HTTP/1.1 400 Bad Request
     *  {
     *   "code": 400,
     *   "userMessage": "Oops! Seems something went wrong with the request, try again later.",
     *   "serverInfo": "",
     *   "data": []
     *  }
     */
    ["post", "", userController.createUser],

    /**
     * @api {get} /users
     *
     *
     * @apiName Get Users
     * @apiGroup User
     *
     * @apiDescription list users in the db
     *
     * @apiParamExample {json} Request-Example:
     *
     * /users
     *
     * @apiSuccessExample {json} Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *   "code": 200,
     *   "userMessage":"",
     *   "serverInfo": "",
     *   "data":{}
     *  }
     *
     * @apiErrorExample {json} Error-Response:
     *  HTTP/1.1 400 Bad Request
     *  {
     *   "code": 400,
     *   "userMessage": "Oops! Seems something went wrong with the request, try again later.",
     *   "serverInfo": "",
     *   "data": []
     *  }
     */
    ["get", "", userController.listUsers],

    /**
     * @api {patch} /users/:userId
     *
     *
     * @apiName Update User
     * @apiGroup User
     *
     * @apiDescription update an existing user
     *
     * @apiParam {String} userId user's id
     *
     * @apiParamExample {json} Request-Example:
     *
     * /users/asd123-123asd
     *
     * {
     * 	"full_name": "new update"
     * }
     *
     * @apiSuccessExample {json} Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *   "code": 200,
     *   "userMessage":"",
     *   "serverInfo": "",
     *   "data":{}
     *  }
     *
     * @apiErrorExample {json} Error-Response:
     *  HTTP/1.1 400 Bad Request
     *  {
     *   "code": 400,
     *   "userMessage": "Oops! Seems something went wrong with the request, try again later.",
     *   "serverInfo": "",
     *   "data": []
     *  }
     */
    ["patch", ":userId", userController.updateUser]
  ]
};
