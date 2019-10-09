---
layout: post
title: Create React App Jest error over nodejs 11.11
categories: [React]
tags: [React, Jest, nodejs]
comments: true
---

현재 Create React App(v2.1.8이하)을 사용할 경우 Jest에서 다음과 같은 에러가 발생한다. [이슈](https://github.com/facebook/create-react-app/issues/6591)

{% highlight bash %}
$ CI=true yarn test
yarn run v1.13.0
$ react-scripts test
FAIL src/App.test.js
  ● Test suite failed to run

    TypeError: Cannot assign to read only property 'Symbol(Symbol.toStringTag)' of object '#<process>'

      at exports.default (node_modules/jest-util/build/create_process_object.js:15:34)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        3.291s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
{% endhighlight %}

이 에러를 따라가보면 Jest에서 [다음](https://github.com/facebook/jest/pull/8050)과 같이 해결하였다.

우선 아래의 구문이 문제를 발생시킨다.

{% highlight javascript %}
newProcess[Symbol.toStringTag] = 'process';
{% endhighlight %}

그렇기에 이를 다음과 같이 패치하였다.

{% highlight javascript %}
try {
  // This fails on Node 12, but it's already set to 'process'
  newProcess[Symbol.toStringTag] = 'process';
} catch (e) {
  // Make sure it's actually set instead of potentially ignoring errors
  if (newProcess[Symbol.toStringTag] !== 'process') {
    e.message =
      'Unable to set toStringTag on process. Please open up an issue at https://github.com/facebook/jest\n\n' +
      e.message;

    throw e;
  }
}
{% endhighlight %}

이 문제가 발생한 이유를 살펴보면 **node.js**에서 `11.11`로 업데이트 할 때 다음과 같은 부분이 [추가](https://github.com/nodejs/node/commit/ccaebdef66f62775ff8cc5d6fa21881a883c08fc#diff-362950ada44657730d806a6908957c35)되었다.

{% highlight javascript %}
Object.defineProperty(process, Symbol.toStringTag, {
  enumerable: false,
  writable: false,
  configurable: false,
  value: 'process'
});
{% endhighlight %}

해당 부분을 보게되면, **process**객체에 `Symbol.toStringTag`멤버를 `writable: false`하게 정의하였기 때문에, Jest에서 문제가 발생하였다.

그렇기에 [Jest v24.2.0-alpha.0](https://github.com/facebook/jest/commit/800f2f803d01c8ae194d71b251e4965dd70e5bf2)에서 패치가 되어 정상적으로 작동한다.

하지만, 현재 **create-react-app**의 경우는 **jest**를 `23.6.0`을 사용하기 때문에 문제가 해결되지 않고 있다. 이를 해결할 [PR](https://github.com/facebook/create-react-app/pull/6278)이 있지만 아직 받아들여지지 않았다.

**create-react-app**을 사용하지 않을 경우에는, **jest**의 버전을 `v24.2.0-alpha.0`이후 버전으로 업데이트하면 문제를 해결할 수 있다.


---
### 2019.04.26 추가

Nodejs를 11.12버전에서 다음 문제를 해결하였다. **readonly**속성이였던 `Symbol.toStringTag`멤버가 **writeable**하게 변경되면서 CRA버전에 상관없이 문제가 발생하지 않는다.