---
layout: post
title: Kernel get_current
categories: [Kernel]
tags: [Kernel]
comments: true
---

<http://lxr.free-electrons.com/ident?i=get_current>
 
{% highlight c %}
#include <asm/current.h>
{% endhighlight %}

위의 헤더 파일을 포함하여야 사용할 수 있다. 

{% highlight c %}
static __always_inline struct task_struct *get_current(void)
{
    return percpu_read_stable(current_task);
}
{% endhighlight %}