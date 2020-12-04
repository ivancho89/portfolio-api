const defer = require("config/defer").deferConfig;

if(!process.env.ENVIRONMENT)
	require('dotenv').config()

module.exports = {
	port: process.env.GLOBAL_PORT || 3004,
	env : process.env.ENVIRONMENT || 'local',
	logs:false,
	aws:{
		access_key: process.env.ACCESS_KEY,
		secret_key: process.env.SECRET_KEY
	},
	twitter:{
		 consumer_key: process.env.TWITTER_CONSUMER_KEY,
     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
     access_token_key: process.env.TWITTER_ACCESS_KEY,
     access_token_secret: process.env.TWITTER_ACCESS_SECRET
	}
}