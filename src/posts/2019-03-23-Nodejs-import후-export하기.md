---
title: Nodejs import후 export하기
categories: [JavaScript]
tags: [nodejs, es6]
path: '/articles/2019-03/Nodejs-import후-export하기'
date: '2019-03-23T00:00:00.000Z'
comments: true
---

Node.js를 사용할 때, 특정 모듈을 import한 그대로 export하고 싶은 경우 다음과 같이 사용할 수 있다.

```javascript
export { default as exportName } from './component';
export { importName as exportName } './component';
export { importAndExportName } './component';
```
