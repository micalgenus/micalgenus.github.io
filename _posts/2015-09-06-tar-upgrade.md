---
layout: post
title: tar upgrade
categories: [Server]
tags: [Linux upgrade, tar]
comments: true
---

tar의 버전이 낮아 xz등 여러 압축형식을 한번에 해제할수 없어 tar버전업을 하게되었다. 굳이 tar를 안쓰고 xz으로 해제한 뒤, tar로 풀기를 하여도 되지만 하고싶어서 하게되었다. 

이 기능은 **1.15.1버전**부터 가능하게 되었다.

우선 tar를 받아주어야 한다. tar는 GNU프로젝트에 속하므로, GNU에 들어가 받으면 된다. 한국서버는 <http://ftp.kaist.ac.kr/gnu/gnu/>로 들어가면 된다.

현재 [1.28버전](http://ftp.kaist.ac.kr/gnu/gnu/tar/tar-1.28.tar.gz)이 가장 최신버전이다. 하지만 컴파일에러가 발생하여 1.27버전을 사용하도록 하겠다.

우선 wget을 이용하여 `/usr/local/src/`폴더에 받아준다.

{% highlight bash %}
[root@localhost root]# cd /usr/local/src/
[root@localhost src]# wget http://ftp.kaist.ac.kr/gnu/gnu/tar/tar-1.27.tar.gz
[root@localhost src]# tar zxf tar-1.27.tar.gz 
[root@localhost src]# cd tar-1.27
{% endhighlight %}

여기서 `./configure`파일을 실행시켜 준다.

{% highlight bash %}
[root@localhost tar-1.27]# ./configure 
checking for a BSD-compatible install... /usr/bin/install -c
checking whether build environment is sane... yes
checking for a thread-safe mkdir -p... /bin/mkdir -p
checking for gawk... gawk
... 생략 ...
checking whether mkfifo rejects trailing slashes... yes
checking whether mknod can create fifo without root privileges... configure: error: in `/usr/local/src/tar-1.27':
configure: error: you should not run configure as root (set FORCE_UNSAFE_CONFIGURE=1 in environment to bypass this check)
See `config.log' for more details
{% endhighlight %}
 
에러를 보게되면 `set FORCE_UNSAFE_CONFIGURE=1`을 환경변수로 추가해야 에러를 무시할수 있다고 한다. 하라는데로 해주고 다시 컴파일한다.

{% highlight bash %}
[root@localhost tar-1.27]# export FORCE_UNSAFE_CONFIGURE=1
[root@localhost tar-1.27]# ./configure; make; make install;
{% endhighlight %}
 
`configure`, `make`, `make install`을 순서대로 진행해 주게 되면 /usr/local/bin/폴더에 정상적으로 컴파일된 tar가 생성되게 된다.

{% highlight bash %}
[root@localhost tar-1.27]# /usr/local/bin/tar --version
tar (GNU tar) 1.27
Copyright (C) 2013 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
 
Written by John Gilmore and Jay Fenlason.
{% endhighlight %}

이제 새로운 버전을 기존의 버전이 있던 곳에 대체해야 한다.

{% highlight bash %}
[root@localhost tar-1.27]# whereis tar
tar: /bin/tar /usr/local/bin/tar /usr/include/tar.h /usr/share/man/man1/tar.1.gz
[root@localhost tar-1.27]# mv /bin/tar /bin/tar_old
[root@localhost tar-1.27]# cp /usr/local/bin/tar /bin/tar
[root@localhost tar-1.27]# tar --version
tar (GNU tar) 1.27
Copyright (C) 2013 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
 
Written by John Gilmore and Jay Fenlason.
{% endhighlight %}
 
`whereis`명령을 통해 /bin/tar에 존재함을 알 수 있다. 이 파일을 백업용으로 tar_old로 변경하고, 새로운 tar를 복하하여 넣는다.

version을 확인해보면 정상적으로 적용됨을 알 수 있다.