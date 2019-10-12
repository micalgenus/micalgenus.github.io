---
title: Kernel get_current
categories: [Kernel]
tags: [Kernel]
path: '/articles/2017-02/Kernel-get-current'
date: '2017-02-17T06:00:00.000Z'
comments: true
---

<http://lxr.free-electrons.com/ident?i=get_current>

```c
#include <asm/current.h>
```

위의 헤더 파일을 포함하여야 사용할 수 있다.

```c
static __always_inline struct task_struct *get_current(void)
{
    return percpu_read_stable(current_task);
}
```
