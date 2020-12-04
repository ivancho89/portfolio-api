const config = require("config");
const i18n = require("i18n");
const moment = require("moment");
const Twitter = require("twitter");

const { v4: uuidv4 } = require("uuid");

const fileUtil = rootRequire("lib/utils/files.util");
const baseService = fileUtil.requireBase("service");

const UserEntity = fileUtil.requireModel("user", "user.entity");

/**
 *
 */
module.exports = class userModuleService extends baseService {
  constructor() {
    super();

    const dynamodb = new app.dynamodb();
    this.userEntityInstance = new UserEntity(dynamodb.instance);
  }

  async createUser(params) {
    try {
      const newUser = await this.userEntityInstance.create(params);
      return newUser;
    } catch (err) {
      return err;
    }
  }

  async listUsers() {
    let users = [];

    try {
      var twitterClient = new Twitter({
        consumer_key: config.twitter.consumer_key,
        consumer_secret: config.twitter.consumer_secret,
        access_token_key: config.twitter.access_token_key,
        access_token_secret: config.twitter.access_token_secret
      });

      users = await this.userEntityInstance.listAll();

      users = await Promise.all(
        users.map(async user => {
          const options = { screen_name: user.twitter_username, count: 6 };

          const tweets = await twitterClient.get(
            "statuses/user_timeline",
            options
          );

          const tweetsList = tweets.map(tweet => {
            return {
              date: moment(new Date(tweet.created_at)).format("ddd, MMM Do hA"),
              body: tweet.text,
              url: tweet.source
            };
          });

          user.tweets = tweetsList;

          return user;
        })
      );
    } catch (err) {
      //Console error to report later in sentry or oder report system
      console.log(" listUsers ERR :: ", err);
    }

    return users;
  }

  async updateUser(userId = "", params) {
    try {
      this.userEntityInstance.internalUserId = userId;
      const user = await this.userEntityInstance.update(params);
      return user;
    } catch (err) {
      return err;
    }
  }

  async deleteUser(userId = "") {
    try {
      this.userEntityInstance.internalUserId = userId;
      const user = await this.userEntityInstance.delete();
      return user;
    } catch (err) {
      return err;
    }
  }
};
