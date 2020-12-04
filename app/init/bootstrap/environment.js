/* eslint no-param-reassign: 0 */
module.exports = App => {

  const env = App.config.env;

  App.env = {
    getEnv() {
      return env;
    },
    isLocal(){
      return env === "local";
    },
    isDev(){
       return env === "development";
    },
    isProd() {
      return env === "production";
    },
    isTest() {
      return env === "test";
    }
  };
};
