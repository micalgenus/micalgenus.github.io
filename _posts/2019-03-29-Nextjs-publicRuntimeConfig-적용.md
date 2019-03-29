---
layout: post
title: Nextjs publicRuntimeConfig 적용
categories: [React]
tags: [React, Next.js]
comments: true
---

Next.js를 사용하면서 브라우저에서 **.env** 설정을 받아들이지 못하는 문제가 있었습니다. 이를 `publicRuntimeConfig`설정을 이용하여 해결할 수 있습니다.

`next.config.js`에 다음과 같이 추가하여 사용할 수 있습니다.

{% highlight javascript %}
module.exports = {
  publicRuntimeConfig: { test: 'test' },
  ...withScss({}),
};
{% endhighlight %}

주의해야 할 부분은, 기존 미들웨어를 이용하고 있을 경우에 값을 인자로 주지 않고 함께 사용해야 합니다. 

다음과 같이 사용하면 작동을 하지 않습니다.

{% highlight javascript %}
module.exports = withScss({publicRuntimeConfig: { test: 'test' }});
{% endhighlight %}

여기서 `.env`설정에 관한 부분은 추가적으로 해주어야 하기 때문에 [node-runtime-config](https://www.npmjs.com/package/next-runtime-dotenv)를 사용하여 편리하게 구성할 수 있습니다.