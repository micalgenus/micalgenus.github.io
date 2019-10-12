---
title: firewalld 특정 아이피 특정 포트 방화벽 설정
categories: [Server]
tags: [firewalld]
path: '/articles/2016-03/firewalld-특정-아이피-특정-포트-방화벽-설정'
date: '2016-03-27T00:00:00.000Z'
comments: true
---

CentOS 7 부터는 `firewalld`이라는 방화벽을 사용하게 된다.

이 방화벽을 사용할 때 특정 아이피에서 특정 포트만 사용하고 싶은 경우가 있다.

이 때 다음과 같은 명령으로 사용하면 된다.

```bash
[root@localhost ~]# firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" source address="192.168.123.123/32" service name="ssh" log prefix="ssh" accept'
success
[root@localhost ~]# firewall-cmd --reload
success
```

여기서 ip와 netmask를 계산하여 적어주면 된다.

위의 예시는 192.168.123.123아이피의 ssh서비스를 방화벽 해제하는 예시다.

`--permanent`는 설정파일에 적용을 하는 것이고, 이 옵션을 사용하면 **영구적용**을 할 수 있다.

이 옵션을 사용하지 않을 경우 firewalld가 재시작 될 경우 방화벽에 추가한 명령이 적용되지 않는다.

서비스가 아닌 포트를 적용시킬 경우는 다음과 같이 설정하면 된다.

```bash
[root@localhost ~]# firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" source address="192.168.123.123/32" port protocol="tcp" port="4567" log prefix="log" accept'
success
[root@localhost ~]# firewall-cmd --reload
success
```

방화벽 제거를 하려면 --add-rich-rule대신 `--remove-rich-rule`을 사용하면 된다.
