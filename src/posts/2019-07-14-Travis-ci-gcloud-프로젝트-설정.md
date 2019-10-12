---
title: Travis-ci 환경에서 gcloud 프로젝트 설정
categories: [traivs]
tags: [gcloud, travis]
path: '/articles/2019-07/Travis-ci-gcloud-프로젝트-설정'
date: '2019-07-14T00:00:00.000Z'
comments: true
---

Travis-ci를 사용하여 gcloud명령어를 사용할 경우 Travis내부 설정에 의해서 프로젝트 ID가 제대로 적용되지 않는 경우가 있다.

이 경우 `eco-emissary-99515`와 `travis-ci-prod-2`로 프로젝트 ID가 설정돼서 아래와 같은 에러가 발생하였다.

```
ERROR: (gcloud.app.versions.list) User [portfolio@micalgenus-com.iam.gserviceaccount.com] does not have permission to access app [eco-emissary-99515] (or it may not exist): The caller does not have permission
```

이 문제를 해결하기 위해서 traivs에서 내부적으로 `CLOUDSDK_CORE_PROJECT`환경변수를 추가하여 해결하였다.

```yaml
# .traivs.yml
# ... 생략
before_script:
  # ... 생략
  - export CLOUDSDK_CORE_PROJECT=$GCLOUD_PROJECT
# ... 생략
```
