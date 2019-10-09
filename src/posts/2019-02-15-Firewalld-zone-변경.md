---
layout: post
title: Firewalld zone 변경
slug: change firewalld default zone
categories: [Server]
tags: [firewalld]
comments: true
---

firewalld의 zone을 변경하기전, 우선 현재 사용중인 zone을 확인합니다.

{% highlight bash %}
[root@micalgenus-com micalgenus]# firewall-cmd --get-default-zone
trusted
[root@micalgenus-com micalgenus]# firewall-cmd --get-zones
block dmz drop external home internal public trusted work
{% endhighlight %}

--set-default-zone옵션을 사용하여 변경합니다.

{% highlight bash %}
[root@micalgenus-com micalgenus]# firewall-cmd --set-default-zone=public
success
[root@micalgenus-com micalgenus]# firewall-cmd --get-default-zone
public
{% endhighlight %}