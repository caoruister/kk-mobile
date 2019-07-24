const {
    override,
    fixBabelImports,
    addDecoratorsLegacy,
    addLessLoader
    } = require("customize-cra");

module.exports = override(
    addDecoratorsLegacy(),
    addLessLoader({
        javascriptEnabled: true
    }),
    fixBabelImports("import", {
      libraryName: "antd-mobile",
      style: true
    })
);