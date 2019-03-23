---
layout: post
title: Nodejs import후 export하기
categories: [JavaScript]
tags: [nodejs, es6]
comments: true
---

Node.js를 사용할 때, 특정 모듈을 import한 그대로 export하고 싶은 경우 다음과 같이 사용할 수 있다.

{% highlight javascript %}
export { default as exportName } from './component';
export { importName as exportName } './component';
export { importAndExportName } './component';
{% endhighlight %}