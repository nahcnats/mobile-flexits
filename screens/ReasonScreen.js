import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Button, Platform } from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import LoaderModal from '../components/UI/LoaderModal';
import Loader from '../components/UI/Loader';
import HeaderCustomBackButton from '../components/UI/HeaderCustomBackButton';

import Colors from '../constants/Colors';
import ENV from '../env';


const ReasonScreen = props => {
  const { clockingType } = props.route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [reasons, setReasons] = useState();
  const [selected, setSelected] = useState({ code: null, label: null, type: null });
  const location = useSelector(state => state.location.location);
  const address = useSelector(state => state.location.address);
  const token = useSelector(state => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubcribe = props.navigation.addListener('focus', () => {
      console.log('ReasonScreen focused');
      fetchReasonsHandler();
    });
    
    return unsubcribe;
  }, [props.navigation]);

  const fetchReasonsHandler = useCallback(async () => {
    setIsLoading(true);

    try {
      console.log(clockingType)
      const response = await axios.get(`${ENV.serverUrl}/reasons/type/${clockingType}`);
      console.log(response.data.rec)
      setReasons(response.data.rec);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, [fetchReasonsHandler]);

  const ReasonItem = ({code, label, type}) => {
    return (
      <View>
        <View style={styles.itemContainer}>
          <View>
            <Text>{ label }</Text>
          </View>
          <View>
            <CheckBox
              value={selected.code == code ? true : false}
              tintColors={{ true: Colors.primary }}
              onCheckColor={Colors.primary }
              onValueChange={() => {setSelected({ code: code, label: label, type: type })}}
            />
          </View>
        </View>
      </View>
    );
  }

  const finishHandler = () => {
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      props.navigation.navigate('HomeStack', { screen: 'AttendanceTab' });
     }, 1000);

    // try {
    //   const payload = {
    //     ctype: clockingType,
    //     reasonid: selected.code,
    //     lat: location.coords.latitude,
    //     lon: location.coords.longitude,
    //     clocation: address
    //   }

    //   const response = await axios.post(`${ENV.serverUrl}/clocking`,
    //     payload,
    //     { headers: { "Authorization": `Bearer ${token}` } }
    //   );

    //   if (response.data.status === 201) {
        
    //   }
    // } catch (err) {
    //   console.log(err);
    //   throw err;
    // }
  }

  return (
    <View style={styles.container}>
      <LoaderModal loading={isLoading} label='Fetching reasons...' />
      <View style={styles.title}>
        <Text style={styles.label}>Please select { clockingType === 1 ? 'In' : 'Out' } reason (optional)</Text>
      </View>
      <FlatList
        data={reasons}
        keyExtractor={item => item.reasoncode}
        renderItem={itemData => 
          <ReasonItem
            code={itemData.item.reasoncode}
            label={itemData.item.reasondesc}
            type={itemData.item.reasontype}
          />
        }
      />
      <View style={styles.actionContainer}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Clear' color={Colors.accent} onPress={() => setSelected({ code: null, label: null, type: null })} />
          </View>
          <View style={styles.button}>
            <Button title='Finish' color={Colors.primary} onPress={finishHandler} />
          </View>
        </View>
        {
          isSaving ? <Loader loading={true} label='Saving record...' /> : null
        }
       </View> 
    </View>
  );
}

// TODO: Add reload / refresh function

export const reasonScreenOptions = navData => {
  return {
    headerTitle: 'Clocking Reason',
    headerLeft: () => (
      <HeaderCustomBackButton onGoBack={() => navData.navigation.navigate('HomeStack')} />
    ),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    paddingVertical: 20
  },
  label: {
    fontFamily: 'open-sans-bold'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 300
  },
  actionContainer: {
    paddingBottom: 10
  },
  buttonContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10
  },
  button: {
    paddingHorizontal: 10
  }
});

export default ReasonScreen;
