---
layout: post
title: Kernel get all task
categories: [Kernel]
tags: [Kernel]
comments: true
---

<http://stackoverflow.com/questions/19208487/kernel-module-that-iterates-over-all-tasks-using-depth-first-tree>
 
{% highlight c %}
struct task_struct *task;
​
for_each_process(task) {
     printk("Name: %s PID: [%d]\n", task->comm, task->pid);
}
{% endhighlight %}

와 같이 사용할 수 있다. 이를 이용하여 구하고자 하는 내용을 처리할 수 있다.