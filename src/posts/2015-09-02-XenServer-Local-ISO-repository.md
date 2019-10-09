---
layout: post
title: XenServer Local ISO repository
categories: [Server]
tags: [XenServer, LVM]
comments: true
---

참고: <http://geekcorner.sitedevelopments.net/2013/03/29/create-local-iso-repository-xenserver-6/>

우선 Local ISO repository를 생성하기 전에 사용 가능한 Volume을 확인한다.

{% highlight bash %}
[root@localhost ~]# vgs
  VG                                                 #PV #LV #SN Attr   VSize VFree
  VG_XenStorage-775f9a8c-d8a7-d90b-dd9d-8d0fd69d9dc6   1   1   0 wz--n- 3.99G 3.98G
  VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb   2  12   0 wz--n- 7.27T 6.35T
{% endhighlight %}

현재 7.2T중 6.3T가 사용 가능하므로 이중 1T를 사용하도록 하겠다.

디스크에서 공간을 할당해 주어야 하는데, 이 명령은 lvcreate를 이용하면 된다.

{% highlight bash %}
[root@localhost ~]# lvcreate -L 1T -n test VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb
  Logical volume "test" created
{% endhighlight %}
 
이런 식으로 `-L`옵션을 통하여 크기를, `-n`옵션을 통하여 이름을 설정한 뒤, 사용할 Volume을 적게되면 해당하는 Volume에 생성되게 된다. 

lvs을 사용하여 확인을 할 수 있다.

{% highlight bash %}
[root@localhost mnt]# lvs
  LV                                       VG                                                 Attr   LSize   Origin Snap%  Move Log Copy%  Convert
  MGT                                      VG_XenStorage-775f9a8c-d8a7-d90b-dd9d-8d0fd69d9dc6 -wi---   4.00M                                      
  MGT                                      VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb -wi-a-   4.00M                                      
  VHD-120e9fb2-c44c-49e1-b308-7df92730b80c VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb -wi-ao  30.07G                                      
  VHD-17266391-ce71-46bb-8f24-cf5717711af3 VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb -wi---   8.02G                                      
  VHD-306ad48e-5072-4363-82ba-999274a7e616 VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb -wi---  25.05G                                      
  VHD-3eaf8e2b-567e-4f5a-a3ad-514c1478f041 VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb -wi-ao  64.13G                                      
  VHD-62f887d6-7446-49bb-8bc8-396036ea5d3b VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb -wi---   8.02G                                      
  VHD-80b4d2f3-5612-49a2-962d-40403d33fd9c VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb -wi-ao 128.26G                                      
  VHD-9f21884f-c8bf-4c1f-9705-d12a342ab154 VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb -wi---  16.04G                                      
  VHD-c43fdd45-aace-44aa-a7bf-66629e1eff8c VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb -wi---  16.00M                                      
  VHD-ef1e1815-0e9a-45d9-87e3-b392e96e7caa VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb -wi---  25.05G                                      
  VHD-f8684adf-9f72-4fd1-bd37-e9a1d73ee074 VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb -wi-ao 513.01G                                      
  isoImage                                 VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb -wi--- 128.00G                                      
  test                                     VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb -wi-ao   1.00T     
{% endhighlight %}

마지막 줄을 보게되면 해당하는 이름으로 생성된것을 확인할 수 있다. 이제 이를 사용하여야 하는데, 사용하기전 포맷을 하여야 한다.

ext3타입으로 포맷후 사용할 것이기 때문에 `mkfs.ext3`를 사용하도록 한다.

{% highlight bash %}
[root@localhost ~]# mkfs.ext3 /dev/VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb/test 
mke2fs 1.39 (29-May-2006)
Filesystem label=
OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
134217728 inodes, 268435456 blocks
13421772 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=4294967296
8192 block groups
32768 blocks per group, 32768 fragments per group
16384 inodes per group
Superblock backups stored on blocks: 
    32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
    4096000, 7962624, 11239424, 20480000, 23887872, 71663616, 78675968, 
    102400000, 214990848
 
Writing inode tables: done                            
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done
 
This filesystem will be automatically checked every 33 mounts or
180 days, whichever comes first.  Use tune2fs -c or -i to override.
{% endhighlight %}

이런식으로 완료되게 된다.완료가 되었으면 사용할 수 있는데, 이를 사용하기 위해서는 우선 마운트를 시켜야 한다.

{% highlight bash %}
[root@localhost mnt]# cd /mnt
[root@localhost mnt]# mkdir -p test
[root@localhost mnt]# mount -t ext3 /dev/VG_XenStorage-cd27bd82-61d4-1bb3-e5b6-1a1e9c57c7eb/test /mnt/test
{% endhighlight %}
 
이렇게 마운트까지 시키게 되었다면, df를 이용하여 확인해 보자. 

{% highlight bash %}
[root@localhost mnt]# df -h
Filesystem            Size  Used Avail Use% Mounted on
/dev/sda1             4.0G  1.8G  2.0G  48% /
none                  299M  136K  298M   1% /dev/shm
/opt/xensource/packages/iso/XenCenter.iso
                       56M   56M     0 100% /var/xen/xc-install
/dev/mapper/VG_XenStorage--cd27bd82--61d4--1bb3--e5b6--1a1e9c57c7eb-test
                     1008G  200M  957G   1% /mnt/test
{% endhighlight %}
 
정상적으로 마운트 되었다. 이제 마지막으로 이 파티션을 XenServer의 Storage로 등록해야 한다.

`xe sr-create`를 이용하여 Storage를 등록한다. type=**iso**이며, device-config:**location=**을 통하여 경로를 지정하고, device-config:legacy_mode를 **true**로 하고 content-type을 **iso**로 하게되었는데, 이 옵션들의 자세한 내용은 잘 모르겠다.

{% highlight bash %}
[root@localhost ~]# xe sr-create name-label=ISOimages type=iso device-config:location=/mnt/test/ device-config:legacy_mode=true content-type=iso
{% endhighlight %}

이렇게 등록을 하게되면 ISO Storage가 정상적으로 등록이 된다. XenCenter를 이용할 경우 파일을 넣은 후 Rescan을 하여야 반영이 되고, XenServer를 다시 시작할 경우, vgchange를 하여야 정상적으로 목록에 뜨게 된다. 

이를 자동으로 등록하기 위해서는 `/etc/fstab`파일에 등록하면 된다.