---
layout: post
title: task_uid
categories: [Kernel]
tags: [Kernel]
comments: true
---

task의 uid를 구하기 위해 `task_uid`라는 함수를 사용할 수 있다.

`kuid_t task_uid(task)`의 형태로 되어 있으며, uid_eq의 함수를 통하여 uid의 값이 일치하는지 확인할 수 있다.

<http://lxr.free-electrons.com/source/include/linux/cred.h#L347>

```
#include <linux/cred.h>
```