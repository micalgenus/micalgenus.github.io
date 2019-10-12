---
title: Docker Nginx Letsencrypt SSL 인증서 적용
categories: [Server]
tags: [Docker, nginx, letsencryt]
path: '/articles/2019-02/Docker-Nginx-Letsencrypt-SSL-인증서-적용'
date: '2019-02-15T01:00:00.000Z'
comments: true
---

[Docker nginx 설치](/articles/2019-02/install-nginx-in-docker)에서 만들어진 컨테이너에 `Lets'encrypt`인증서로 HTTPS를 사용하겠습니다.

저는 미리 만들어둔 인증서를 사용하였습니다.

CentOS의 경우 selinux를 위해 context를 변경해줍니다.

```bash
[root@micalgenus-com micalgenus]# chcon -R -u system_u -t svirt_sandbox_file_t /etc/letsencrypt/
```

그 후 인증서 파일을 마운트 시켜줍니다.

```bash
[root@micalgenus-com micalgenus]# cat /etc/systemd/system/nginx.service
[Unit]
Description=Nginx Container
After=docker.service
Requires=docker.service

[Service]
TimeoutStartSec=0
Restart=always
ExecStartPre=/usr/bin/docker pull nginx:latest
ExecStart=/usr/bin/docker run --name nginx -p 80:80 -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt -v /etc/nginx:/etc/nginx -v /var/log/nginx:/var/log/nginx nginx:latest
ExecStop=/usr/bin/docker stop -t 2 nginx
ExecStopPost=/usr/bin/docker rm -f nginx

[Install]
WantedBy=multi-user.target
[root@micalgenus-com micalgenus]#
```

컨테이너를 다시 실행해 줍니다.

```bash
[root@micalgenus-com micalgenus]# systemctl daemon-reload
[root@micalgenus-com micalgenus]# systemctl restart nginx
```

`virtual host`를 사용하여 인증서를 확인하기 위해 디렉토리를 만듭니다.

```bash
[root@micalgenus-com micalgenus]# cd /etc/nginx
[root@micalgenus-com nginx]# mkdir sites-enabled sites-available
```

그 후 해당 디렉토리를 설정에 추가해 줍니다.

```bash
[root@micalgenus-com micalgenus]# cat /etc/nginx/nginx.conf
user  nginx;
worker_processes  1;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {
    worker_connections  1024;
}
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    keepalive_timeout  65;
    #gzip  on;
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*.conf;
}
```

이제 SSL 설정을 추가해보겠습니다.

```bash
[root@micalgenus-com micalgenus]# cat /etc/nginx/sites-available/default.conf
server {
    listen 80 default;
    server_name _;
}
server {
    listen 443 ssl;
    ssl on;
    ssl_certificate     /etc/letsencrypt/live/micalgenus.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/micalgenus.com/privkey.pem;
}
```

sites-available 디렉토리에 설정파일을 만들었으니 이제 적용을 위해 심볼릭 링크를 만듭니다.

```bash
[root@micalgenus-com micalgenus]# ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default.conf
```

서버를 재시작 하면 설정이 적용됨을 확인할 수 있습니다.

```bash
[root@micalgenus-com micalgenus]# systemctl restart nginx
```

![img1](/img/2019-02/setup-letsencryt-ssl-in-nginx-on-docker/img1.png)
