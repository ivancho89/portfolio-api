const config = require('config')
const AWS = require("aws-sdk");

class DbInstance {
	constructor() {
	    AWS.config.update({
	      accessKeyId: config.aws.access_key,
	      secretAccessKey: config.aws.secret_key,
	      region: "us-east-2"
	    });

	    this.dbInstance = new AWS.DynamoDB.DocumentClient();
	}

	get instance(){
		return this.dbInstance
	}

}

module.exports = App => {
	App.dynamodb = DbInstance
}
