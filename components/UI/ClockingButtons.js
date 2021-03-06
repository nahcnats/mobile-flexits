import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const ClockingButtons = props => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}><Text style={styles.label}>Select your clocking action</Text></View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={props.indicator === 1 ? styles.inBtnBig : styles.outBtnBig}
          onPress={() => {
            props.indicator === 1 ? props.onSelected(1) : props.onSelected(2)
          }}
        >
          <Text style={styles.label}>{props.indicator === 1 ? 'IN' : 'OUT'}</Text>  
        </TouchableOpacity>
        <TouchableOpacity
          style={props.indicator === 1 ? styles.outBtnSmall : styles.inBtnSmall}
          onPress={() => {
            props.indicator === 1 ? props.onSelected(2) : props.onSelected(1)
          }}
        >
          <Text style={styles.label}>{props.indicator === 1 ? 'OUT' : 'IN'}</Text>  
        </TouchableOpacity>
      </View>
    </View>
  );
}

const bigButtonSize = 140;
const smallButtonSize = 80;

const styles = StyleSheet.create({
  container: {  
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    paddingVertical: 30
  },  
  label: {
    fontFamily: 'open-sans-bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  inBtnSmall: {
    justifyContent: "center",
    alignItems: "center",
    width: smallButtonSize,
    height: smallButtonSize,
    borderRadius: smallButtonSize/2,
    backgroundColor: '#00d800',
  },
  outBtnSmall: {
    justifyContent: "center",
    alignItems: "center",
    width: smallButtonSize,
    height: smallButtonSize,
    borderRadius: smallButtonSize/2,
    backgroundColor: '#ffe039'
  },
  inBtnBig: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00d800',
    width: bigButtonSize,
    height: bigButtonSize,
    borderRadius: bigButtonSize/2,
  },
  outBtnBig: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ffe039',
    width: bigButtonSize,
    height: bigButtonSize,
    borderRadius: bigButtonSize/2,
  },
});

export default ClockingButtons;
