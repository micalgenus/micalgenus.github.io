---
title: Kernel get all task
categories: [Kernel]
tags: [Kernel]
path: '/articles/2017-02/Kernel-get-all-task'
date: '2017-02-18T00:00:00.000Z'
comments: true
---

<http://stackoverflow.com/questions/19208487/kernel-module-that-iterates-over-all-tasks-using-depth-first-tree>

```c
struct task_struct *task;
​
for_each_process(task) {
     printk("Name: %s PID: [%d]\n", task->comm, task->pid);
}
```

와 같이 사용할 수 있다. 이를 이용하여 구하고자 하는 내용을 처리할 수 있다.
