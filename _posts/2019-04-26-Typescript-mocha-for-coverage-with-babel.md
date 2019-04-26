---
layout: post
title: Babel을 이용한 Typescript환경에서 mocha coverage사용하기
categories: [Nodejs]
tags: [mocha, typescript, nyc, coverage]
comments: true
---

Babel을 이용하여 Typescript를 사용하게 될 경우 mocha를 사용하기 위해서는 babel-register를 사용해야 한다.

`mocha.init.js`와 같이 파일을 만들어준다.

{% highlight javascript %}
require('@babel/register')({ extensions: ['.ts', '.tsx'] });
{% endhighlight %}

babel **7**버전 이상의 경우 `@bable/register`를 그 이전의 버전은 `babel-register`를 사용하면 된다.

위와 같이 적용하면 `.babelrc`파일을 적용시킬 수 있다. `babel-preset-typescript`를 사용하여 typescript를 사용한다.

mocha의 coverage를 사용하기 위해서 [nyc](https://istanbul.js.org/)라는 라이브러리를 사용한다. 이를 사용하기 위해서 `.nycrc`파일을 생성한다.

{% highlight JSON %}
{
  "include": ["src/**/*.ts"],
  "extension": [".ts"],
  "exclude": ["src/**/*.d.ts", "src/tests/**/*"],
  "reporter": ["lcov", "text"],
  "all": true
}
{% endhighlight %}

다음과 같은 설정처럼 사용할 수 있다. `extension`옵션을 통하여 typescript파일을 허용하면 mocha를 이용하여 `coverage`를 측정할 수 있다.

그 후 다음과 같은 명령어를 사용하면 coverage가 측정된다.

``
$ nyc mocha -r ./mocha.init.js ./src/tests/**/*.spec.ts
``