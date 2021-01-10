import React, {
  useState,
  useCallback,
  useReducer,
  useEffect
} from 'react';
import {
  Text,
  ScrollView,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
  Platform
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Import redux actions
import * as authActions from '../store/actions/auth';

import Card from '../components/UI/Card';
import Input, { FORM_INPUT_UPDATE } from '../components/UI/Input';
import Loader from '../components/UI/Loading';
import formReducer from '../components/util/formReducer';

import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const isAuth = useSelector(state => state.auth)

  const dispatch = useDispatch();

  useEffect(() => {
    // getUserIdFromStorageHandler();

    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'OK' }]);
    }
  }, [error]);

  const getUserIdFromStorageHandler = async () => {
    setIsLoading(true);

    try {
      const valueString = await AsyncStorage.getItem('UserData');
      const value = JSON.parse(valueString);

      if (value) {
        dispatchFormState({
          type: FORM_INPUT_UPDATE,
          value: value,
          isValid: false,
          inputIdentifier: 'userId'
        });
      }
    } catch (err) {
      throw err;
    }

    setIsLoading(false);
  }

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      userId: '',
      password: '',
    },
    inputValidities: {
      userId: false,
      password: false,
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

  const authHandler = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(authActions.login(
        formState.inputValues.userId,
        formState.inputValues.password)
      );

    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setIsLoading(false);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? padding : null}
      keyboardVerticalOffset={20}
      style={styles.container}
    >
      <ImageBackground source={require('../assets/images/login-background.jpg')} style={styles.authBackground} >
        <Card style={styles.authContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to FlexiTs</Text>
          </View>    
          <ScrollView>
            <Input
              id='userId'
              label='User ID'
              keyboardType='default'
              required
              autoCapitalized='none'
              errorText='Please enter valid user ID'
              onInputChange={inputChangeHandler}
            />
            <Input
              id='password'
              label='Pasword'
              secureTextEntry
              keyboardType='default'
              required
              minLength={5}
              autoCapitalized='none'
              errorText='Please enter valid password'
              onInputChange={inputChangeHandler}
            />
            <View style={styles.buttonContainer}>
              <Button title='Login' color={Colors.primary} onPress={authHandler} />
                <Button title='Forgot Password' color={Colors.accent} onPress={() => {
                  props.navigation.navigate('ForgotPassword')
              }} />
            </View>
            <View style={styles.buttonContainer}>
              { isLoading ? <ActivityIndicator size='small' color={Colors.primary} /> : null } 
            </View>
          </ScrollView>
        </Card>
    </ImageBackground>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  authBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
  },
  authContainer: {
    width: '85%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: Colors.primary
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

export default AuthScreen;
