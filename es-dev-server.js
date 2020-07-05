const omtPlugin = require("omt-server-plugin");
 
module.exports = {
  nodeResolve: {
    browser: true,
  },
  plugins: [omtPlugin()],
};