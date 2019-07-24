const {
    override,
    fixBabelImports,
    addDecoratorsLegacy,
    addLessLoader
    } = require("customize-cra");

module.exports = override(
    addDecoratorsLegacy(),
    addLessLoader(),
    fixBabelImports("babel-plugin-import", {
      libraryName: "antd-mobile",
      style: "css"
    })
);