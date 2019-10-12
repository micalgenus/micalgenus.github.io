---
title: Let's Encrypt wildcard 인증서
categories: [Server]
tags: [letsencryt]
path: "/articles/2019-02/Let's-Encrypt-wildcard-인증서"
date: '2019-02-15T03:00:00.000Z'
comments: true
---

우선 letsencrypt툴을 설치해줍니다.

```bash
[root@micalgenus-com micalgenus]# yum install certbot
```

사용하고자 하는 도메인을 입력하여 wildcard인증서를 만들어 줍니다.

```bash
[root@micalgenus-com micalgenus]# certbot certonly --manual -d *.micalgenus.com -d micalgenus.com --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory
Starting new HTTPS connection (1): supporters.eff.org
Obtaining a new certificate
Performing the following challenges:
dns-01 challenge for micalgenus.com
dns-01 challenge for micalgenus.com
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NOTE: The IP of this machine will be publicly logged as having requested this
certificate. If you're running certbot in manual mode on a machine that is not
your server, please ensure you're okay with that.
Are you OK with your IP being logged?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y
```

동의를 하지 않을 경우 진행할 수 없습니다.

다음으로 넘어가면 DNS설정에서 값을 추가해 주어야 합니다.

```bash
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name
_acme-challenge.micalgenus.com with the following value:

HzvGQRCEQvf6TzyDgJpttZN4nI10EHV46asfbTCJM5I

Before continuing, verify the record is deployed.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name
_acme-challenge.micalgenus.com with the following value:

vckTZpSo0Eh7wqPhWFW5-Tv-Wo01G6KkpBu4UF9i_SE

Before continuing, verify the record is deployed.
(This must be set up in addition to the previous challenges; do not remove,
replace, or undo the previous challenge tasks yet. Note that you might be
asked to create multiple distinct TXT records with the same name. This is
permitted by DNS standards.)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue
```

DNS를 설정해주는 곳에 가서 두 값을 추가해 주어야 합니다.

저의 경우는 `cloudflare`를 사용하기 때문에 다음과 같이 필드를 추가하였습니다.

![img1](/img/2019-02/Let-s-Encrypt-wildcard-certification/img1.png)

값을 모두 추가하였을 경우 엔터를 눌러 진행을 하면 됩니다.

```bash
Waiting for verification...
Cleaning up challenges
Resetting dropped connection: acme-v02.api.letsencrypt.org
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/micalgenus.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/micalgenus.com/privkey.pem
   Your cert will expire on 2019-05-16. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot
   again. To non-interactively renew *all* of your certificates, run
   "certbot renew"
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
 - If you like Certbot, please consider supporting our work by:
   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

인증서 파일이 생성이 되면 해당 경로에 인증서가 생기게 됩니다. letsencrypt의 인증서 유효기간은 `90`일이기 때문에 자주 갱신을 해주어야 합니다.
