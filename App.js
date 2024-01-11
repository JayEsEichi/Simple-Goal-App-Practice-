import { StyleSheet, View, FlatList, Button} from 'react-native';
import { useState } from 'react'; 
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

// button 태그는 style 속성을 지원하지 않는다.

// 태그들의 속성을 사용할 때 속성명을 입력할 시 왼쪽에 박스 아이콘이 존재하지 않는다면 속성으로서 지원하지 않는다는 의미이다.

// flex를 지정할 때 상위 wrapper에 flex 설정이 존재하지 않으면 스타일이 망가질 수도 있다.

// React Native도 일반적인 JavaScript 처럼 function을 통해 동작을 수행하게끔 만들어줄 수 있다.

// onChangeText 속성 : 반응형으로 텍스트를 실시간으로 상태 유지하면서 변화를 주고자할 때 사용하는 옵션

// React Native 태그 구성 요소에서는 속성에 함수를 넣을 때 () 함수 괄호를 넣지 않고 함수명만 넣어 동작시키게 한다. (매개변수가 있어도 마찬가지)

// onPress 속성 : JavaScript의 onClick 과 동일한 옵션으로 클릭 시 수행되는 동작을 담당한다.

// React 처럼 useState를 통해 상태 관리하여 반응형으로 즉각적인 데이터를 다룰 수 있게 한다.
// 형식 예 : const [enteredGoalText, setEnteredGoalText] = useState('');
// setEnterdGoalText에 입력한 데이터가 들어가고 enteredGoalText에 입력한 데이터가 반영되어 상태를 유지하게 된다.

export default function App() {

  const [modalIsVisible, setModalIsVisible] = useState(false); // 모달 노출 여부를 지정하기 위해 boolean 타입의 useState 로 상태 유지
  const [courseGoals, setCourseGoals] = useState([]); // 배열 형식으로 데이터 상태를 유지하기 위한 useState

  // 모달 노출 여부 지정 함수
  function startAddGoalHandler(){
    if(modalIsVisible == true){ 
      setModalIsVisible(false); // 만약 true 상태이면 모달 창을 끌 수 있도록 false 처리
    }else{
      setModalIsVisible(true); // 만약 false 상태이면 모달 창을 켤 수 있도록 true 처리
    }
  }

  // 버튼을 누를 때마다 해당 데이터를 배열 형식으로 데이터 상태 유지
  function addGoalHandler(enteredGoalText){
    // 배열 형식으로 데이터를 유지하므로 임의의 currentCourseGoals변수명으로 배열 변수를 생성하고 ... spread 함수를 사용하여 기존 배열 데이터를 유지, 오른쪽 enteredGoalText 변수로 데이터를 추가하여 업데이트
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, {text: enteredGoalText, id: Math.random().toString()}]); 
    // 새로운 데이터를 넣을 떄 객체의 속성들을 설정할 수 있다.
    // 위의 setCourseGoals를 통해 text 속성과 key 속성을 만들어주었다.
    // 이로써 text와 key를 가진 객체로 설정되게 된다.

    setModalIsVisible(false); // 목표 등록 성공 후 모달을 끄기
  };

  // 삭제 동작 함수
  function deleteGoalHandler(id){
    setCourseGoals(currentCourseGoals => {
        // 삭제 동작 시 데이터들이 담긴 배열 데이터에 filter 함수를 반영하고 애로우 function 을 통해 삭제하고자 하는 아이템의 인덱스와 일치하지 않는 데이터들만 나올 수 있도록 반영
        return currentCourseGoals.filter((goal) => goal.id !== id)
    }); 
  }

  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      <Button title="새로운 목표 추가" color="#6700CE" onPress={startAddGoalHandler}/>
      <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} cancelModal={startAddGoalHandler}/>
      <View style={styles.goalsContainer}>
        <FlatList data={courseGoals} renderItem={itemData => {
          return (
            <GoalItem text={itemData.item.text} onDeleteGoal={deleteGoalHandler} id={itemData.item.id}/>
          );
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        alwaysBounceVertical={false} />
      </View>
    </View>
    </>
  );
}

// [flex 스타일링]
// 지금 현재 전체 wrapper인 최상단 View 의 flex : 1은 내부에 flex가 적용된 모든 컨텐츠들의 flex 스타일링 내용의 전체를 1로 본다.
// 최상단 appContainer는 크게 InputContainer와 goalsContainer 2가지의 영역으로 구성되어있다.
// InputContainer와 goalsContainer 는 각각 flex가 1씩 부여 되어있으므로 영역을 두 개의 영역으로 구분하고 있는 flex 2의 총 영역을 appContainer는 1로 가지고 있는 것으로 판단한다.
// 따라서 지금 이 상태의 스타일링을 적용하면 딱 절반씩 flex 영역이 구분되어 스타일 영역이 지정되어 보여지게 된다.
// 한 쪽 flex만 숫자를 예를 들어 5로 지정한다면 전체 6분의 5 영역을 가지게 된다.

// map 함수를 통해 배열 형식의 데이터에 접근하여 가지고 있는 데이터들을 하나씩 조회하여 리스트를 만들어줄 수 있다.
// {courseGoals.map((goal) => 
//  <View style={styles.goalItem} key={goal}>
//   <Text style={styles.goalText}>
//     {goal}
//   </Text>
//  </View>
// )}

// [ScrollView]
// ScrollView 로 지정한 컨텐츠는 스크롤이 가능한 영역으로 바뀐다.
// ScrollView를 사용하면 기존에 flex 옵션이 적용되어있었다면 해당 flex는 반영되지 않기 때문에 상위에 View 태그 wrapper를 설정하고 그곳에 flex를 넣는 것이 좋다.
// ScrollView에서 지원하는 속성들을 사용하면 스크롤 시 특수한 동작들을 수행할 수 있게 된다.
// 예로, alwaysBounceVertical을 false로 지정하면 기본값으로 내용들이 몇 개가 있든 스크롤이 튕기는 동작을 제어할 수 있다.
// ScrollView 뿐만 아니라 설정할 수 있는 속성에 대해서 React Native 사이트에서 확인하고 설정할 수 있다.
// 하지만, ScrollView는 컨텐츠 내용이 많아지면 많아질수록 성능이 저하될 가능성이 존재하므로 완벽하지 않다.
// !!! - 컨텐츠 특정 개수가 정해져있을 경우에 적합하고 그 이외의 계속해서 컨텐츠가 늘어날 가능성이 높거나 대량의 개수의 컨텐츠들이 존재할 경우에는 다른 방식이 적합하다고 볼 수 있다.

// [FlatList]
// FlatList는 비교적 제한적인 ScrollView 를 대체할 수 있는 기능이다.
// 앞서 말했던 것처럼 ScrollView는 제한적이라 컨텐츠 내용이 많아지면 많아질수록 성능이 저하될 가능성이 존재하므로 완벽하지 않다.
// 그래서 컨텐츠 특정 개수가 정해져있을 경우에 적합하고 그 이외의 계속해서 컨텐츠가 늘어날 가능성이 높거나 대량의 개수의 컨텐츠들이 존재할 경우에는 다른 방식이 적합하다고 볼 수 있다.
// ScrollView를 대체할 수 있으므로 구조가 비슷하다고 볼 수 있다.
// 때문에 기본적으로 스크롤 기능도 탑재되어있다.
// FlatList는 ScrollView 보다 성능적으로 좋은 만큼 사용 편의성도 좋다.
// ScrollView를 사용했을 때 리스트화 되었던 데이터들은 기본적으로 배열 형식의 데이터들을 map 함수를 통해 리스트화하여 보여지게끔 하였는데
// FlatList는 이 map 함수를 사용할 필요없이 하나의 태그로 만들어줄 수 있다.

// <FlatList data={courseGoals} renderItem={itemData => {
//   return (
//     <View style={styles.goalItem} key={itemData.index}>
//       <Text style={styles.goalText}>
//         {itemData.item}
//       </Text>
//     </View>
//   );
// }} alwaysBounceVertical={false} />

// 길이는 그렇게 많이 줄어들진 않았지만 하나의 태그 내에서 renderItem 속성을 통해 컨텐츠들의 리스트화를 구성해줄 수 있다.

// FlatList의 data 속성에 리스트를 만들 데이터 변수를 넣고, renderItem 속성을 통해 넣은 데이터를 대상으로 내부 데이터들을 렌더링시켜준다.
// itemData를 매개변수로 입력하면 내부 아이템 뿐만 아니라 메타 데이터까지 사용할 수 있다. (itemData.index, itemData.item 등등)
// item을 매개변수로 입력하면 단순히 내부 아이템 만을 사용할 수 있다.

// 만약 렌더링하고자 하는 원천 데이터에 key 속성이 부여되어있다면 key 속성을 따로 렌더링 하고자하는 데이터들에 부여하지 않아도 자동적으로 key가 부여된다.
// 그런데 key를 부여하지 않고 다른 속성을 만들어주고 이것을 key로 지정하고 싶다면 FlatList의 keyExtractor 속성을 사용하여 key 로 지정해줄 수도 있다.
// keyExtractor={(item, index) => {
//   return item.id;
// }}
// keyExtractor는 기본적으로 화살표 function으로 지정할 수 있는데, 디폴트로 item, index 두 개의 매개 변수를 받는다.
// item에는 렌더링되고 있는 원천 데이터가 기본적으로 들어가있다.
// return 문을 통해 렌더링 되고 있는 아이템의 key로 지정하고자 하는 속성 명을 기입하면 해당 속성이 key로 지정된다.
// 위의 예시 코드에서는 id 속성을 key로 지정하였다.

// ===========================================================================================================
// 기존에 통합으로 사용되던 GoalItme을 component로 분리하여 따로 관리하여 import 후 사용하였다.
// 호출할 때는 import 한 파일을 태그화 시켜서 사용하며, 속성을 추가하여 사용하면 props가 컴포넌트에 전달되어 매개변수처럼 사용할 수 있습니다.
// 위에서는 import 한 GoalItem 컴포넌트에 text라는 속성명으로 props 를 전달해주었습니다.

// 마찬가지로 GoalInput 도 분리해주었습니다.
// 텍스트를 입력하고 버튼을 누르는 View 컨텐츠를 따로 분리하여 컨텐츠랑 스타일도 분리하여 component 화 시켜주었습니다.
// GoalInput은 onAddGoal 이라는 속성명으로 함수를 props 로서 넘겨받습니다.

// ===========================================================================================================
// 아이템을 눌렀을 때 삭제하기 위해 삭제 함수를 만들어주고 component화 된 GoalItem에 props로 해당 함수를 넘겨주었다.

// ===========================================================================================================
// 버튼을 누르면 startAddGoalHandler 함수가 동작되어 모달 노출 여부를 판단하게 되고 boolean 값이 지정된다.
// 지정된 boolean 값을 모달 화된 GoalInput 컴포넌트에 props로 넘기게 되고 GoalInput 컴포넌트에선 이 props를 통해 visible 속성에 넣어 true 이면 노출되게끔 지정해주었다.

// ===========================================================================================================
// expo에서는 StatusBar의 상태를 지정할 수 있는 기능을 지원한다.
// 핸드폰을 실행했을 때 최상단에 시간이랑 와이파이 로고가 출력되는 부분이 상태 바이다.
// expo-status-bar에서 StatusBar를 import 받고 StatusBar 태그를 사용하여 지정할 수 있다.
// 이 때, StatusBar를 사용하려면 jsx 코드를 사용해야 하기 때문에 아무런 태그 명이 없는 <> </> 태그 코드로 wrapping 시켜주어야 한다.


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },
  goalsContainer: {
    flex: 5
  },
});
