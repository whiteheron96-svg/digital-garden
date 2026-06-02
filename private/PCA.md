
import pandas as pd

pca = PCA(n_components=10)
reduced_data = pca.fit_transform(std_data) 

<span style="background:#fff88f">###fit_transform은 array를 반환한다. </span>

-> 그래서 DataFrame으로 변경해주어야 한다. 

pca_df = pd.Dataframe(reduced_data)


#### pd.DataFrame과 to_frame()의 차이는? 

- pd.DataFrame : numpy <font color="#2DC26B">array</font>를 데이터프레임으로 반환
	- fit_transform이 array의 형태로 반환해서 
- .to_frame() : pandas의 <font color="#2DC26B">Series</font>를 데이터프레임으로 반환 



> [!NOTE] 적절한 메서드를 사용하기 위해...
> type()으로 어떤 타입인지 확인하고 변경을 하도록 하자! 


