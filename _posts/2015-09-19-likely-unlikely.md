---
layout: post
title: likely / unlikely
categories: [Kernel]
comments: true
---

likely와 unlikely는 매크로로 되어있다. 매크로는 `__builtin_expect`로 되어있다.

__builtin_expect는 gcc에게 **최적화를 예측**하여 하도록 하는 키워드라고 한다.

kernel컴파일은 gcc로 하게 되므로 gcc키워드를 사용한다.

{% highlight c %}
# define likely(x)    __builtin_expect(!!(x), 1)
# define unlikely(x)    __builtin_expect(!!(x), 0)
{% endhighlight %}

likely는 들어온 값인 x가 `1`으로 예측하여 최적화를 하라는 의미다.

반대로 unlikely는 들어온 값인 x가 `0`으로 예측하고 최적화를 하게된다.