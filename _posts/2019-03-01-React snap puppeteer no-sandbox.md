---
layout: post
title: React snap puppeteer no-sandbox
categories: [React]
tags: [React, build]
comments: true
---

React snap을 사용할 때, 리눅스에서 puppeteer에서 에러가 발생하는 경우가 있습니다. no-sandbox를 옵션으로 주어야 하기 때문에 발생하는데, 이를 `pacakge.json`에 옵션으로 주게되면 해결하였습니다.

먼저, `react-snap`을 실행하면 수행하는 스크립트를 알아보겠습니다. **./node_modules/react-snap/package.json**을 보면 다음과 같이 스크립트가 있습니다.

{% highlight JSON %}
"bin": {
  "react-snap": "./run.js"
}
{% endhighlight %}

이제 이 파일을 보게되면, 

{% highlight javascript linenos %}
#!/usr/bin/env node

const url = require("url");
const { run } = require("./index.js");
const {
  reactSnap,
  homepage,
  devDependencies,
  dependencies
} = require(`${process.cwd()}/package.json`);

const publicUrl = process.env.PUBLIC_URL || homepage;

const reactScriptsVersion = parseInt(
  (devDependencies && devDependencies["react-scripts"]) 
  || (dependencies && dependencies["react-scripts"])
);
let fixWebpackChunksIssue;
switch (reactScriptsVersion) {
  case 1:
    fixWebpackChunksIssue = "CRA1";
    break;
  case 2:
    fixWebpackChunksIssue = "CRA2";
    break;
}

run({
  publicPath: publicUrl ? url.parse(publicUrl).pathname : "/",
  fixWebpackChunksIssue,
  ...reactSnap
}).catch(error => {
  console.error(error);
  process.exit(1);
});
{% endhighlight %}

와 같이 작성되어있습니다. `package.json`에서 **reactSnap**설정을 불러오고, 이를 run함수의 인자로 넘겨주게 됩니다. `index.js`를 보면 다음과 같은 부분이 있습니다.

{% highlight javascript linenos %}
const crawl = require("./src/puppeteer_utils.js").crawl;

...

const run = async (userOptions, { fs } = { fs: nativeFs }) => {
  let options;
  try {
    options = defaults(userOptions);
  } catch (e) {
    return Promise.reject(e.message);
  }

  ...
  
  await crawl({
    options,
    ...
{% endhighlight %}

마지막으로 **crawl**함수를 보겠습니다. 이 파일은 `./src/puppeteer_utils.js`에 있습니다.


{% highlight javascript linenos %}
const crawl = async opt => {
  const {
    options,
    basePath,
    beforeFetch,
    afterFetch,
    onEnd,
    publicPath,
    sourceDir
  } = opt;
  
  ...

  const browser = await puppeteer.launch({
    headless: options.headless,
    args: options.puppeteerArgs,
    executablePath: options.puppeteerExecutablePath,
    ignoreHTTPSErrors: options.puppeteerIgnoreHTTPSErrors,
    handleSIGINT: false
  });
{% endhighlight %}

위와 같이 작성이 되어있는데, 에러 메세지에서 참고하라고 나온 [공식 문서](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md)를 살펴보면 다음과 같은 부분이 있습니다.

{% highlight javascript %}
const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
{% endhighlight %}

이 부분처럼, **args**에 `--no-sandbox`옵션을 주면 해결할 수 있습니다. 최종적으로 `package.json`에 다음과 같이 추가해주면 됩니다.

{% highlight JSON %}
"reactSnap": {
  ...
  "puppeteerArgs": [
    "--no-sandbox"
  ]
}
{% endhighlight %}