import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

// Components
import Button from './components/Button'

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [inputText, setInputText] = useState('')
  const [todoList, setTodoList] = useState<string[]>([])

  const onHandleBack = () => {
    setInputText('')
    setShowModal(false)
  }
  const onHandleSubmit = () => {
    if (!inputText) {
      return
    }

    setTodoList([...todoList, inputText])
    setInputText('')
    setShowModal(false)
  }

  const onHandleRemoveItem = (id: string) => {
    const filteredItems = todoList.filter((item, idx) => {
      idx.toString() !== id
    })
    setTodoList(filteredItems)
  }

  console.log(todoList)
  return (
    <View style={styles.container}>
      <Button text='Add Todo' onPressButton={() => setShowModal(true)} />
      <View>
        {todoList.length > 0 &&
          todoList.map((item, idx) => (
            <TouchableOpacity
              onPress={() => onHandleRemoveItem(idx.toString())}
            >
              <Text key={item} style={styles.listStyle}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
      </View>

      <Modal visible={showModal} animationType='slide'>
        <View style={styles.centerView}>
          <TextInput
            onChangeText={setInputText}
            value={inputText}
            placeholder='Enter Todo'
            style={styles.input}
          />
          <View style={styles.buttonRow}>
            <Button text='Back' onPressButton={onHandleBack} />
            <Button text='Submit' onPressButton={onHandleSubmit} />
          </View>
        </View>
      </Modal>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  listStyle: {
    paddingVertical: 10,
  },
})
