import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const LoaderInline = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.primary} size='small' animating={props.loading} style={styles.indicator} />
      <Text>Fetching { props.label }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: {
    paddingRight: 20
  }
});

export default LoaderInline;
