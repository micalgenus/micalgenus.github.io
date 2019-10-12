---
title: Firewalld zone 변경
slug: change firewalld default zone
categories: [Server]
tags: [firewalld]
path: '/articles/2019-02/change-firewalld-default-zone'
date: '2019-02-15T02:00:00.000Z'
comments: true
---

firewalld의 zone을 변경하기전, 우선 현재 사용중인 zone을 확인합니다.

```bash
[root@micalgenus-com micalgenus]# firewall-cmd --get-default-zone
trusted
[root@micalgenus-com micalgenus]# firewall-cmd --get-zones
block dmz drop external home internal public trusted work
```

--set-default-zone옵션을 사용하여 변경합니다.

```bash
[root@micalgenus-com micalgenus]# firewall-cmd --set-default-zone=public
success
[root@micalgenus-com micalgenus]# firewall-cmd --get-default-zone
public
```
