---
layout: post
title: CSS scrolling animation
categories: [Web]
tags: [CSS]
comments: true
---

javascript에서 jQuery를 사용하지 않고, `window.scroll`을 사용해 스크롤위치를 변경시킬 때 애니메이션을 추가하고 싶었다.

`scroll-behavior: smooth;`의 경우는 [다음](https://caniuse.com/#feat=css-scroll-behavior)과 같이 지원하지 않는 브라우저가 많았다.

이를 해결할 [smoothscroll-polyfill](https://github.com/iamdustan/smoothscroll)모듈이 있어 이를 사용하기로 했다.

사용법은 다음과 같다.

{% highlight javascript %}
import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();
{% endhighlight %}

사용하기 전에 선언을 해준다.

그 후, 사용할 `window.scroll`을 다음과 같이 수정해준다.

{% highlight javascript %}
window.scroll({ top: 0, left: 0, behavior: 'smooth' });
{% endhighlight %}
