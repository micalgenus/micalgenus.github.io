---
layout: post
title: Fedora Core 3 repositories
categories: [Server]
comments: true
---

참고: <http://unix.stackexchange.com/questions/10009/are-there-any-repositories-for-fedora-3>
 
Fedora는 약 6개월마다 새로운 버전이 릴리즈되며, 유지보수 기간도 1년밖에 되지 않는다. 그래서인지 아주 오래된 FC3(현재 FC22)를 사용하게 되었는데, yum이 작동되지 않는다.

**2015-09-03**일 기준으로 해결법이다.

Fedora Core 3를 설치하게 되면 기본적으로 baseurl이 http://download.fedora.redhat.com/pub/fedora/linux/core/$releasever/$basearch/os/로 되어있다.

yum 설정 repositories에 관한 파일은 `/etc/yum.repos.d/`에 있다.

```
baseurl=http://archive.kernel.org/fedora-archive/core/3/i386/os/
baseurl=http://archive.kernel.org/fedora-archive/extras/3/i386/
```
 
이 두줄을 추가해 주면 된다.

gpg error가 나는 경우가 있는데,

{% highlight bash %}
[root@localhost ~]# rpm --import /usr/share/rhn/RPM-GPG-KEY
{% endhighlight %}

이 명령을 사용하면 된다.