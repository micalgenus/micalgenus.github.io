---
layout: post
title: Defcon Qualifier CTF 2015 - mathwhiz[1] (babys-first)
categories: [Server]
comments: true
---

이 문제는 단순하게 계산을 하는 문제이다.

`mathwhiz_c951d46fed68687ad93a84e702800b7a.quals.shallweplayaga.me:21249` 이곳으로 접속을 하게 되면, 간단한 수학 문제를 주게 된다.

```
2 + 1 =
```

이렇게 간단한 문제를 주게 된다. 이러한 문제를 계속 풀어 나가면 되는 문제이다. 하지만 단순하게 그냥 풀기만 하면 안된다. 문제를 푸는데 제한시간이 걸려있다. 약 2~3초쯤 지나면 자동으로 틀리게 되어있었다. 단순 노동으로 하지 말라는 뜻인거 같다.

그래서 파이썬을 이용하여 스크립트를 짜기로 하였다.

{% highlight python %}
from socket import *
 
HOST = 'mathwhiz_c951d46fed68687ad93a84e702800b7a.quals.shallweplayaga.me'
PORT = 21249
 
sock = socket(AF_INET, SOCK_STREAM)
sock.connect((HOST, PORT))
count = 0
while 1:
  count += 1
  data = sock.recv(1024)
  print count
  print data
  if not data:
    break
  equation = data[0:len(data)-2]
  result = eval(equation)
  result = str(result)
  sock.send(result)
 
sock.close()
{% endhighlight %}

이러한 식으로 코드를 작성했다. 다음과 같은 순서로 코드를 작성하였다.

1. 서버와 연결을 한다.
2. 서버로부터 식을 받는다.
3. 값이 있는지 판단한다.
4. 식에서 '='을 제거하여 추출한다.
5. 식을 실행하여 결과를 가져온다.
6. 값을 문자열로 바꾼다.
7. 값을 서버로 전송한다.

이렇게 작성하였는데, 10~20번째 주고받기를 하면 문제가 약간 변형된다. 중간에 **소괄호**"()"가 추가되어 출력이 된다. 

하지만 스크립트에서 소괄호를 처리할 수 있기 때문에 상관이 없다. 그렇지만 나중에 중괄호도 추가가 되었다. **중괄호**는 처리를 못하기 때문에 직접 수정을 해 주어야 한다.

```
data = data.replace('[', '(')
data = data.replace(']', ')')
```

그래서 다음의 코드를 추가하여 치환해 주었다.

그렇게 다시 실행하다 보니, 중괄호 뿐만 아니라 **대괄호**도 추가가 되었다. 그래서 대괄호도 중괄호와 같은 방식으로 처리해 주었다.
다시 실행하니 이번에는 ONE, TWO, THREE로 나오는 부분이 있다. 이 부분을 `ONE`를 1로, `TWO`를 2로, `THREE`를 3으로 치환해 주었다. 마지막으로 ^가 나왔는데, 이 기호는 수학적으로 제곱근을 의미하지만, 파이썬에서는 **비트연산**을 의미한다. 그래서 이 부분을 **제곱근 연산** "**" 으로 수정해 주었다.

{% highlight python %}
from socket import *
 
HOST = 'mathwhiz_c951d46fed68687ad93a84e702800b7a.quals.shallweplayaga.me'
PORT = 21249
 
sock = socket(AF_INET, SOCK_STREAM)
sock.connect((HOST, PORT))
count = 0
while 1:
  count = count + 1
  data = sock.recv(1024)
  print count
  print data
  if not data: break
  data = data.replace('[', '(')
  data = data.replace(']', ')')
  data = data.replace('ONE', '1')
  data = data.replace('TWO', '2')
  data = data.replace('THREE', '3')
  data = data.replace('{', '(')
  data = data.replace('}', ')')
  data = data.replace('^', '**')
  equation = data[0:len(data)-2]
  result = eval(equation)
  result = str(result)
  sock.send(result)
 
sock.close()
{% endhighlight %}

최종적으로 이러한 코드가 만들어 지게 되었다. 이 코드를 실행하면 flag를 획득할 수 있다.

```
998
2 + 1 - 1 =

999
2 + 2 - 1 - 1 =

1000
3 - 3 + 2 =

1001
You won!!!
The flag is: Farva says you are a FickenChucker and you'd better watch Super Troopers 2
F?
```