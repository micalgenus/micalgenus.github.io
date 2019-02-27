---
layout: post
title: React snapshot
categories: [React]
comments: true
---

React를 사용해서 배포를 할 경우 SSR(Server Side Rendering)을 해줘야 검색엔진에서 제대로 수집 할 수 있습니다.

구글의 경우는 JS를 실행시키기 때문에 큰 문제가 발생하지 않지만, 특정 검색엔진은 초기 페이지만 가지고 수집을 하기 때문에 큰 문제가 발생할 수 있습니다.

이를 해결하기 위해서 SSR을 추가로 구성하는데, 정적인 페이지의 경우는 SSR을 사용하고 미리 빌드를 하는 벙법이 있습니다.

빌드를 하는 과정에서 특정 페이지별로 스냅샷을 찍어 미리 만들어 제공해주면 됩니다.

[react-snap](https://github.com/stereobooster/react-snap)을 사용하여 구성을 해보겠습니다.

우선 설치를 해줍니다.

{% highlight bash %}
yarn add --dev react-snap
{% endhighlight %}

그 후, `package.json`에 설정을 추가해 줍니다.

{% highlight json linenos %}
"scripts": {
  "postbuild": "react-snap"
}
{% endhighlight %}

마지막으로 `src/index.js`에서 **ReactDOM.render(<App />, document.getElementById('root'));**를 변경해 줍니다.

{% highlight javascript linenos %}
const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  ReactDOM.render(<App />, rootElement);
}
{% endhighlight %}

기본적인 설정이 끝났으므로, 이제 빌드를 진행하게 되면 페이지가 생기게 됩니다.

싱글 페이지의 경우 `index.html`과 `200.html`이 생기게 되고, 주소가 여러개일 경우 `404.html`이 추가됩니다.

**Router**를 사용하여 여러 페이지를 구현했어도, 주소를 입력해주지 않으면 자동으로 빌드를 하지 않기 때문에 `package.json`에 직접 추가해 줘야 합니다.

{% highlight json linenos %}
"reactSnap": {
  "include": [
    "/",
    "/page1"
  ]
}
{% endhighlight %}

위와 같이 직접 URL을 입력해주어야 하기 때문에, 동적으로 변경되는 페이지에서는 SSR을 사용해야 합니다.

하지만, 블로그와 같이 자주 변경되지 않고 직접 입력해줄 수 있으면 편하게 snapshot을 이용하여 해결할 수 있습니다.

`react-snap`의 더 자세한 설명은 [다음](https://github.com/stereobooster/react-snap/blob/master/doc/behind-the-scenes.md)을 참고해주세요.
