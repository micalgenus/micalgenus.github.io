---
title: Helm chart에서 with 문법
categories: [kubernetes]
tags: [helm, kubernetes]
path: '/articles/2020-08/Helm-chart에서-with-문법'
date: '2020-08-08T00:00:00.000Z'
comments: true
---

Helm chart를 직접 구성할 때 여러 컨트롤 플로우가 있는데, 그 중 with이라는 문법이 신기해서 기억에 남는다.

다른 언어로 비교하면 this문법과 비슷하다고 생각하는데, if condition의 기능을 하면서도 `this`를 변경하는 기능이라고 생각할 수 있다.

```yaml
test:
  a: 1
  b: 2
```

와 같이 있다고 할 때 다음과 같이 사용할 수 있다.

```yaml
{{- with .Values.test }}
  a: {{ .a | default "a" | quote }}
  b: {{ .b | default "b" | quote }}
{{- end }}
```

helm chart에서 `.`을  `this`라고 볼 수 있는데, `with`을 사용하면 기존의 `.`을 새로운 값으로 덮어쓸 수 있다. 그래서 해당 문법을 사용할 때 기존에 있던 값중에 필요한 값이 있다면 해당 값을 저장해 둔 후 사용하는 것이 좋다.

```yaml
{{ $Release := .Release }}
{{- with .Value.test }}
  test: {{ .a | default $Release.Name | quote }}
{{- end }}
```


참고: [공식문서](https://helm.sh/docs/chart_template_guide/control_structures/)
