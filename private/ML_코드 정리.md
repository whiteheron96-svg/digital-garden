
```
### sklearn 
from sklearn.neighbors import KNeighborsClassifier
```
#### 2차원 리스트 만들기 
```
### 2차원 리스트 만들기 
fish_data = [[l, w] for l, w in zip(length, weight)]

###1차원으로 된 것을 최근접이웃 만들기 위해서 원소를 하나씩 꺼내주도록 한다. 


```

#### 이진 분류를 위한 리스트 만들기 
```
fish_target = [1]*35 + [0]*14
```

#### 모델 학습시키기
```
kn = KNeighborsClassifier()
kn.fit(fish_data, fish_target)

### 성능 확인하기
kn.score(fish_data, fish_target)
```


> [!NOTE] 주의할 점 
> 슬라이싱을 할 때는 [0:5] 마지막 5에 대한 부분은 선택되지 않는다 (0~4까지 5개가 선택됨)


#### numpy array : 데이터를 배열하기 


### 학습 데이터와 테스트 데이터 나누기 
```
from sklearn.model_selection import train_test_split
train_input, test_input, train_target, test_target = train_test_split(data, target, test_size=0.2, random_state=42)
```

! test_size는 전체 데이터의 20%을 test 데이터로 활용하겠다라는 뜻. 

### 의사결정나무
#### 불순도
- 지니 불순도 : 노드에서 데이터를 분할하는 기준이 되는 것_ 부모와 자식 간의 불순도 차이를 크게 한다. 
  (지니 불순도 = 1-(음성 클래스 비율의 제곱 + 양성 클래스 비율의 제곱) 
- 엔트로피 불순도 : 


> [!NOTE] 전처리 과정
> 의사결정나무는 데이터 전처리 (scale) 과정이 필요 없다. 

#### 특성 중요도 :
- 어떤 것이 가장 영향을 주는 중요한 특성인지?
- print(dt.feature_importances_) #특성중요도 

#### 교차검증 함수 : cross_validate()
```
from sklearn.model_selection import cross_validate
scores = cross_validate(dt, train_input, train_target)
print(scores)

### 교차검증을 했을 때 성능 구하기 : numpy에서 평균 구하기 
import numpy as np 
print(np.mean(scores['test_score']))
```

cross_validate의 단점 : 훈련 셋트를 랜덤으로 섞어주지 않는다.
즉, 직접 섞어야 한다. 

```
#8-폴드 교차검증 

splitter = StratifiedKFold(n_splits=8, shuffle=True, random_state=42)
scores = cross_validate(dt, train_input, train_target, cv=splitter)
print(np.mean(scores['test_score']))
```

### AutoML : 사람의 개입 없이 하이퍼파라미터를 자동으로 튜닝 
#그리드서치 

```
from sklearn.model_selection import GridSearchCV
params = {'min_impurity_decrease':[0.0001, 0.0002, 0.0003, 0.0004, 0.0005]}
gs = GridSearchCV(DecisionTreeClassifier(random_state=42), params, n_jobs=-1)
gs.fit(train_input, train_target)
dt = gs.best_estimator_ #최적의 성능 구현 
print(dt.score(train_input, train_target))
print(gs.best_params_)
```