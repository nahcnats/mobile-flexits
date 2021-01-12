import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const PrevClocking = props => {
  return (
    <View style={styles.prevInfoContainer}>
      <Text style={styles.label}>Your previous clocking was: </Text>
      <View style={styles.prevInfo}>
        <Text style={styles.text}>Jan 7, 2021 10:00am</Text>
        <Text style={styles.label}>(IN)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  prevInfoContainer: {
    marginTop: 10
  },
  prevInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontFamily: 'open-sans-bold',
  },
  text: {
    fontFamily: 'open-sans',
  }
});

export default PrevClocking;
