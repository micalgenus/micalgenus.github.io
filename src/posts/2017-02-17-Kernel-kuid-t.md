---
title: Kernel kuid_t
categories: [Kernel]
tags: [Kernel]
path: '/articles/2017-02/Kernel-kuid-t'
date: '2017-02-17T12:00:00.000Z'
comments: true
---

<http://lxr.free-electrons.com/ident?i=kuid_t>

```c
#include <linux/uidgid.h>
```

위의 헤더파일을 포함하여야 사용할 수 있다.

```c
typedef struct {
    uid_t val;
} kuid_t;
```
