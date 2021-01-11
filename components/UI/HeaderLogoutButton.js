import React from 'react';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import CustomHeaderButton from './CustomHeaderButton';

import * as authActions from '../../store/actions/auth';

const HeaderLogoutButton = props => {
  const dispatch = useDispatch();

  return (
  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Logout'
        iconName={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
        onPress={() => {
          dispatch(authActions.logout());
        }}
      />
    </HeaderButtons>
  );
}
export default HeaderLogoutButton;
