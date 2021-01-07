import React from 'react';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from './CustomHeaderButton';

const HeaderMenuButton = props => (
  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Menu'
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={props.onToggleMenu}
      />
    </HeaderButtons>
);

export default HeaderMenuButton;
