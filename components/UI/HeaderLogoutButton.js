import React from 'react';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from './CustomHeaderButton';

const HeaderLogoutButton = props => (
  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Logout'
        iconName={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
        onPress={() => {}}
      />
    </HeaderButtons>
);

export default HeaderLogoutButton;
