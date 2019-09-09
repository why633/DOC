# 自己动手搭建cli
本文章说的是如何搭建一个类似于 vue-cli、create-react-app  这样的脚手架，帮助了解脚手架的原理。
## 一、准备
### 1.新建目录并初始化package.json文件
```bash
  npm init
```
根据提示填写初始化信息

### 2.项目中新建bin文件夹并在文件夹中新建js文件
在package.json中提供一个bin字段并指向我们的bin文件夹下这样通过npm就可以实现指令的软链了。
```json
"bin": {
  "mycli": "bin/mycli.js"
}
```
我们需要在mycli.js头部添加一行注释，作用是"指定由哪个解释器来执行脚本"
```js
#!/usr/bin/env node
```

### 3.全局安装命令
```bash
npm install -g
```
安装命令后我们就可以直接在本地使用mycli这个指令了

### 4.安装相关依赖库
```json
"dependencies": {
  "chalk": "^2.4.2",
  "inquirer": "^7.0.0",
  "mem-fs": "^1.1.3",
  "mem-fs-editor": "^6.0.0"
}
```

## 二、基本模版
初始化项目后项目结构的模板
```bash
tempalte
  build
    build.js
  page
    index.html
  src
    index.js
  package.json
```

## 三、逻辑代码
其实核心逻辑很简单，就是通过控制台获取到用户的一些自定义选项，然后根据选项去从本地或者远程仓库拿到我们提前准备好的模版（该项目以获取本地模板为例），将配置写入模版并最后拷贝模版到本地就行了。

在src下新增creator.js文件，这个文件导出一个Creator类。在这个类中现在仅需要三个简单的方法:init用于初始化、ask用于和命令行交互获取用户选择输入的数据、write用于调用模版的构建方法去执行拷贝文件写数据的任务。
```js
class Creator {
  constructor() {
    // 存储命令行获取的数据，作为demo这里只要这两个；
    this.options = {
      name: '',
      description: '',
    };
  }
  // 初始化；
  init() {}
  // 和命令行交互；
  ask() {}
  // 拷贝&写数据；
  write() {}
}

module.exports = Creator;
```

先去完善init方法，这个方法里我们仅需要调用ask方法和命令行交互并做一些提示即可 引入chalk库丰富命令行交互
```js
const chalk = require('chalk');
class Creator {
  constructor() {
    // 存储命令行获取的数据，作为demo这里只要这两个；
    this.options = {
      name: '',
      description: '',
    };
  }
  // 初始化；
  init() {
    console.log(chalk.green('my cli 开始'));
    console.log();
    this.ask();
  }
  // 和命令行交互；
  ask() {}
  // 拷贝&写数据；
  write() {}
}

module.exports = Creator;
```

接下来是ask方法，在这个方法中，我们需要根据提示引导用户输入问题并获取用户的输入，这里用到inquirer这个库来和命令行交互。

```js
const chalk = require('chalk');
const inquirer = require('inquirer');
class Creator {
  constructor() {
    // 存储命令行获取的数据，作为demo这里只要这两个；
    this.options = {
      name: '',
      description: '',
    };
  }
  // 初始化；
  init() {
    console.log(chalk.green('my cli 开始'));
    console.log();
    this.ask();
  }
  // 和命令行交互；
  ask() {
    // 问题
    const prompt = [];

    prompt.push({
      type: 'input',
      name: 'name',
      message: '请输入项目名称',
      validate(input) {
        if (!input) {
          return '请输入项目名称!';
        }

        if (fs.existsSync(input)) {
          return '项目名已重复!'
        }

        return true;
      }
    });

    prompt.push({
      type: 'input',
      name: 'description',
      message: '请输入项目描述',
    });

    // 返回promise
    return inquirer.prompt(prompt);
  }
  // 拷贝&写数据；
  write() {}
}

module.exports = Creator;
```

修改刚才的init方法，将ask方法改为Promise调用。
```js
const chalk = require('chalk');
const inquirer = require('inquirer');
class Creator {
  constructor() {
    // 存储命令行获取的数据，作为demo这里只要这两个；
    this.options = {
      name: '',
      description: '',
    };
  }
  // 初始化；
  init() {
    console.log(chalk.green('my cli 开始'));
    console.log();
    this.ask().then((answers) => {
      this.options = Object.assign({}, this.options, answers);
      console.log(this.options);
    });
  }
  // 和命令行交互；
  ask() {
    // 问题
    const prompt = [];

    prompt.push({
      type: 'input',
      name: 'name',
      message: '请输入项目名称',
      validate(input) {
        if (!input) {
          return '请输入项目名称!';
        }

        if (fs.existsSync(input)) {
          return '项目名已重复!'
        }

        return true;
      }
    });

    prompt.push({
      type: 'input',
      name: 'description',
      message: '请输入项目描述',
    });

    // 返回promise
    return inquirer.prompt(prompt);
  }
  // 拷贝&写数据；
  write() {}
}

module.exports = Creator;
```

修改bin/mycli文件

```js
#!/usr/bin/env node

const Creator = require('../src/creator.js');

const project = new Creator();

project.init();
```

在和用户交互完毕并获取到数据后，我们要做的就是去调用write方法执行拷贝构建了。考虑到日后可能增加很多的模版目录，不妨我们将每一类的模版拷贝构建工作放到模版中的脚本去做，从而增大可扩展性，新增template/index.js文件。

接下来首先根据项目目录结构创建文件夹(注意区分项目的执行目录和项目目录的关系)。

顶部引入相关库

```js
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
```

```js
module.exports = function(creator, options, callback) {
  const { name, description } = options;

  // 获取当前命令的执行目录，注意和项目目录区分
  const cwd = process.cwd();
  
  const projectPath = path.join(cwd, name);
  const buildPath = path.join(projectPath, 'build');
  const pagePath = path.join(projectPath, 'page');
  const srcPath = path.join(projectPath, 'src');

  // 新建项目目录
  // 同步创建目录，以免文件目录不对齐
  fs.mkdirSync(projectPath);
  fs.mkdirSync(buildPath);
  fs.mkdirSync(pagePath);
  fs.mkdirSync(srcPath);

  callback();
}

```

回到creator.js文件，在Creator中的write调用这个方法。
```js
init() {
  console.log(chalk.green('my cli 开始'));
  console.log();
  this.ask().then((answers) => {
    this.options = Object.assign({}, this.options, answers);

    this.write();
  });
}


write() {
  console.log(chalk.green('my cli 构建开始'));
  const tplBuilder = require('../template/index.js');
  tplBuilder(this, this.options, () => {
    console.log(chalk.green('my cli 构建完成'));
    console.log();
    console.log(chalk.grey(`开始项目:  cd ${this.options.name } && npm install`));
  });
}
```

在开启文件拷贝写数据之前，我们需要用到两个库mem-fs和mem-fs-editor，前者可以帮助我们在内存中创建一个临时的文件store，后者可以通过ejs的语法去编辑我们的文件。

现在在constructor中初始化store。

在Class外部引入库及path变量
```js
const memFs = require('mem-fs');
const memFsEditor = require('mem-fs-editor');
const path = require('path');
```

```js
constructor() {
  // 创建内存store
  const store = memFs.create();
  this.fs = memFsEditor.create(store);

  this.options = {
    name: '',
    description: '',
  };

  // 当前根目录
  this.rootPath = path.resolve(__dirname, '../');
  // 模版目录
  this.tplDirPath = path.join(this.rootPath, 'template');
}

```

接下来在Creator中增加两个方法copy和copyTpl分别用于直接拷贝文件和拷贝文件并注入数据。

```js
getTplPath(file) {
  return path.join(this.tplDirPath, file);
}

copyTpl(file, to, data = {}) {
  const tplPath = this.getTplPath(file);
  this.fs.copyTpl(tplPath, to, data);
}

copy(file, to) {
  const tplPath = this.getTplPath(file);
  this.fs.copy(tplPath, to);
}

```

然后我们根据ejs的语法修改模版中的package.json文件以实现数据注入的功能

```json
{
  "name": "<%= name %>",
  "version": "1.0.0",
  "description": "<%= description %>",
  "main": "index.js",
  "scripts": {},
  "author": "",
  "license": "ISC"
}

```

回到template/index.js中，对模版中的文件进行相应的拷贝和数据注入操作，最后打印一些可视化的信息。


```js
module.exports = function(creator, options, callback) {
  const { name, description } = options;

  // 获取当前命令的执行目录，注意和项目目录区分
  const cwd = process.cwd();
  // 项目目录
  const projectPath = path.join(cwd, name);
  const buildPath = path.join(projectPath, 'build');
  const pagePath = path.join(projectPath, 'page');
  const srcPath = path.join(projectPath, 'src');

  // 新建项目目录
  // 同步创建目录，以免文件目录不对齐
  fs.mkdirSync(projectPath);
  fs.mkdirSync(buildPath);
  fs.mkdirSync(pagePath);
  fs.mkdirSync(srcPath);

  creator.copyTpl('packagejson', path.join(projectPath, 'package.json'), {
    name,
    description,
  });

  creator.copy('build/build.js', path.join(buildPath, 'build.js'));

  creator.copy('page/index.html', path.join(pagePath, 'index.html'));

  creator.copy('src/index.js', path.join(srcPath, 'index.js'));

  creator.fs.commit(() => {
    console.log();
    console.log(`${chalk.grey(`创建项目: ${name}`)} ${chalk.green('✔ ')}`);
    console.log(`${chalk.grey(`创建目录: ${name}/build`)} ${chalk.green('✔ ')}`);
    console.log(`${chalk.grey(`创建目录: ${name}/page`)} ${chalk.green('✔ ')}`);
    console.log(`${chalk.grey(`创建目录: ${name}/src`)} ${chalk.green('✔ ')}`);
    console.log(`${chalk.grey(`创建文件: ${name}/build/build.js`)} ${chalk.green('✔ ')}`);
    console.log(`${chalk.grey(`创建文件: ${name}/page/index.html`)} ${chalk.green('✔ ')}`);
    console.log(`${chalk.grey(`创建文件: ${name}/src/index.js`)} ${chalk.green('✔ ')}`);

    callback();
  });
}

```

这时便可以执行mycli创建项目了