import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Greeting = props => {
  const userFullName = useSelector(state => state.auth.fullname);

  return (
    <View style={styles.container}>
      <Text>Hello, { userFullName }</Text>
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
