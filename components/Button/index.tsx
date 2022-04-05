import React, { FC } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'

interface Props {
  text: string
  onPressButton: Function
}

const Button: FC<Props> = ({ text, onPressButton }) => {
  return (
    <TouchableOpacity onPress={() => onPressButton()} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#192841',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
})

export default Button
