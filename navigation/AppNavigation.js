// Import libraries
import React, { useEffect, useCallback } from 'react';
import { Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import constants
import Colors from '../constants/Colors';

// Import screens
import AuthScreen from '../screens/AuthScreen';
import ForgotPasswordScreen, { forgotPasswordScreenOptions } from '../screens/ForgotPasswordScreen';
import ClockingScreen, { clockingScreenOptions } from '../screens/ClockingScreen';
import ReasonScreen, { reasonScreenOptions } from '../screens/ReasonScreen';
import AttendanceScreen, { attendanceScreenOptions } from '../screens/AttendanceScreen';
import ChangePasswordScreen, { changePasswordScreenOptions } from '../screens/ChangePasswordScreen';
import SettingsScreen, { settingsScreenOptions } from '../screens/SettingsScreen';

// Import redux actions
import * as authActions from '../store/actions/auth';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Default header styles for all screens
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

// AuthNavigator as stack
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Auth'
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name='Auth'
        component={AuthScreen}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name='ForgotPassword'
        component={ForgotPasswordScreen}
        options={forgotPasswordScreenOptions}
      />
    </Stack.Navigator>
  )
}

// ClockingNavigator as stack
const ClockingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name='Clocking'
        component={ClockingScreen}
        options={clockingScreenOptions}
      />
    </Stack.Navigator>
  )
}

// ReasonNavigator as stack
const ReasonNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name='Reason'
        component={ReasonScreen}
        options={reasonScreenOptions}
      />
    </Stack.Navigator>
  )
}

// ChangePasswordNavigator as stack
const ChangePasswordNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name='ChangePassword'
        component={ChangePasswordScreen}
        options={changePasswordScreenOptions}
      />
    </Stack.Navigator>
  )
}

// SettingsNavigator as stack
const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name='Settings'
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
    </Stack.Navigator>
  )
}

// AttendanceNavigator as stack
const AttendanceNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name='Attendance'
        component={AttendanceScreen}
        options={attendanceScreenOptions}
      />
    </Stack.Navigator>
  )
}

// HomeNavigator as bottom tab
const HomeNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='ClockingTab'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'ClockingTab') {
            iconName = focused ?
              (Platform.OS === 'android' ? 'md-time' : 'ios-time') :
              (Platform.OS === 'android' ? 'md-time-outline' : 'ios-time')
          } else {
            iconName = focused ?
              (Platform.OS === 'android' ? 'md-list-circle' : 'ios-list-circle') :
              (Platform.OS === 'android' ? 'md-list-circle-outline' : 'ios-list-circle')
          }

          return <Ionicons name={iconName} size={36} color={Colors.primary} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: 'gray',
        style: {
          height: 74,
          paddingBottom: 10,
          paddingTop: 10,
          fontFamily: 'open-sans',
        },
      }}
    >
      <BottomTab.Screen
        name='ClockingTab'
        component={ClockingNavigator}
        options={{tabBarLabel: 'Clocking', unmountOnBlur: true}}
      />
      <BottomTab.Screen
        name='AttendanceTab'
        component={AttendanceNavigator}
        options={{tabBarLabel: 'Attendance', unmountOnBlur: true}}
      />
    </BottomTab.Navigator>
  );
}

// Customer drawer to add logout in menu
const CustomDrawerContent = (filteredProps) => {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }} >
      <DrawerContentScrollView {...filteredProps} >
        <DrawerItemList {...filteredProps} />
          <DrawerItem
            label='Logout'
            onPress={() => {
              filteredProps.navigation.toggleDrawer();
              dispatch(authActions.logout());
            }}
          />
      </DrawerContentScrollView>
    </View>
  );
}

// AppNavigator as drawer
const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName='HomeStack'
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
      drawerContent={(props) => {
        // Hide item from menu
        const filteredProps = {
          ...props,
          state: {
            ...props.state,
            routeNames: props.state.routeNames.filter(
              routeName => routeName.name !== 'ReasonStack'
            ),
            routes: props.state.routes.filter(
              route => route.name !== 'ReasonStack'
            ),
          }
        };
        return (
          <CustomDrawerContent {...filteredProps} />
        );
      }}
    >
      <Drawer.Screen
        name='HomeStack'
        component={HomeNavigator}
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name='ChangePasswordStack'
        component={ChangePasswordNavigator}
        options={{ drawerLabel: 'Change Password'}}
      />
      <Drawer.Screen
        name='SettingsStack'
        component={SettingsNavigator}
        options={{ drawerLabel: 'Settings'}}
      />
      <Drawer.Screen
        name='ReasonStack'
        component={ReasonNavigator}
        options={{
          drawerLabel: 'Reason',
          unmountOnBlur:true
        }}
      />
    </Drawer.Navigator>
  );
}

// Main navigation
const AppNavigation = () => {
  const isAuth = useSelector(state => !!state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    // try to login again if token exists and not expired
    tryLogin(); 

    return () => {
      // unmount
    }
  }, [tryLogin]);

  const tryLogin = useCallback(async () => {
    const userData = await AsyncStorage.getItem('userData');

    if (!userData) {
      return;
    }

    // AsyncStorate values are string. Convert to JSON
    const transformedData = JSON.parse(userData);
    const { token, userId, fullname, expiryDate } = transformedData;
    const expirationDate = new Date(expiryDate);

    if (expirationDate <= new Date() || !token || !userId) {
      dispatch(authActions.logout());
      return;
    }

    const expirationTime = expirationDate.getTime() - new Date().getTime();
    dispatch(authActions.authenticate(userId, fullname, token, expirationTime));
  }, [isAuth]);

  return (
    <NavigationContainer>
      { isAuth ? <AppNavigator /> : <AuthNavigator /> }
    </NavigationContainer>
  );
}

export default AppNavigation;
