import React from 'react';
import { View, Text, ActivityIndicator, Modal, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const LoaderModal = ({ loading, label }) => {
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={loading}
      onRequestClose={() => {
        return null;
      }}
    >
      <View style={styles.loaderBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Text style={styles.loaderText}>Loading { label }. Please wait...</Text>
          <ActivityIndicator color={Colors.primary} size='large' animating={loading} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loaderBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(0,0,0,0.4)'
  },
  activityIndicatorWrapper: {
      backgroundColor: 'rgba(0,0,0,0.4)',
      height: 100,
      width: 200,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
  },
  loaderText: {
    fontFamily: 'open-sans',
    color: Colors.primary
  }
});

export default LoaderModal;