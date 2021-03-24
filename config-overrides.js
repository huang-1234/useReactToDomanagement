/*
 * @Author: your name
 * @Date: 2021-02-04 16:30:26
 * @LastEditTime: 2021-02-04 16:30:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Goods-Manage-s\sgg-goods-manage\config-overrides.js
 */
const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  // 针对antd实现按需打包: 根据import来打包(使用babel-plugin-import)
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true, // 自动打包相关的样式
  }),

  // 使用less-loader对源码中的less的变量进行重新指定
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" },
  })
);
