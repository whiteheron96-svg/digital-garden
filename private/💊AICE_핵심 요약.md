
### 라이브러리 
```

###딥러닝 : keras, Sequential
import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense

###결측치 처리 : simpleimputer
from sklearn.impute import SimpleImputer
```

```
### 열 삭제
df.drop('RID', axis=1, inplace=True) ##꼭 axis=1을 적어줘야 한다. 
```



### 데이터 분석 순서
- 데이터 전처리 
	- 결측치 대체
	- 파생변수 추가 


### 함수 정리
- 날짜 : datetime(년, 월, 일, 시, 분)
	- .dt.days : timedelta64형을 int형으로 변경 


### 데이터 전처리 : 
### 이상치 처리 
```
###300 이상인 행 제거하기 
df2 = df[df['Speed_Per_Hour'<300]]

```

### 값이 '-'인 행을 삭제하기 
```
###덮어쓰는 방식 
df = df[df['Address'] != '-']]

###drop 사용 
df.drop(df[df['Address']==1].index, inplace=True)

##drop_na() : 결측치가 있는 행을 삭제하기 ```


​1) 결측치_<span style="background:#fff88f">SimpleImputer</span>
```
#SimpleImputer

from sklearn.impute import SimpleImputer

mean_imputer = SimpleImputer(strategy='mean')
df['Arrival Day in Minutes'] = mean_imputer.fit_transform(df[["Arrival Delay in Minutes"]])
```


> [!NOTE] 왜 [[]]를 사용하는가? - fit_transform은 2차원 배열로 입력해야 한다. 
> `df['열 이름']`: **하나의 열**만 선택할 때 사용하며, 결과는 pandas **Series** 객체로 반환됩니다.
> `df[['열 이름']]`: **하나의 열**을 선택하더라도 **DataFrame** 형태로 결과를 반환합니다. 이는 선택하려는 열 이름이 리스트 (`['열 이름']`) 형태로 외부 대괄호 안에 들어가기 때문입니다.
    
##### SimpleImputer 메서드
- fit() : 계산된 통계정보를 객체 내부에 저장
- transform() : 저장된 정보로 결측치를 대체 


#### <font color="#2DC26B">데이터 인코딩</font> 
- 유형 변경 
```
cols = ['satisfaction', 'Gender', 'Customer Type', 'Type of Travel', 'Class']
df[cols]=df[cols].astype(str)
```
- 범주형 데이터를 수치형으로 변경 
```
df['satisfaction'].replace(['dissatisfied','satisfied'], [0,1], inplace=True)
```
- 원핫인코딩 : 신경망이 읽을 수 있게 '범주형 데이터'를 '숫자형 데이터'로 변환 


## 지도학습 
### 선형 회귀 : Linear Regression 
```
from sklearn.linear_model import Linear Regression 

reg = LinearRegression()

#학습을 위해 데이터를 변경 
x = np.array(x).reshape(-1,1)

reg.fit(x,y)
```


### 학습 데이터와 테스트 데이터 분리 : train_test_split
```
from sklearn.model_selection import train_test_split
x_train, y_train, x_test, y_test = train_test_split(
x, y, test_size=0.2, random_state=42) #random_state는 seed 설정 

```


### 모델 성능 평가지표 : MSE, RMSE
RMSE(평균제곱근 오차) : 이상치에 MSE보다 덜 민감하다. 
```
from sklearn.metrics import mean_squared_error

y_pred = reg.predict(x_test)

#RMSE 구하기 
rmse = mean_squared_error(y_test, y_pred, squared=False)
```


## 지도학습(DL) : Sequential 
```
import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense

### #Keras의 Sequential 모델 
#신경망 레이어의 가중치를 Glorot Uniform 방식으로 초기화하되, 무작위 초기화 과정을 항상 동일하게 수행하도록 시드 값을 42로 고정
initializer = tf.keras.initializers.GlorotUniform(seed=42) #시드 고정 
model = Sequential()
model.add(Dense(units=1, input_shape=(1,), kernel_initializer=initializer))
#하나의 값을 출력, 하나의 값을 입력, 가중치는 초기화!하는 Dense를 추가. 
#Dense : 완전 연결 레이어 
#activation : 활성화 함수 추가 


#모델을 학습시킬 최적화 방법을 설정하기 : compile
model.compile(optimizer='sgd', loss='mse', metrics=['mae'])
#-> 주로 회귀모델에서 사용하는 방식 

#모델 학습하기
model.fit(x_train, y_train, epochs=1000) #epochs : 얼마나? 학습할지
```

#### compile 메서드 
- optimizer : 모델은 손실함수의 값을 최소화하는 방향으로 이루어지는데, '어떤 방식으로 가중치를 업데이트할지?를 결정 '
	- sgd : Stochastic Gradient Descent (<span style="background:#fff88f">SGD, 확률적 경사 하강법</span>). 각 학습 단계마다 **하나의 무작위로 선택된 데이터 샘플**에 대한 손실 함수의 기울기를 계산하고, 그 기울기의 반대 방향으로 가중치를 조금씩 업데이트합니다.
	- adam :
	- rmsprop : 
	- adagrad : 
- loss : 손실함수. 
	- mse : 평균제곱오차. 회귀(regression) 문제, 즉 연속적인 값을 예측하는 문제에서 주로 사용
	- <font color="#2DC26B">categorial_crossentropy</font> : 분류(classification) 문제에서 주로 사용 
- metrics : 모델 성능 측정 지표를 리스트 형태로 저장. metrics=['mae', 'mse', 'accuracy']처럼 여러개도 지정할 수 있음. 
	- mae : 평균 제곱 오차. 이상치에 mse보다 덜 민감 



### Robust Scaler 

```
# 객체 생성 

scaler = RobustScaler()

scaled_data = scaler.fit_transform(data)


### Decision Tree 
```
### 

from sklearn.tree import DecisionTreeClassifier

df = DecisionTreeClassifier(random_state=1001,
max_depth=2)
```


### RandomForest : 의사결정 트리 기반의 앙상블 모델 
```
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(random_state=0,
max_depth=2, max_features=5)

rf.fit(x_train, y_train)
```


### 그래디언트 부스팅 : 부스팅 계열의 알고리즘
- 틀린 데이터에 가중치를 부여한다. 

