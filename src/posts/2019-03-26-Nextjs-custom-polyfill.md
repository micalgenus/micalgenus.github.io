---
title: Next.js Custom polyfill 적용하기
categories: [React]
tags: [React, Next.js]
path: '/articles/2019-03/Nextjs-custom-polyfill'
date: '2019-03-26T00:00:00.000Z'
comments: true
---

React프레임워크인 Next.js에서 polyfill을 적용할 때, webpack의 설정을 다음과 같이 추가하면 된다.

> next.config.js

```javascript
module.exports = {
  webpack: config => {
    // Unshift polyfills in main entrypoint.
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      if (entries['main.js']) entries['main.js'].unshift('./polyfills.js');

      return entries;
    };

    return config;
  },
};
```

위와 같이 추가한 후, **.babelrc**의 `next/babel`프리셋중 **useBuiltIns**를 **"entry"**로 변경해준다.

> .babelrc

```JSON
{
  "presets": [
    [
      "next/babel",
      {
        "preset-env":
        {
          "useBuiltIns": "entry"
        }
      }
    ]
  ]
}
```

마지막으로 `polyfill.js`파일을 만들어 하고자 하는 polyfill 설정을 적용하면 된다.

참고: [예제](https://github.com/zeit/next.js/issues/2060)
