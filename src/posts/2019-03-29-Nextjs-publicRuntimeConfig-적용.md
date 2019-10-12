---
title: Nextjs publicRuntimeConfig 적용
categories: [React]
tags: [React, Next.js]
path: '/articles/2019-03/Nextjs-publicRuntimeConfig-적용'
date: '2019-03-29T00:00:00.000Z'
comments: true
---

Next.js를 사용하면서 브라우저에서 **.env** 설정을 받아들이지 못하는 문제가 있었습니다. 이를 `publicRuntimeConfig`설정을 이용하여 해결할 수 있습니다.

`next.config.js`에 다음과 같이 추가하여 사용할 수 있습니다.

```javascript
module.exports = withSass({ publicRuntimeConfig: { test: 'test' } });
// or
module.exports = { publicRuntimeConfig: { test: 'test' } };
```

여기서 `.env`설정에 관한 부분은 추가적으로 해주어야 하기 때문에 [node-runtime-config](https://www.npmjs.com/package/next-runtime-dotenv)를 사용하여 편리하게 구성할 수 있습니다.
