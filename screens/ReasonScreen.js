import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Colors from '../constants/Colors';

const ReasonScreen = props => {
  useFocusEffect(() => {
    console.log('ReasonScreen focused');
  }, [props.navigation]);

  return (
    <View style={styles.container}>
        <Text>ReasonScreen</Text>
    </View>
  );
}

// TODO: Add reload / refresh function

export const reasonScreenOptions = navData => {
  return {
    headerTitle: 'Clocking Reason',
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ReasonScreen;
