const { v4: uuidv4 } = require("uuid");

module.exports = class User {
  constructor(dbInstance) {
    this.dbInstance = dbInstance;

    this.defaultItem = {
      TableName: "users"
    };
  }

  set internalUserId(id) {
    this.id = id;
  }

  async create(params) {
    try {
      const usersCheckQuery = { ...this.defaultItem };
      usersCheckQuery.FilterExpression = "twitter_username = :tw";
      usersCheckQuery.ExpressionAttributeValues = {
        ":tw": params.twitter_username
      };

      const { Items } = await this.dbInstance.scan(usersCheckQuery).promise();

      if (Items.length <= 0) {
        this.defaultItem.Item = params;
        this.defaultItem.Item.id = uuidv4();

        const res = await this.dbInstance.put(this.defaultItem).promise();
        return this.defaultItem.Item;
      } else {
        return `User with Twitter @${params.twitter_username} already exist!`;
      }
    } catch (err) {
      return err;
    }
  }

  async listAll() {
    try {
      const { Items } = await this.dbInstance.scan(this.defaultItem).promise();
      return Items;
    } catch (err) {
      return err;
    }
  }

  async update(params) {
    try {
      const updateKeys = Object.keys(params);
      const updateExpressionAttr = {};
      const updateExpression = [];

      updateKeys.forEach(key => {
        updateExpression.push(`${key} = :${key}`);
        updateExpressionAttr[`:${key}`] = params[key];
      });

      this.defaultItem.Key = { id: this.id };
      this.defaultItem.UpdateExpression = `set ${updateExpression.join(", ")}`;
      this.defaultItem.ConditionExpression = "attribute_exists(id)";
      this.defaultItem.ExpressionAttributeValues = updateExpressionAttr;
      this.defaultItem.ReturnValues = "ALL_NEW";

      const res = await this.dbInstance.update(this.defaultItem).promise();

      return res;
    } catch (err) {
      return err;
    }
  }

  async delete() {
    try {
      this.defaultItem.Key = { id: this.id };
      const res = await this.dbInstance.delete(this.defaultItem).promise();
      return res;
    } catch (err) {
      return err;
    }
  }
};
