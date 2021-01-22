import React, { useReducer, useCallback } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  Alert
} from 'react-native';

import Input, { FORM_INPUT_UPDATE } from '../components/UI/Input';
import formReducer from '../components/util/formReducer';

import Colors from '../constants/Colors';

const ForgotPasswordScreen = props => {

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      userId: '',
    },
    inputValidities: {
      userId: false,
    },
    formIsValid: false
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const submitHandler = () => {
    Alert.alert('Success', 'Please check your email for the temporary password', [{text: 'Ok', onPress: () => props.navigation.goBack()}]);
  }

  return (
    <KeyboardAvoidingView
      behavior='height'
      keyboardVerticalOffset={0}
      style={styles.container}
    >
      <View style={styles.center}>
        <View style={styles.formContainer}>
          <View style={styles.instructions}>
            <Text style={styles.text}>
              Please enter your User Id below and tap <Text style={styles.label}>Finish</Text> to save.
            </Text>
          </View>
          <Input
              id='userId'
              label='User ID'
              keyboardType='default'
              required
              autoCapitalized='none'
              errorText='Please enter valid user ID'
              onInputChange={inputChangeHandler}
            />
          <View style={styles.buttonContainer}>
            <Button
              title='Finish'
              color={Colors.primary}
              disabled={!formState.formIsValid}
              onPress={submitHandler} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export const forgotPasswordScreenOptions = navData => {
  return {
    headerTitle: 'Forgot Password',
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  instructions: {
    paddingBottom: 30
  },
  text: {
    fontFamily: 'open-sans'
  },
  label: {
    fontFamily: 'open-sans-bold'
  },
  formContainer: {
    width: '80%'
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

export default ForgotPasswordScreen;
