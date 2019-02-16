---
layout: post
title: Linux Time
categories: [Server]
comments: true
---

리눅스에서 시간을 변경하는 방법은 `date -s`옵션을 이용하여 변경할 수 있다.

시간이 일치하지 않는다면, `date -s "연-월-일 시:분:초"` 형식으로 값을 수정할 수 있다.

{% highlight bash %}
[root@localhost ~]# date -s "2016-01-11 02:19:00";date;
Mon Jan 11 02:19:00 KST 2016
Mon Jan 11 02:19:00 KST 2016
{% endhighlight %}

만약 일만 바꾸고 싶으면 위처럼 하면 된다. 예를들어 일을 선택한 것이지, 원하는 값만 바꾸고 싶을 경우 이와 유사한 형식을 사용하면 된다.

**""**안에 **``**를 사용했는데, 이는 bash에서 명령을 처리하여 그 출력 결과를 그 위치에 대입한다고 생각하면 된다.

{% highlight bash %}
[root@localhost ~]# date +%Y-%m
2016-01
{% endhighlight %}

이와 같이 +를 이용하면 원하는 형식으로 출력할 수 있다. 다음과 같은 형식을 사용할 수 있다. 

중간에 원하는 문자가 있을 경우 그냥 넣으면 된다.

```
%Y : 연
%m : 월
%d : 일
%H : 시
%M : 분
%S : 초
```

이와 **``**를 이용하면 원하는 값을 만들어 낼 수 있다.

이를 이용하여 수정하지 않을 값은 **``**를 이용해 출력하고, 수정할 값은 직접 입력하여 최종적으로 원하는 시간을 만들 수 있다.

{% highlight bash %}
[root@localhost ~]# date
Tue Jan 19 06:50:37 KST 2016
{% endhighlight %}

이러한 시간으로 설정되어 있을때, 실제 시간은 18일 21시이다. 그 시간을 이제 정확히 바꾸고 싶은데, 바꿀 부분은 일과 시간이다.

다음과 같이 사용하면 해당하는 값만 변경할 수 있다.

{% highlight bash %}
[root@localhost ~]# date -s "`date +%Y-%m`-18 21:`date +%M:%S`"
Mon Jan 18 21:51:10 KST 2016
[root@localhost ~]# date
Mon Jan 18 21:51:11 KST 2016
{% endhighlight %}

추가로 timezone을 설정하는 것은 `/etc/localtime`를 수정하면 되는데, `/usr/share/zoneinfo`에 각 지역별로 설정되어 있어 이를 복사하거나 링크걸면 된다.