
```
###구글 코랩에서 csv 불러오기 

import pandas as pd

import numpy as np

from google.colab import drive

drive.mount('/content/gdrive')

flight = pd.read_csv ('/content/gdrive/My Drive/Colab Notebooks/Clean_Dataset.csv', encoding = "cp949")
```


```
### 기본적인 데이터셋 확인 방법 

#### 행 열 개수 구하기
flight.shape

#### 요약 통계량 구하기 (평균, median, percentile) 
flight.describe()

#### 컬럼명, null이 아닌지 파악하기 
flight.info()
```

```
### 인덱싱하기

####인덱스 바꾸기_pandas 아니라 numpy 
flight.index = np.arange(300, 200253)

####인덱싱에는 두 가지 방법이 있다. loc과 iloc
flight.loc[[100,200,300], [‘flight’]] #index 이름을 찾는다. 
flight.iloc[[100,200,300], [2]] #index 순번을 찾는다. 
```

```
####다중 인덱싱 - Numeric이 아닌 칼럼이 포함되어있을 경우 

# Select only numeric columns for calculating the mean

numeric_columns = flight.select_dtypes(include=np.number).columns

flight.groupby(['airline', 'arrival_time'])[numeric_columns].mean()
```


### 250407_데이터 병합하기 (pd.concat)
- ignore_index = False(default값_인덱스를 무시), True(인덱스를 새로 부여)
- Tip : 딕셔너리 구조에서 index를 지정할 때는 {} 안이 아니라 밖에다 적어줘야 한다.
- axis = 0(행), 1(열)
- join = 'inner'(내부조인), 'outer'(외부조인)
- verify_integrity = True(인덱스가 중복인 경우를 찾아냄)

```
###index가 중복인 경우 : verify integrity (default값은 False)

df5 = pd.DataFrame({'A':['A0','A1','A2'],'B':['B0','B1','B2'],'C':['C0','C1','C2'],

'D':['D0','D1','D2']}, index = ['I0','I1','I2'])

df6 = pd.DataFrame({'A':['AA2','A3','A4'], 'B':['BB0','B3','B4'], 'C':['CC2','C3','C4'],

'D':['DD2','D3','D4']}, index = ['I2','I3','I4'])

pd.concat([df5, df6], verify_integrity=True) 
##I2라는 인덱스가 중복이어서, ValueError가 발생한다.


-----------------------------------------------------------------------------

ValueError                                Traceback (most recent call last)

[<ipython-input-37-effc43a713f2>](https://localhost:8080/#) in <cell line: 0>()
----> 1 pd.concat([df5, df6], verify_integrity=True)

---

5 frames

---

properties.pyx in pandas._libs.properties.CachedProperty.__get__()

properties.pyx in pandas._libs.properties.CachedProperty.__get__()

[/usr/local/lib/python3.11/dist-packages/pandas/core/reshape/concat.py](https://localhost:8080/#) in _maybe_check_integrity(self, concat_index)
    772             if not concat_index.is_unique:
    773                 overlap = concat_index[concat_index.duplicated()].unique()
--> 774                 raise ValueError(f"Indexes have overlapping values: {overlap}")
    775     776 

ValueError: Indexes have overlapping values: Index(['I2'], dtype='object')
```

### 250408_데이터 병합(2)
#### 실수할 수 있는 요소 : numpy의 arange : arrange가 아니라, arange

### merge 함수 
`pd.merge(customer, orders, on='customer_id', how='left')`
: 병합 방식은 inner(내부 조인, 교집합)이 디폴트 값임. left는 왼쪽에 맞춰서 조인 


> [!NOTE] 조인 업무 활용 아이디어 
> 지금까지는 데이터를 불러올 때, vlookup을 사용했는데, 앞으로는 조인을 사용해서 데이터를 합쳐야 겠다! 
> (코드 하나로 하면 간편할 듯)

<span style="background:#d3f8b6">궁금증 : join을 엑셀에서 활용할 수 있는 방법은? </span>

```
###인덱스를 지정하여 데이터프레임을 합치는 방법

cust1 = customer.set_index('customer_id')
order1 = orders.set_index('customer_id')

pd.merge(cust1, order1, left_index=True, right_index=True)

#결국 이 코드는 인덱스를 지정해서 inner 조인을 하는 방법. pd.merge(customer, orders, on='inner')와 같다.
```

개인적으로는, index를 지정해서 join해야 할 필요성은 잘 모르겠다. 


## 데이터 탐색하기

### 일변량 비시각화 탐색

```
###지정 인덱스인 1번째 칼럼 삭제하기

df.drop([df.columns[0]], axis=1, inplace=True) 
```

#inplace=True는 변수 변경이 <font color="#2DC26B">원본 데이터 프레임에 바로 저장됨</font>

`df.describe() #수치형 데이터의 요약통계량 확인하기`

`df.describe(include='all') #unique는 고유데이터 수, top은 최빈값, freq는 최빈값이 존재하는 개수`

include='all'을 지정하면 문자형 또는 범주형 데이터들의 고유 데이터 수, 최빈값, 최빈값 개수 확인이 가능하다. 

```
###범주형 데이터의 빈도표 확인하기

print(df["airline"].value_counts())

print(df["source_city"].value_counts())

print(df["destination_city"].value_counts())
```

> 범주마다 빈도표를 확인할 수 있어 좋다. 

- 수치형 데이터 : 상관관계 확인 (corr)
- 범주형 데이터 : 교차표로 확인 (crosstab)


### 250409_시각화 데터 탐색하기

```
days_left = df.groupby('days_left').agg({col: 'mean' for col in df.select_dtypes(include=np.number).columns})

#The .agg() method is used with a dictionary to specify the aggregation function for each column.

#We use a dictionary comprehension to create a dictionary where keys are the numeric columns and values are the aggregation function 'mean'.

#This way, we only calculate the mean for numeric columns and avoid the error.
```

> <font color="#2DC26B">df.select_dtypes(include=np.number).columns : 데이터프레임에서 숫자인 칼럼들만 골라줘! </font>

```
### 항공사에 따라 가격 평균 비교하기

# 가격 평균 만들기

airline = df.groupby(['airline']).mean
airline = df.groupby(['airline']).agg(({col : 'mean' for col in df.select_dtypes(include=np.number).columns}))

# airline의 항목들을 리스트로 만들기
airline


#인덱스를 리스트로 만들기

label = airline.index

plt.figure()

  
#인덱스를 X, 평균 가격을 Y로 하는 막대 그래프 그리기

plt.bar(label, airline['price'])

plt.xlabel("Airline")

plt.ylabel("Price")

plt.show()
```


#### 빈도표 만들어서 pie 그래프 그리기 
```
###파이 차트 만들기


#먼저 빈도표를 만들자

departure_time = df['departure_time'].value_counts()
plt.figure(figsize=(10,6))


#파이 그래프 그리기

plt.pie(departure_time, labels=departure_time.index, autopct='%.1f%%')
plt.show()

```


```
#Scatter plot (원하는 값을 가진 칼럼만 선택해서 그리기)
df_eco = df[df['class'] == 'Economy'] #클래스가 이코노미인 칼럼만 골르는 것.


#df['class'] == 'Economy' 코드를 짜게 되면 이코노미인 경우 True, 아닌 경우 False가 나오게 된다.

#이 때, df[]를 밖에 한번 더 씌워주어야 True인 값만 선택해서 df로 만들 수 있는 것

plt.figure(figsize=(16, 8))

plt.scatter(y=df_eco['price'], x=df_eco['duration'])

plt.xlabel("Duration")

plt.ylabel("Price")

plt.show()
```


### 250411_ Seaborn 라이브러리 

```
### seaborn 시각화 라이브러리 활용하기


#### seaborn 설치하기

%pip install seaborn

import seaborn as sns

sns.catplot(y="airline", x='price', col='class', data=df)

### 선형 회귀 모델 그래프

sns.lmplot(x="duration", y="price", data=df_eco, line_kws={'color':'red'})

### 빈도그래프 그리기

sns.countplot(x="airline", hue="class", data=df) ###hue 파라미터는 범례를 추가하는 것.

### 히트맵 그리기

sns.heatmap(heat)

### seaborn의 칼라 팔레트 참고 홈페이지 : seaborn.pydata.org/tutorial/color_pallettes.html
```

### 그래디언트 부스팅
```
from tensorflow.keras.datasets import mnist
import matplotlib.pyplot as plt

(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train = x_train[:2000]
y_train = y_train[:2000]
x_test = x_test[:2000]
y_test = y_test[:2000]

plt.imshow(x_train[7], cmap='Greys')
plt.show()

plt.imshow(x_train[1], cmap='Greys')
plt.show()

x_train = x_train.reshape(-1,784) #데이터를 2차원으로 바꿔주기 
x_test = x_test.reshape(-1, 784)

#세 모델 학습 비교하기 
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import GradientBoostingClassifier

dct = DecisionTreeClassifier(random_state=0)
dct.fit(x_train, y_train)

acc_train_dct = dct.score(x_train, y_train)
acc_test_dct = dct.score(x_test, y_test)

rfc = RandomForestClassifier(random_state=0)
rfc.fit(x_train, y_train)

acc_train_rfc = rfc.score(x_train, y_train)
acc_test_rfc = rfc.score(x_test, y_test)

gbc = GradientBoostingClassifier(random_state=0, verbose=1)
gbc.fit(x_train, y_train)

acc_train_gbc = gbc.score(x_train, y_train)
acc_test_gbc = gbc.score(x_test, y_test)

print(f"""의사결정나무 : train_acc = {round(acc_train_dct, 3)}, test_acc = {round(acc_test_dct, 3)}""")
print(f"""랜덤포레스트 : train_acc = {round(acc_train_rfc, 3)}, test_acc = {round(acc_test_rfc, 3)}""")
print(f"""그래디언트 부스팅 : train_acc = {round(acc_train_gbc, 3)}, test_acc = {round(acc_test_gbc, 3)}""")

```

#### 데이터를 2차원으로 바꾸기 
x_train = x_train<span style="background:#fff88f">.reshape(-1,784)</span> 데이터를 2차원으로 바꿔주기 
x_test = x_test.reshape(-1, 784)