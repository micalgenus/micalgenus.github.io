---
title: SEO canonical
categories: [Web]
tags: [HTML, SEO]
path: '/articles/2019-02/SEO-canonical'
date: '2019-02-20T16:00:00.000Z'
comments: true
---

검색엔진 최적화 기법중에 `<link rel="canonical" href="{site}" />`를 사용하여 최적화 하는 방법이 있습니다.

같은 페이지를 보여주지만, 서로 다른 URL을 가질 경우 검색엔진에서 손해를 볼 수 있습니다.

이를 해결하기 위해 `canonical`를 사용하여 해결할 수 있습니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="canonical" href="https://micalgenus.github.io/index.html" />
  </head>
</html>
```

위와 같은 페이지가 있다고 한다면, 해당 사이트가 `https://micalgenus.github.io/`, `https://micalgenus.github.io/index.html`, `https://micalgenus.github.io/index`와 같이 서로 다른 URL을 가질 경우 검색엔진은 3페이지를 모두 다른 페이지로 판단하게 됩니다.

이 때, **canonical**을 사용하게 되면 검색엔진은 해당 **href**인 `https://micalgenus.github.io/index.html`페이지로 인식하게 되고, 결국 하나의 페이지로 인식하여 검색엔진에 긍정적인 효과를 가져오게 됩니다.

제 블로그의 경우 다음과 같이 작성되어, Jekyll가 문서를 생성할 때 해당 옵션을 추가해 주었습니다.

```html
<link rel="canonical" href="{{ page.url | replace:'index.html','' | prepend: site.url }}" />
```
