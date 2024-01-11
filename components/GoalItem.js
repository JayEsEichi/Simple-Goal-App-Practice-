import {StyleSheet, View, Text, Pressable} from 'react-native';

function GoalItem(props) {
    return (
        <View style={styles.goalItem}>
            <Pressable
                android_ripple={{
                    color: '#210644'
                }}
                onPress={props
                    .onDeleteGoal
                    .bind(this, props.id)}
                style={({pressed}) => pressed && styles.pressedItem}>
                <Text style={styles.goalText}>
                    {props.text}
                </Text>
            </Pressable>
        </View>
    );
};

// Button처럼 누르는 동작에 특화된 태그가 아닌 View 와 같이 일반적인 영역 태그들을 누를 때 동작되게 하기 위해서는 React
// Native의 Pressable을 import 받아 사용하는 것이 좋다. Pressable 뿐만이 아니라 터치 동작을 수행하는
// Touchable 과 같은 기능도 존재하니 이후에 상황에 맞는 곳에 사용하면 될 것이다. 이 Pressable 태그로 wrapping을
// 하게 되면 해당 영역은 누르게 되면 동작되게 된다. 여기서는 props로 item을 삭제하는 동작 함수를 넘겨받았기 때문에 해당 동작
// 함수를 Pressable의 onPress 속성에 넣어 삭제되게끔 매핑해주었다.
// =====================================================================================================================
// props로 넘겨받은 삭제 함수에 bind 함수를 적용하여 누른 아이템의 id props를 기준으로 바인딩하여 삭제될 수 있도록 처리하였다. 
// Pressable의 andoid_ripple 속성으로 컨텐츠를 클릭 시 파문 효과를 줄 수도 있다.
// 안드로이드에서는 android-ripple 속성이 동작되지만 애플 관련 기기들에서는 동작되지 않는다.
// 동일한 효과를 주고 싶을 때는 inline 으로 style 속성을 활용하여 적용해야한다.

// Pressable 태그에 style={({pressed}) => pressed && styles.pressedItem} 

// 스타일링 변수 내용 추가
// pressedItem: {
//     opacity: 0.5
// },

// 위와 같이 내용을 추가하면 클릭 시 스타일링이 적용된다.



export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 8, // 바깥 여백 주기
        //padding: 8, // 내부 여백 주기 - 만약 android-ripple 과 같이 컨텐츠의 전체적으로 효과를 주려면 padding 옵션을 지워야 완전히 컨텐츠가 전체적으로 효과가 적용된다.
        borderRadius: 6, // 테두리 둥글게 설정 - ios 에서는 Text 태그에 해당 옵션을 지원하지 않음
        backgroundColor: '#5e0acc',
        color: 'white'
    },
    pressedItem: {
        opacity: 0.5
    },
    goalText: {
        color: 'white',
        padding: 8
    }
});

// App.js는 프로젝트가 실행되어 앱에서 실행될 때 최종적으로 나타날 결과 파일이다. 하지만 이 App.js에 모든 컴포넌트의 내용을
// 통합해서 관리하는 것은 비효율적이며 그렇게 React Native를 운영해서는 안된다. 따라서, React 처럼 나눌 수 있는 부분은
// 나누고 구분할 수 있는 부분은 구분할 수 있는 component 분리 및 관리가 반드시 필요하다. 여기서는 기존의 App.js에서 만들었던
// 컨텐츠 리스트들을 따로 분리하여 component화 시켜주었다. 스타일 또한 마찬가지로 분리하여 구성하였다. 분리한 component를
// export 시키고 App.js 나 사용하고자 하는 파일에서 import 시켜주면 사용할 수 있다.