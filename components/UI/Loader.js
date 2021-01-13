import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const Loader = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.primary} size={props.size} animating={props.loading} style={{ paddingBottom: 3}} />
      <Text>{ props.label }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Loader;
