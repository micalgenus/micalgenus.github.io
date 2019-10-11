---
title: Confidence CTF Teaser 2015 - So easy[100] (reverse)
categories: [CTF]
tags: [Confidence CTF Teaser 2015, Reversing]
path: '/articles/2015-05/Confidence-CTF-Teaser-2015-So-easy-100-(reverse)'
date: '2015-05-13T00:00:00.000Z'
comments: true
---

문제 파일 및 정확한 write-up을 [참고](https://github.com/ctfs/write-ups-2015/tree/master/confidence-ctf-teaser-2015/reverse/so-easy-100)해주세요.

우선 이 문제를 받고 어떠한 파일인지 확인을 해보았습니다.

```bash
root@ubuntu:~# ls -l re_100_final
-rwxr-xr-x 1 root root 9756 2015-04-24 21:10 re_100_final
root@ubuntu:~# file re_100_final
re_100_final: ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux 2.6.24, stripped
```

문제 파일을 보게되면 `32bit` 리눅스 Intel계열 에서 실행이 가능합니다.

이제 실행을 해보도록 하겠습니다.

```bash
root@ubuntu:~# ./re_100_final
Please enter secret flag:
1234
Nope!
```

1234를 입력해 보았는데, 이렇게 뜹니다. 그럼 오버플로우를 일으켜 보겠습니다.

```bash
root@ubuntu:~# (python -c 'print "A"\*10000';cat) | ./re_100_final
Please enter secret flag:
Nope!
close failed in file object destructor
Error in sys.excepthook:

Original excetion was:
```

Segment fault가 뜨지 않고 종료가 되었습니다. 그럼 BOF는 통하지 않는듯 합니다.

(지금 생각해보면 reversing문제인데 BOF를 시도한게 잘못된 생각같네요 ㅎㅎ..)

이렇게 막힐때는 파일을 뜯어보아야 할 것 같습니다. IDA를 이용하여 파일을 열어보도록 하겠습니다.

![img1](/img/2015-05/Confidence-CTF-Teaser-2015-So-easy-100-reverse/img1.png)

\_puts를 call하는데 출력하는 문자열이 `Please enter secret flag:` 인것을 보아 이 부분이 시작되는 부분이 아닐까 생각되었습니다.

그래서 이 함수를 분석해 보았습니다. 시작 부분에서 출력을 한 후, scanf를 이용하여 `%31s` 서식문자를 통해 입력을 받습니다. 이 서식문자를 통하여 입력 글자수를 제한하고 있네요.

그럼 조금 더 아랫부분을 살펴보도록 하겠습니다.

![img2](/img/2015-05/Confidence-CTF-Teaser-2015-So-easy-100-reverse/img2.png)

여기서 왼쪽 `mov dword ptr [esp], offset s1` 부분을 보게되면 `dRGNs{tHISwASsOsIMPLE}`이라는 문자열과, s2에 저장된 문자열을 strcmp를 이용하여 비교하는 부분을 볼 수 있습니다.

strcmp를 이용하여 비교하는 부분을 보고, 해당 문자열을 직접 입력해 보았습니다.

```bash
root@ubuntu:~# ./re_100_final
Please enter secret flag:
dRGNs{tHISwASsOsIMPLE}
Nope!
```

하지만 역시 이렇게 쉬운 문제일 이유가 없습니다. 답이 아니므로, 이후 부분을 분석해 보도록 하겠습니다.

우선 처음 부분이 끝나고 scanf리턴값과 1을 비교하여 값이 같을 경우 다음과 같은 부분이 실행되게 됩니다.

만약 1이 아니면 무엇일까 따라가 보았습니다.

![img3](/img/2015-05/Confidence-CTF-Teaser-2015-So-easy-100-reverse/img3.png)

이렇게 `leave retn`을 하여 함수를 종료하게 되었습니다.

scanf의 리턴값이 1이라는 뜻은 정상적인 입력을 처리하였다는 뜻으로 알고 있는데, 이 뜻이 맞다고 생각해보면 정상적인 입력을 처리하였을 때 빨간색 선을 따라서 진행한다고 볼 수 있습니다.

빨간 선을 따라가 보면

```
mov    dword ptr [esp+14h], offset s2
jmp    short loc_8048ABE
```

이 명령을 실행하게 됩니다. s2에 있는 값을 `[esp+14h]`에 저장합니다. 이후 **loc_8048ABE**로 점프를 합니다.

여기서 방금 저장한 `[esp+14h]`에 있는 값을 eax에 저장을 하고, `byte ptr [eax]`를 통하여 포인터 연산을 통하여 값에 접근합니다.

그렇게 접근한 값을 이용하여

```
test    al, al
jnz    short loc_8048A67
```

명령을 실행하게 됩니다.

이 명령을 통하여 eax에 있는 값이 0인지를 판별하게 됩니다. 만약 0이게 될 경우 왼쪽을, 0이 아닐 경우 오른쪽 명령을 실행하게 됩니다.

오른쪽을 알아보기 전에 디버깅을 통하여 `dRGNs{tHISwASsOsIMPLE}`이 안되는데 그 부분을 따라 가도록 하겠습니다.

![img4](/img/2015-05/Confidence-CTF-Teaser-2015-So-easy-100-reverse/img4.png)

strcmp를 실행하기 직전의 상황으로 s1의 데이터가 `dRGNs{tHISwASsOsIMPLE}`의 문자열이 저장된 공간이고, s2가 사용자로부터 입력받은 데이터 입니다.

왼쪽 화면에서 체크가 되어있는 부분이 사용자로 입력을 받은 부분이 되겠습니다.

`dRGNs{tHISwASsOsIMPLE}` 로 입력하게 되었지만 실제 데이터 상에는 `DrgnS{ThisWasSoSimple}`이라는 문자열이 저장되어 있습니다.

자세히 살펴보면 소문자는 대문자로 바뀌게 되었고, 대문자는 소문자로 바뀌게 되었습니다.

그럼 이 특성을 이용하여 `DrgnS{ThisWasSoSimple}`을 입력해 보도록 하겠습니다.

```bash
root@ubuntu:~# ./re_100_final
Please enter secret flag:
DrgnS{ThisWasSoSimple}
Nope!
```

아직도 정답이 아니라고 나오네요. 그럼 오른쪽 부분을 마저 해석해 보았습니다.

해석해 보았을때, 소문자를 대문자로, 대문자를 소문자로 바꾸는 명령이 전부였습니다.

![img5](/img/2015-05/Confidence-CTF-Teaser-2015-So-easy-100-reverse/img5.png)

그래서 한 구간씩 검사를 하게 되었는데, printf함수를 지난 후에도 출력이 되지 않았습니다. 뭔가 이상함을 느끼고 출력을 하는 부분까지 스텝을 넘겨 보았습니다.

![img6](/img/2015-05/Confidence-CTF-Teaser-2015-So-easy-100-reverse/img6.png)

이렇게 putchar 함수를 이용하여 출력을 하게 되었습니다.

우선 printf함수를 지나가게 되어도 출력이 되지 않았다는 점을 생각하여 `putchar` 함수 주변에서 어떤 행위를 하지 않을까 생각을 가지게 되었습니다.

putchar 함수를 사용하여 출력하는 부분이 어떠한 함수에 속하는지 살펴 보았는데,

![img7](/img/2015-05/Confidence-CTF-Teaser-2015-So-easy-100-reverse/img7.png)

왼쪽으로 갈 경우 `Excellent Work!`를 출력하고, 오른쪽으로 갈 경우 `Nope!`를 출력하게 됩니다.

그럼 이 부분을 거치게 되어 왼쪽으로 갈 조건을 만족하게 되면 해결을 할 가능성이 있다고 생각됩니다.

그럼 위에 조건을 판별하겠습니다.

![img8](/img/2015-05/Confidence-CTF-Teaser-2015-So-easy-100-reverse/img8.png)

생각했던것 보다 짧네요. 마지막 `loc_8048795:` 이 부분을 기점으로 마지막 출력을 하게 됩니다. 그러면 이 부분에서 cmp를 사용하는 [ebp+var_15]의 값을 추적해 가면서 진행을 하여야 할 것 같습니다. `loc_8048795:`의 왼쪽 위에 있는 부분을 보게되면,

```
mov    [ebp+var_15], 0
```

을 사용하여 `[ebp+var_15]`에 값을 0을 넣어 줍니다. 마지막 cmp부분에서 `[ebp+var_15]`와 0을 cmp하게 되는데, 왼쪽위에 있는 부분을 지나게 될 경우 `[ebp+var_15]`의 값이 0이 되므로 jz는 참이 되게 됩니다.

그러므로 오른쪽인 `Nope!`을 출력하게 됩니다. 그러면 왼쪽을 지나가지 않도록 만들어야 되겠습니다.

왼쪽이 지나가지 않으려면 `loc_804875F:`의 마지막에 jz가 **모두 참**이여야 합니다.

```
jz    short loc_804878B
```

이 부분이 항상 참 이여야 하므로, test al, al의 zf가 1이 되어야 합니다.

`test`는 AND연산을 하게 되는데, 같은 값을 AND하게 되므로 al의 값이 0이여야 `zf가 1`이 됩니다.

```
setnz al
```

이 부분의 결과값에 의하여 test의 결과가 결정되는데, 이 명령은 zf가 1이면 al에 0을, zf가 0이면 al에 1을 주게 됩니다. 그러므로 `al`의 값이 `0`이 되어야 jz가 만족합니다.

zf를 결정하기 위해서는 cmp를 수행해야 하는데, `edx`와 `eax`의 값을 비교하게 됩니다. 두 값이 같게되면 zf는 1, 다르면 zf는 0을 가지게 됩니다.

그럼 break point를 cmp부분에 주고 값을 비교해 보겠습니다.

![img9](/img/2015-05/Confidence-CTF-Teaser-2015-So-easy-100-reverse/img9.png)

이러한 순서로 값을 비교하면 됩니다. ecx(문자 위치)에 따라서, `0x64(d)`, `0x52(R)`, `0x47(G)`, `0x4e(N)`, `0x73(s)`, `0x7b({)`까지는 일치하게 됩니다.

하지만 ecx가 6일때는 값이 다르게 됩니다. `0x74(t)`와 `0x6e(n)`이 일치하지 않습니다. 앞의 문자를 보게되면 입력하게된 값임을 추측할 수 있습니다. 그리고 eax에 들어간 값은 입력된 값인 t를 나타내고 있습니다.

그럼 t를 n으로 바꾸고 해주어야 합니다.

![img10](/img/2015-05/Confidence-CTF-Teaser-2015-So-easy-100-reverse/img10.png)

n으로 입력을 해주게 되었는데, 값이 `0x74`에서 `0x4e`로 바뀌게 되었습니다. 이로써 입력한 값으로 변경됨을 알았습니다.

하지만 `0x6e(n)`을 입력하였는데 `0x4e(N)`이 입력되었습니다. 이는 처음 분석하였던 부분인 대소문자를 변경해주는 부분에 의해서 변경이 이루어지게 됩니다.

그러므로 입력된 값을 대소문자를 변경해 주어서 입력해야 됩니다.

이러한 방법으로 한문자씩 변경을 해주게 되면 최종적인 값을 추출할 수 있습니다.

```bash
root@ubuntu:~# ./re_100_final
Please enter secret flag:
DrgnS{NotEvenWarmedUp}
Excellent Work!
```
