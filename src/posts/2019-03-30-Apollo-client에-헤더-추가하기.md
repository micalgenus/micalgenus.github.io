---
title: Apollo client에 헤더 추가하기
categories: [React]
tags: [React, GraphQL]
path: '/articles/2019-03/Apollo-client에-헤더-추가하기'
date: '2019-03-30T00:00:00.000Z'
comments: true
---

Apollo client를 사용할 때, header를 설정하려면 ApolloClient를 다음과 같이 하면된다.

```javascript
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

const httpLink = createHttpLink({ uri: URL, fetch });
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({ headers: { 'x-access-token': getLoginToken() } });

  if (forward) return forward(operation);
  return null;
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
```

`ApolloLink`를 사용하여 `authMiddleware`를 만든 후, **link**에 `concat`을 이용하여 적용시켜주면 된다.
