import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [input, setInput] = useState('0');

  const handlePress = (value) => {
    if (value === 'C') {
      setInput('0');
    } else if (value === '=') {
      try {
        // Replace 'x' and '÷' with '*' and '/' for eval function
        const formattedInput = input.replace(/x/g, '*').replace(/÷/g, '/');
        setInput(eval(formattedInput).toString());
      } catch (e) {
        setInput('Error');
      }
    } else {
      if (input === '0') {
        setInput(value);
      } else {
        setInput(input + value);
      }
    }
  };

  const renderButton = (value) => {
    const isOperator = ['÷', 'x', '-', '+', '='].includes(value);
    const isClear = value === 'C';
    return (
      <TouchableOpacity
        key={value}
        style={[
          styles.button,
          value === '0' && styles.buttonZero,
          isOperator && styles.buttonOperator,
          isClear && styles.buttonClear
        ]}
        onPress={() => handlePress(value)}
      >
        <Text style={[styles.buttonText, isOperator && styles.buttonTextOperator]}>{value}</Text>
      </TouchableOpacity>
    );
  };

  const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', 'x'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C']
  ];

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{input}</Text>
      </View>
      {buttons.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map(renderButton)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  display: {
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  displayText: {
    fontSize: 48,
    color: '#000',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  buttonZero: {
    width: 170, // Making '0' button wider
  },
  buttonOperator: {
    backgroundColor: '#ffa500',
  },
  buttonClear: {
    backgroundColor: '#d9d9d9',
  },
  buttonText: {
    fontSize: 32,
    color: '#000',
  },
  buttonTextOperator: {
    color: '#fff',
  },
});

export default App;