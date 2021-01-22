import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Alert,
  Button
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useSelector } from 'react-redux';
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
  const [selected, setSelected] = useState({ id: null, code: null, label: null, type: null });
  const location = useSelector(state => state.location.location);
  const address = useSelector(state => state.location.address);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const unsubcribe = props.navigation.addListener('focus', () => {
      fetchReasonsHandler();
    });
    
    return unsubcribe;
  }, [props.navigation]);

  const fetchReasonsHandler = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${ENV.serverUrl}/reasons/type/${clockingType}`);
      setReasons(response.data.rec);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Alert.alert(
        'Error!',
        `An error occured while fetching data. ${err.message}`,
        [{ text: 'OK' }]
      );
    }
  }, [fetchReasonsHandler]);

  const ReasonItem = ({id, code, label, type}) => {
    return (
      <View>
        <View style={styles.itemContainer}>
          <Checkbox.Item
              status={selected.code == code ? 'checked' : 'unchecked'}
              color={Colors.primary}
              label={label}
              style={{ width: 350}}
              onPress={() => {setSelected({ id: id, code: code, label: label, type: type })}}
            />
        </View>
      </View>
    );
  }

  const finishHandler = async () => {
    setIsSaving(true);

    try {
      const payload = {
        ctype: clockingType,
        reasonid: selected.id,
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        clocation: address
      }

      const response = await axios.post(`${ENV.serverUrl}/clocking`,
        payload,
        { headers: { "Authorization": `Bearer ${token}` } }
      );

      setIsSaving(false);

      if (response.status === 201) {
       props.navigation.navigate('HomeStack', { screen: 'AttendanceTab' })
      }
    } catch (err) {
      setIsSaving(false);
      Alert.alert(
        'Error!',
        `An error occured while fetching data. ${err.message}`,
        [{ text: 'OK' }]
      );
    }
  }

  return (
    <View style={styles.container}>
      <LoaderModal loading={isLoading} label='Fetching reasons...' />
      <LoaderModal loading={isSaving} label='Saving record...' />
      <View style={styles.title}>
        <Text style={styles.label}>Please select { clockingType === 1 ? 'In' : 'Out' } reason (optional)</Text>
      </View>
      <FlatList
        data={reasons}
        keyExtractor={item => item.reasoncode}
        renderItem={itemData => 
          <ReasonItem
            id={itemData.item.id}
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
    paddingHorizontal: 20,
    maxWidth: 500
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
