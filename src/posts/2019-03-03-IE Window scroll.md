---
layout: post
title: IE Window scroll
categories: [JavaScript]
tags: [JavaScript, IE]
comments: true
---

javascript를 사용하여 웹 개발을 할 때, 브라우저 스크롤이 필요할 때가 있다.

일반적으로 `window.scrollY`를 사용하면 되지만, 우리의 IE는 이를 모르기 때문에 추가적으로 `document.documentElement.scrollTop`를 사용해야 한다.

그렇기에 다음과 같이 사용할 수 있다.

{% highlight javascript %}
const scroll = window.scrollY || document.documentElement.scrollTop;
{% endhighlight %}