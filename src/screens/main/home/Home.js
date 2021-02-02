import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Header from '../../../components/hoc/Header';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

const Home = ({ navigation }) => {
  useEffect(() => {
    const bTooth = BluetoothStateManager.getState().then((bluetoothState) => {
      switch (bluetoothState) {
        case 'Unknown':
          console.log('Unknown');
          break;
        case 'Resetting':
          console.log('Resetting');
          break;
        case 'Unsupported':
          console.log('Unsupported');
          break;
        case 'Unauthorized':
          console.log('Unauthorized');
          break;
        case 'PoweredOff':
          console.log('PoweredOff');
          BluetoothStateManager.requestToEnable()
            .then((result) => {
              console.log(result);
              // result === true -> user accepted to enable bluetooth
              // result === false -> user denied to enable bluetooth
            })
            .catch((err) => console.log(err));
          break;
        case 'PoweredOn':
          console.log('PoweredOn');
          break;
        default:
          console.log('Nones');
          break;
      }
    });
    return () => bTooth;
  }, []);
  return (
    <View>
      <Header navigation={navigation} title="Bet4Me" logoutBtn={true} />
      <Text>Hello WOrld ds</Text>
    </View>
  );
};
export default Home;
