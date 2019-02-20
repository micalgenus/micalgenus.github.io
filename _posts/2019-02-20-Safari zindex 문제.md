---
layout: post
title: Safari zindex 문제
categories: [Web]
comments: true
---

Safari에서 `z-index`효과가 적용되지 않을 때가 있다.

검색해보면 오래전부터 있던 버그같은데, `-webkit-transform: translate3d(0,0,0);` 옵션을 사용하여 해결할 수 있다.

translate3d(x,y,`z`);에서 z부분을 `z-index`대신 사용하여 해결한다.


{% highlight html %}
<style>
  #under {
    z-index: 1;
    -webkit-transform: translate3d(0,0,1px);
    width: 50px;
    height: 50px;
    display: block;
    background-color: red;
  }

  #upper {
    z-index: 2;
    -webkit-transform: translate3d(0,0,2px);
    width: 25px;
    height: 25px;
    display: block;
    background-color: blue;
  }
</style>

<div>
  <div id="under" />
  <div id="upper" />
</div>
{% endhighlight %}