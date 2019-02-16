---
layout: post
title: Linux chpasswd
categories: [Server]
comments: true
---

리눅스상에서 비밀번호를 `스크립트`를 이용하여 변경하고 싶은 경우가 있다.

보통 **redhat**계열의 경우는 `passwd --stdin`의 옵션을 사용하여 변경하지만, **ubuntu**의 경우는 불가능 하여 이를 해결하기 위해 찾은 명령어다.

이 명령어는 관리자 권한을 가지고만 가능한 명령이다. 사용법은 다음과 같다.

{% highlight bash %}
[root@localhost ~]# chpasswd --help
Usage: chpasswd [options]
 
Options:
  -c, --crypt-method METHOD     the crypt method (one of NONE DES MD5 SHA256 SHA512)
  -e, --encrypted               supplied passwords are encrypted
  -h, --help                    display this help message and exit
  -m, --md5                     encrypt the clear text password using
                                the MD5 algorithm
  -R, --root CHROOT_DIR         directory to chroot into
  -s, --sha-rounds              number of SHA rounds for the SHA*
                                crypt algorithms
{% endhighlight %}

옵션은 암호화와 chroot_dir에 대해서 나와있다. 실제 비밀번호를 변경하는 방법은 다음과 같다.

{% highlight bash %}
[root@localhost ~]# chpasswd 
User:Password
{% endhighlight %}

이와 같이 사용해 주는데, ^D(EOF)의 경우는 `Ctrl + D`키를 누른 것이다.

이 명령어는 한번에 `여러 계정`을 변경할 수 있는것이 특징이다.

이 명령은 표준 입력을 받아 처리를 하는데, 그렇기 때문에 스크립트에서 사용하기 위해서는 `파이프` 또는 `리다이렉트`를 사용하여 처리를 할 수 있다.