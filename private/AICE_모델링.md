
### 로지스틱 회귀
```
x_train = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]

y_train = [0]*7+[1]*8


from sklearn.linear_model import LogisticRegression

logi_reg = LogisticRegression()

x_train = np.array(x_train).reshape(-1, 1) ### 리스트의 데이터 차원을 2차원으로 변경하기 

logi_reg.fit(x_train, y_train)


print('intercept:', logi_reg.intercept_)
print('coef:', logi_reg.coef_)
```

### 결측치 대체하기 
```
###SimpleImputer 활용

df.isnull().sum() ##null값 개수 확인 

from sklearn.impute import SimpleImputer

mean_imputer = SimpleImputer(strategy="mean")
df["Arrival Delay in Minutes"] = mean_imputer.fit_transform(df[["Arrival Delay in Minutes"]])
```

**`fit()`과 `transform()` 메서드:**

`SimpleImputer`는 사이킷런의 다른 변환기(transformer)와 마찬가지로 `fit()`과 `transform()` 메서드를 사용합니다.

- **`fit(X)`**: 입력 데이터 `X`를 학습하여 각 특성에 대한 대체 전략(평균, 중앙값, 최빈값 등)을 계산합니다.
- **`transform(X)`**: 학습된 결과를 바탕으로 입력 데이터 `X`의 결측치를 실제로 대체합니다.

일반적으로 `fit()` 메서드를 먼저 호출하여 Imputer를 데이터에 적합시킨 후, `transform()` 메서드를 사용하여 실제 결측치 대체 작업을 수행합니다. `fit_transform(X)` 메서드를 한 번에 사용하여 학습과 변환을 동시에 수행할 수도 있습니다.

---

#### 왜 이중 괄호를 쓸까? : 데이터프레임으로 반환! 

- **`df["Arrival Delay in Minutes"]`**: 이 코드는 DataFrame `df`에서 `"Arrival Delay in Minutes"`라는 이름의 <span style="background:#fff88f">**Series**를 반환</span>합니다. Series는 1차원 레이블이 지정된 배열과 유사하며, DataFrame의 단일 열을 나타냅니다.
    
- **`df[["Arrival Delay in Minutes"]]`**: 이 코드는 DataFrame `df`에서 <span style="background:#d3f8b6">`"Arrival Delay in Minutes"`라는 이름의 열을 **포함하는 새로운 DataFrame**을 반환</span>합니다. 결과는 하나의 열만 가진 2차원 구조의 DataFrame입니다.

### 범주형 데이터를 수치화
```
categories = pd.Categorical(
df['Class'],
categories=['Eco', 'Eco Plus', 'Business'],
ordered=True)

labels, unique=pd.factorize(categories,sort=True)
```