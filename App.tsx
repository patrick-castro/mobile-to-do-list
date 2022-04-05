import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { v4 as uuidv4 } from 'uuid'

// Components
import Button from './components/Button'

interface BasicObject {
  [key: string]: any
}

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [inputText, setInputText] = useState('')
  const [todoList, setTodoList] = useState<BasicObject[]>([])

  const onHandleBack = () => {
    setInputText('')
    setShowModal(false)
  }
  const onHandleSubmit = () => {
    if (!inputText) {
      return
    }

    setTodoList([...todoList, { text: inputText, id: uuidv4() }])
    setInputText('')
    setShowModal(false)
  }

  const onHandleRemoveItem = (id: string) => {
    const filteredItems = todoList.filter((item) => item.id !== id)
    setTodoList(filteredItems)
  }

  const renderItem = ({ item }: BasicObject) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => onHandleRemoveItem(item.id)}
      >
        <Text key={item.text} style={styles.listStyle}>
          {item.text}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Button text='Add Todo' onPressButton={() => setShowModal(true)} />
      <View>
        <FlatList
          data={todoList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <Modal visible={showModal} animationType='slide'>
        <View style={styles.centerView}>
          <TextInput
            onChangeText={setInputText}
            value={inputText}
            placeholder='Enter Todo'
            style={styles.input}
            autoFocus={true}
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
