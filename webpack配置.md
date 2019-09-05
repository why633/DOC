# webpack 学习

## 1.安装
webpack可以不在全局安装，而是安装在项目中。不同项目可能需要的webpack版本不同，局部安装可以避此情况。
```
npm install webpack webpack-cli --save-dev
或
yarn add webpack webpack-cli --dev
```
局部安装时直接执行webpack命令无效，因并未在全局添加webpack，需加npx，如：npx webpack。

## 2.运行
可在根目录添加webpack.config.js来进行webpack的自定义配置；如不添加配置文件，webpack执行自带默认配置。
```
# package.json文件script项中配置 "build": "webpack"
npm run build 打包编译
```

## 3.配置webpack

<pre>
  module.exports = {
    mode: 'production', // production：默认，生产环境，代码被压缩；development：开发环境，代码不压缩
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
</pre>

## （1）entry入口文件
可以这样写，配置多个入口文件。
<pre>
  entry: {
    main: './src/index.js',
    sub: './src/sub.js'
  }
</pre>

## （2）output配置输出文件
<pre>
  output: {
    filename: 'mbundle.js', // 打包后文件名
    path: path.resolve(__dirname, 'dist') 打包路径（无该文件夹会新建）
  }
</pre>

## （3） plugin
webpack运行到某一时刻是做一些事情

### <u>html-webpack-plugin</u>
打包后自动生成html文件，并引入打包后的js

<pre>
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [new HtmlWebpackPlugin()]
  }
</pre>

可以设置生成模板格式
<pre>
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  })]
</pre>

### <u>clean-webpack-plugin</u>
打包前清空目标文件夹
<pre>
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CleanWebpackPlugin = require('clean-webpack-plugin')

  module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new CleanWebpackPlugin()
    ]
  }
</pre>