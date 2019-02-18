---
layout: post
title: docker directory mapping with selinux
categories: [Server]
comments: true
---

<http://stackoverflow.com/questions/24288616/permission-denied-on-accessing-host-directory-in-docker>

`selinux`를 사용하는 환경에서 docker를 사용할 경우 디렉토리를 매핑하려 할 때 **Permission denied**가 뜨는 경우가 있다.

이 때에는 다음과 같이 설정해주면 된다.

{% highlight bash %}
chcon -R -t svirt_sandbox_file_t /path/to/volume
{% endhighlight %}