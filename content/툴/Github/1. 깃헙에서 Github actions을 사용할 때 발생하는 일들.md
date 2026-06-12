
최근, 이미지 생성을 자동화하는 일을 github actions으로 하고 있는데, 로컬에서도 작업하고, github actions으로 자동 생성하는 것도 생겨서 파일들이 좀 다르게 관리되고 있다. 

그럴 때는 아래와 같이, 양쪽 히스토리를 합치는 코드를 입력하자. 

```
git pull --rebase #원격 커밋을 먼저 받아온 뒤 내 로컬 커밋을 얹기 
```

그런데 이것도 귀찮다면? 기본값을 설정해두자. 
```
git config pull.rebase true
```

이후로는 git pull만 쳐도 rebase 방식으로 동작한다. 
일반적으로 git pull 해서 충돌이 난다면 위의 코드를 쳐보자. 

#github 
