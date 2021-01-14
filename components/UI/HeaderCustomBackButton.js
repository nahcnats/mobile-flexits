import React from 'react';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from './CustomHeaderButton';

const HeaderCustomButton = props => (
  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Back'
        iconName={Platform.OS === 'android' ? 'arrow-back' : 'arrow-back'}
        onPress={props.onGoBack}
      />
    </HeaderButtons>
);

export default HeaderCustomButton;
