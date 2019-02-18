---
layout: post
title: Kernel kuid_t
categories: [Kernel]
comments: true
---

<http://lxr.free-electrons.com/ident?i=kuid_t>

{% highlight c %}
#include <linux/uidgid.h>
{% endhighlight %}

위의 헤더파일을 포함하여야 사용할 수 있다.
 
{% highlight c %}
typedef struct {
    uid_t val;
} kuid_t;
{% endhighlight %}