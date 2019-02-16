---
layout: post
title: Data segment
categories: [Data Structure]
comments: true
---

1. Text(Code)영역
   - 기계어가 존재하는 영역으로, 변수 컨트롤을 주소를 이용하여 컨트롤한다. 
   - ex. mov    0xc(%ebp),%eax

2. Heap
   - 프로그램 수행중 동적으로 할당된 변수가 존재하는 공간이다.
   - C언어의 경우 수동으로 해제하거나, 프로그램 종료시 해제되기 때문에, 수동으로 해제하지 않을 경우 **메모리누수현상**이 발생할 수 있다.

3. Stack
   - 프로그램 동작에서 지역변수가 들어가는 공간으로, 영역을 `Base Pointer`(ex. ebp)와 `Stack Pointer`(ex. esp)를 기준으로 공간을 관리한다.