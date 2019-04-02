---
layout: post
title: Google Cloud Datastore 인덱스 수동 생성
categories: [Cloud]
tags: [GCP, Datastore]
comments: true
---

Google Cloud Datastore를 사용할 때 order를 사용하기 위해서는 index를 만들어야한다.

이를 만들기 위해서 `gcloud`를 사용할 수 있다. `gcloud`는 Google Cloud Platform Console에 들어가면 `Cloud Shell`을 이용하여 쉽게 사용할 수 있다.

우선 수동으로 index를 만들기 위해서는 정의를 해줘야 한다. `index.yml`을 다음과 같이 작성한다.

{% highlight YML %}
indexes:

- kind: Task
  ancestor: no
  properties:
  - name: done
  - name: priority
    direction: desc

- kind: Task
  properties:
  - name: collaborators
    direction: asc
  - name: created
    direction: desc

- kind: TaskList
  ancestor: yes
  properties:
  - name: percent_complete
    direction: asc
  - name: type
    direction: asc
{% endhighlight %}

하고자 하는 정렬에 따라서 내용을 채우면 된다.

그 후, 다음 명령어를 통하여 인덱스를 생성 할 수 있다.

{% highlight bash %}
$ gcloud datastore indexes create index.yml
{% endhighlight %}

참고: [공식문서](https://cloud.google.com/datastore/docs/tools/indexconfig#Datastore_About_index_yaml)