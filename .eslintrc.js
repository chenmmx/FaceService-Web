module.exports = {
    // 指定校验的ECMAScript的版本及特性
    "parserOptions": {
      "ecmaVersion": 7, // ECMAScript版本，7为ES7
      "sourceType": "module", //默认script，如果代码是ECMAScript模块，设置为module
      "ecmaFeatures": { // 使用额外的语言特性
          "jsx": true // 启用JSX
      }
    },
    // 当访问未定义的变量时，no-undef 规则将发出警告
    // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量
    "env": {
      "es6": true,
      "node": true,
      "browser": true,
    },
    // 当访问未定义的变量时，no-undef 规则将发出警告
    // 脚本在执行期间访问的额外的全局变量
    "globals": {
      "document": true,
      "navigator": true,
      "window":true,
      "node":true
    },
    "parser": "babel-eslint",
    // 使用第三方airbnb开发配置合集
    "extends": "airbnb",
    // eslint-config-airbnb包括了以下3个插件
    "plugins": [
      "react",
      "jsx-a11y",
      "import"
    ],
    // 定义自己的规则
    "rules": {
      "comma-dangle": ["error", "never"], // 要求或禁止末尾逗号：不允许逗号
      'react/jsx-one-expression-per-line': 'off', // 禁用强制换行
      "no-console": 'off', // 禁用console
      "linebreak-style": [0 ,"error", "windows"], //允许windows开发环境
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/destructuring-assignment": 'off',
      "react/jsx-no-bind": 'off',
      "react/no-array-index-key": 'off',
      "react/forbid-prop-types": 'off',
      "class-methods-use-this": "off",
      "react/prop-types": "off",
      "react/jsx-props-no-spreading": "off",
      "jsx-a11y/click-events-have-key-events":"off",
      "jsx-a11y/no-noninteractive-element-interactions":"off",
      'max-len':'off',
      "no-unused-vars":"warn",
      "import/no-cycle": "off",
      "import/no-unresolved": "off",
      "no-param-reassign": "off",
      "prefer-const": "off"
    }
  };