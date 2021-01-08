import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Greeting = props => {
  return (
    <View style={styles.container}>
        <Text>Hello, Stanley</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20
  }
});

export default Greeting;
