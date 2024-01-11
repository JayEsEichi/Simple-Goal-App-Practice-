import {StyleSheet, Button, TextInput, View, Modal, Image} from 'react-native';
import {useState} from 'react';

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState(''); // 단일 입력 데이터 상태를 유지하기 위한 useState

    // 텍스트를 입력할 때마다 useState를 통해 단일 입력 데이터 상태 유지
    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText);
    };

    // props로 전달받은 함수를 실행하며 버튼 클릭 후 텍스트 박스의 잔여 텍스트를 초기화
    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../assets/image/goal.png')}/>
                <TextInput
                    style={styles.textInput}
                    placeholder='입력하시오'
                    onChangeText={goalInputHandler}
                    value={enteredGoalText}
                    />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="클릭" onPress={addGoalHandler} color="#5e0acc"/>
                    </View>
                    <View style={styles.button}>
                        <Button title="취소" onPress={props.cancelModal} color="#f31282"/>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

// 태그 안에 value 속성을 사용함으로서 버튼 클릭 후 초기화된 상태를 유지한다.

// ====================================================================================
// 텍스트를 입력하고자 하는 컴포넌트를 modal화 하여 만들어주고 싶을 때는 Modal을 import 받아 사용해야한다.
// 이제 Modal 태그를 사용하여 컨텐츠를 감싸면 해당 컨텐츠들은 모달로서 만들어지게 된다.
// 이 떄 Modal 태그에는 animationType 과 같이 특수 효과를 주거나 visible 속성을 통해 노출 여부를 지정할 수 있다.
// 이 visible 속성 여부가 중요한데 true, false에 따라 노출 여부가 정해진다.

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column', // row 로 지정하면 행으로 배치, column으로 지정하면 열로 배치
        //justifyContent: 'space-between', // 컨텐츠 정렬 속성
        justifyContent: 'center', // 컨텐츠 정렬 속성
        alignItems: 'center', //
        padding: 16,
        //marginBottom: 24, // input 영역의 바깥쪽 아래에 공백을 지정
        //borderBottomWidth: 1, // input 영역의 아래 부분의 너비를 지정
        //borderBottomColor: '#cccccc', // input 영역의 아래 부분의 색상을 지정
        backgroundColor: '#311b6b'
    },
    image: {
        width: 100,
        height: 100,
        margin: 20
    },
    textInput: {
        borderWidth: 1, // 테두리 너비
        borderColor: '#cccccc', // 테두리 색상
        width: '100%', // 텍스트 input 칸의 너비를 지정
        padding: 8, // text input 내부의 여유 공간 지정
        backgroundColor: 'white'
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: 'row'
    },
    button: {
        width: 100,
        marginHorizontal: 8
    }
});