---
layout: post
title: React eject 없이 babelrc 적용
categories: [React]
comments: true
---

CRA으로 프로젝트를 생성한 뒤, .babelrc파일을 생성하여 설정하면 적용이 되지 않습니다.

**./node_modules/react-scripts/config/webpack.config.js**를 살펴보면 다음과 같이 설정되어있습니다.

{% highlight javascript linenos %}
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
    customize: require.resolve(
      'babel-preset-react-app/webpack-overrides'
    ),
    // @remove-on-eject-begin
    babelrc: false,
    configFile: false,
    presets: [require.resolve('babel-preset-react-app')],
    // Make sure we have a unique cache identifier, erring on the
    // side of caution.
    // We remove this when the user ejects because the default
    // is sane and uses Babel options. Instead of options, we use
    // the react-scripts and babel-preset-react-app versions.
    cacheIdentifier: getCacheIdentifier(
      isEnvProduction
        ? 'production'
        : isEnvDevelopment && 'development',
      [
        'babel-plugin-named-asset-import',
        'babel-preset-react-app',
        'react-dev-utils',
        'react-scripts',
      ]
    ),
    // @remove-on-eject-end
    plugins: [
      [
        require.resolve('babel-plugin-named-asset-import'),
        {
          loaderMap: {
            svg: {
              ReactComponent: '@svgr/webpack?-svgo![path]',
            },
          },
        },
      ],
    ],
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
    cacheCompression: isEnvProduction,
    compact: isEnvProduction,
  },
},
{% endhighlight %}

10번줄에 `babelrc: false`에 의해서 .babelrc를 만들어도 적용되지 않습니다.

이를 해결하기 위해 [react-app-rewired](https://github.com/timarney/react-app-rewired)를 사용하겠습니다.

해당 모듈을 사용하기 위해 `pacakge.json`의 스크립트중 `start`, `test`, `build`에 있는 `react-scripts`를 `react-app-rewired`로 변경해 줍니다.

저의 경우는 다음과 같이 변경하였습니다.

```
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  ...
},
```

그 후 `config-overrides.js`에 설정을 재정의 해줍니다. 이 설정을 위해 [customize-cra](https://github.com/arackaf/customize-cra)모듈을 사용하면 편리합니다.

**babelrc**(.babelrc, .babelrc.js)파일을 사용하기 위해서는 `config-overrides.js`에 다음과 같이 추가해주면 됩니다.

{% highlight javascript %}
const { override, useBabelRc } = require("customize-cra");

module.exports = override(useBabelRc());
{% endhighlight %}