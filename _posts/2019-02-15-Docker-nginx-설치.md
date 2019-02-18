---
layout: post
title: Docker nginx 설치
slug: install nginx in docker
categories: [Server]
comments: true
---

Docker를 사용하여 nginx를 구동시키게 되면, 컨테이너 안에 넣음으로써 분리를 시킬 수 있고, 버전 업데이트를 편리하게 할 수 있습니다.

우선 최신버전의 nginx를 설치합니다.

{% highlight bash %}
[root@micalgenus-com micalgenus]# docker run --name nginx -d -p 80:80 -p 443:443 nginx:latest
{% endhighlight %}

그 후, 설정파일을 복사해 줍니다.

{% highlight bash %}
[root@micalgenus-com micalgenus]# docker cp nginx:/etc/nginx /etc/nginx
{% endhighlight %}

CentOS의 경우는 `context`때문에 docker에 마운트가 안되기 때문에 context를 맞춰줍니다.

{% highlight bash %}
[root@micalgenus-com micalgenus]# chcon -R -u system_u -t svirt_sandbox_file_t /etc/nginx
{% endhighlight %}

로그 파일을 기록하기 위해 디렉토리를 만들어줍니다.

{% highlight bash %}
[root@micalgenus-com micalgenus]# mkdir /var/log/nginx
[root@micalgenus-com micalgenus]# chcon -R -t svirt_sandbox_file_t -u system_u /var/log/nginx/
[root@micalgenus-com micalgenus]# chown 1000:root /var/log/nginx/
{% endhighlight %}

폴더를 만들었으니 실제 서버에 적용해 보겠습니다.

{% highlight bash %}
[root@micalgenus-com micalgenus]# docker rm -f nginx # 컨테이너 종료 및 삭제
[root@micalgenus-com micalgenus]# docker run --name nginx -d -p 80:80 -p 443:443 -v /etc/nginx:/etc/nginx -v /var/log/nginx:/var/log/nginx nginx:latest
{% endhighlight %}

이제 서버가 재시작 될 때 컨테이너를 자동으로 시작하도록 해주어야 합니다.

저의 경우는 `systemd`를 사용하여 서비스를 관리합니다. 이를 사용하면 docker pull을 이용하여 자동으로 최신버전을 유지하기 쉽기 때문에 이를 사용합니다.

{% highlight bash %}
[root@micalgenus-com micalgenus]# cat /etc/systemd/system/nginx.service 
[Unit]
Description=Nginx Container
After=docker.service
Requires=docker.service
 
[Service]
TimeoutStartSec=0
Restart=always
ExecStartPre=/usr/bin/docker pull nginx:latest
ExecStart=/usr/bin/docker run --name nginx -p 80:80 -p 443:443 -v /etc/nginx:/etc/nginx -v /var/log/nginx:/var/log/nginx nginx:latest
ExecStop=/usr/bin/docker stop -t 2 nginx
ExecStopPost=/usr/bin/docker rm -f nginx
 
[Install]
WantedBy=multi-user.target
{% endhighlight %}

설정 파일을 만들어 준 후, 서비스를 재시작 해보겠습니다.

{% highlight bash %}
[root@micalgenus-com micalgenus]# docker stop nginx
nginx
[root@micalgenus-com micalgenus]# docker rm nginx
nginx
{% endhighlight %}

우선 충돌이 나기 때문에 컨테이너를 삭제합니다.

{% highlight bash %}
[root@micalgenus-com micalgenus]# systemctl start nginx
[root@micalgenus-com micalgenus]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                                      NAMES
520cfd5e7c5e        nginx:latest        "nginx -g 'daemon ..."   2 seconds ago       Up 1 second         0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   nginx
{% endhighlight %}

그 후 nginx를 시작합니다.

systemd를 사용했기 때문에 서버 재시작을 쉽게 설정할 수 있습니다.

{% highlight bash %}
[root@micalgenus-com micalgenus]# systemctl enable nginx
Created symlink from /etc/systemd/system/multi-user.target.wants/nginx.service to /etc/systemd/system/nginx.service.
{% endhighlight %}