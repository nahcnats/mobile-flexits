import React, { useEffect, useState, useCallback, useReducer } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Button,
  Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderMenuButton from '../components/UI/HeaderMenuButton';
import HeaderLogoutButton from '../components/UI/HeaderLogoutButton';
import CustomHeaderButton from '../components/UI/CustomHeaderButton'
import Input, { FORM_INPUT_UPDATE } from '../components/UI/Input';
import LoaderModal from '../components/UI/LoaderModal';
import Greeting from '../components/Greeting';
import formReducer from '../components/util/formReducer';

import Colors from '../constants/Colors';

const ChangePasswordScreen = props => {
  const [isSaving, setIsSaving] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      newPassword: '',
      confirmPassword: '',
    },
    inputValidities: {
      newPassword: false,
      confirmPassword: false,
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

  const saveRecordHandler = () => {    
    if (
      formState.inputValues.newPassword !== formState.inputValues.confirmPassword
    ) {
      Alert.alert('Password Mismatch', 'New password and confirm password do not match!', [{ text: 'Ok' }]);
      return;
    }
    Alert.alert('Success', 'Password changed!', [{ text: 'Ok', onPress: () => props.navigation.navigate('HomeStack') }]);
  }

  return (
    <KeyboardAvoidingView
      behavior='height'
      keyboardVerticalOffset={0}
      style={styles.container}
    >
      <LoaderModal label='Saving record...' loading={isSaving} />
      <Greeting />
      <View style={styles.center}>
        <View style={styles.formContainer}>
          <View style={styles.instructions}>
            <Text style={styles.text}>
              Please enter your new password and confirm your new password below and tap <Text style={styles.label}>Finish</Text> to save.
            </Text>
          </View>
          <Input
            id='newPassword'
            label='New Pasword'
            secureTextEntry
            keyboardType='default'
            required
            minLength={5}
            autoCapitalized='none'
            errorText='Please enter valid password'
            onInputChange={inputChangeHandler}
          />
          <Input
            id='confirmPassword'
            label='Confirm Pasword'
            secureTextEntry
            keyboardType='default'
            required
            minLength={5}
            autoCapitalized='none'
            errorText='Please enter valid password'
            onInputChange={inputChangeHandler}
          />
          <View style={styles.buttonContainer}>
            <Button
              title='Finish'
              color={Colors.primary}
              disabled={!formState.formIsValid}
              onPress={saveRecordHandler} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export const changePasswordScreenOptions = navData => {
  return {
    headerTitle: 'Change Password',
    headerLeft: () => (
      <HeaderMenuButton onToggleMenu={() => { navData.navigation.toggleDrawer() }} />
    ),
    headerRight: () => (
      <HeaderLogoutButton />
    ),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  center: {
    flex: 1,
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

export default ChangePasswordScreen;
