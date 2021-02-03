import React, { useEffect, useState } from 'react';
import {
  DeviceEventEmitter,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../components/hoc/Header';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';
import { Button, Icon } from 'react-native-elements';
import normalize from '../../../utils/normalize';

import { ActivityIndicator } from 'react-native-paper';
import DeviceList from './DevicesList';
import { Formik } from 'formik';
import InputBox from '../../../components/hoc/InputBox';
import { useRef } from 'react';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import { signOutStart, submitSlip } from '../../../redux/user/user.actions';

const colors = {
  primary: '#00c7e5',
  text: '#777777',
  text_1: '#4d4c4c',
  text_2: '#a8a8a8',
  text_4: '#9b9b9b',
  background: '#ffffff',
  background_1: '#838383',
  background_2: '#252a3e',
};

const Home = ({ navigation, signOutStart, submitSlip }) => {
  const inputRef = useRef();
  const [bState, setBState] = useState();
  const [paired, setPaired] = useState();
  const [found, setFound] = useState();
  const [state, setState] = useState({
    loading: false,
    name: '',
    connected: false,
  });
  const [isLoadingDevice, setIsLoadingDevice] = useState(false);
  const [showDevice, setShowDevice] = useState(false);
  const [deviceTypes, setDeviceTypes] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [multiSelect, setMultiSelect] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  const onSelectedItemsChange = (data) => {
    setSelectedItems(data);
    console.log(data);
  };

  useEffect(() => {
    BluetoothStateManager.addEventListener(
      BluetoothStateManager.EVENT_BLUETOOTH_STATE_CHANGE,
      (bluetoothState) => {
        // do something...
        // console.log(bluetoothState);
        if (bluetoothState === 'PoweredOn') {
          setBState(true);
        } else {
          setBState(false);
        }
      },
    );
    DeviceEventEmitter.addListener(BluetoothManager.EVENT_CONNECTED, (rsp) => {
      console.log(rsp);
      // this._deviceAlreadPaired(rsp); // rsp.devices would returns the paired devices array in JSON string.
    });
    DeviceEventEmitter.addListener(
      BluetoothManager.EVENT_DEVICE_FOUND,
      (rsp) => {
        console.log(rsp);
        // this._deviceFoundEvent(rsp); // rsp.devices would returns the found device object in JSON string
      },
    );
  }, []);

  useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        setBState(enabled); // enabled ==> true /false
      },
      (err) => {
        alert(err);
      },
    );
    // BluetoothManager.enableBluetooth().then(
    //   (r) => {
    //     var paired = [];
    //     if (r && r.length > 0) {
    //       for (var i = 0; i < r.length; i++) {
    //         try {
    //           paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
    //         } catch (e) {
    //           //ignore
    //         }
    //       }
    //     }
    //     console.log(JSON.stringify(paired));
    //   },
    //   (err) => {
    //     alert(err);
    //   },
    // );
  }, []);
  const getDevices = () => {
    setIsLoadingDevice(true);
    setFound(null);
    setPaired(null);
    setShowDevice(true);
    BluetoothManager.scanDevices().then(
      (s) => {
        var ss = JSON.parse(s); //JSON string
        console.log(ss);
        setIsLoadingDevice(false);
        setDeviceTypes({ paired: ss.paired || [], found: ss.found || [] });
        // console.log(found);
        // setState(
        //   {
        //     // pairedDs: this.state.pairedDs.cloneWithRows(ss.paired || []),
        //     // foundDs: this.state.foundDs.cloneWithRows(ss.found || []),
        //     pairedDs: ss.paired || [],
        //     foundDs: ss.found || [],
        //     loading: false,
        //   },
        //   () => {
        //     setPaired(ss.paired || []);
        //     setFound(ss.found || []);
        //   },
        // );
      },
      (er) => {
        setState({
          loading: false,
        });
        alert('error' + JSON.stringify(er));
      },
    );
  };
  const scanDevice = () => {
    console.log(bState);
    if (!bState) {
      BluetoothManager.enableBluetooth().then(
        (r) => {
          console.log(r);
          Toast.showWithGravity('Bluetooth enabled', Toast.LONG, Toast.BOTTOM, [
            'UIAlertController',
          ]);
          getDevices();
        },
        () => {
          Toast.showWithGravity(
            'Unable to connect bluetooth',
            Toast.LONG,
            Toast.BOTTOM,
            ['UIAlertController'],
          );
        },
      );
    } else {
      getDevices();
    }
  };

  // const actionBTooth = () => {
  //   BluetoothManager.disableBluetooth().then(
  //     () => {
  //       // do something.
  //     },
  //     (err) => {
  //       alert(err);
  //     },
  //   );
  // };

  const connectDevice = (rowData) => {
    setState({
      loading: true,
      name: rowData.name,
      connected: false,
    });
    BluetoothManager.connect(rowData.address) // the device address scanned.
      .then(
        (s) => {
          setState({
            loading: false,
            boundAddress: rowData.name,
            connected: true,
          });
          Toast.showWithGravity(
            `🖨️ ${s} is connected.`,
            Toast.LONG,
            Toast.BOTTOM,
            ['UIAlertController'],
          );
        },
        (e) => {
          console.log(e);
          setState({
            loading: false,
            boundAddress: rowData.name,
            connected: false,
          });
          Toast.showWithGravity(`❌ ${e}`, Toast.LONG, Toast.BOTTOM, [
            'UIAlertController',
          ]);
        },
      );
  };

  const disconnectDevice = (rowData) => {
    console.log(rowData);
    BluetoothManager.unpaire(rowData.address).then(
      (s) => {
        //success here
        console.log(s);
      },
      (err) => {
        //error here
        console.log(err);
      },
    );
  };

  const submitData = (values) => {
    console.log(values);
    submitSlip(values);
  };
  return (
    <View>
      <Header
        navigation={navigation}
        title="Bet4Me"
        logoutBtn={true}
        signOut={signOutStart}
      />

      <ScrollView style={{ marginTop: 50 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: 30,

            // marginHorizontal
          }}>
          <TouchableOpacity
            onPress={() => console.log('hello world')}
            style={{
              width: 130,
              height: 80,
              flexDirection: 'column',
              backgroundColor: colors.background,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="bluetooth"
                type="feather"
                color={colors.text}
                size={normalize(16)}
                style={{
                  color: colors.background,
                }}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: 'SofiaProRegular',
                  marginLeft: 5,
                  color: colors.text,
                }}>
                Bluetooth
              </Text>
            </View>
            <Text
              style={{
                fontSize: normalize(15),
                fontFamily: 'SofiaProSemiBold',
                marginLeft: 5,
                color: colors.text,
              }}>
              {bState ? 'On' : 'Off'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => scanDevice()}
            style={{
              width: 130,
              height: 80,
              flexDirection: 'column',
              backgroundColor: colors.primary,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="printer"
                type="feather"
                color={colors.background}
                size={normalize(16)}
                style={{
                  color: colors.background,
                }}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: 'SofiaProRegular',
                  marginLeft: 5,
                  color: colors.background,
                }}>
                Device
              </Text>
            </View>
            <Text
              style={{
                fontSize: normalize(15),
                fontFamily: 'SofiaProSemiBold',
                marginLeft: 5,
                color: colors.background,
              }}>
              {state.connected ? 'Connected' : 'Disconnected'}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderStyle: 'dashed',
            borderColor: colors.background_1,
            borderRadius: 1,
            borderWidth: 2,
            marginHorizontal: 20,
            padding: 20,
          }}>
          <Formik
            innerRef={inputRef}
            initialValues={{
              name: '',
              mobileNo: '',
              amount: '',
              cash_out_days: '',
              agent_name: '',
            }}
            onSubmit={(values) => {
              submitData({ ...values, cash_out_days: selectedItems });
              console.log('Lets go');
            }}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={{ marginBottom: 10 }}>
                {/* /* -------------------------- Profile Details Edit -------------------------- */}
                <InputBox
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  valuesType={values.name}
                  name="name"
                  iconName="user"
                  iconType="feather"
                  placeholder="Name"
                  autoCompleteType="name"
                  textContentType="givenName"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  boxStyle={{ borderRadius: 10 }}
                />
                <InputBox
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  valuesType={values.mobileNo}
                  name="mobileNo"
                  iconName="phone"
                  iconType="feather"
                  placeholder="Phone"
                  autoCompleteType="tel"
                  textContentType="telephoneNumber"
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  boxStyle={{ borderRadius: 50 }}
                />
                <InputBox
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  valuesType={values.amount}
                  name="amount"
                  iconName="money"
                  iconType="font-awesome"
                  placeholder="Amount"
                  autoCompleteType="tel"
                  textContentType="telephoneNumber"
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  boxStyle={{ borderRadius: 50 }}
                />
                <InputBox
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  valuesType={values.cash_out_days}
                  name="cash_out_days"
                  iconName="calendar"
                  iconType="feather"
                  placeholder="Cash Out Days"
                  autoCompleteType="name"
                  textContentType="name"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  boxStyle={{ borderRadius: 50 }}
                  select={true}
                  multiSelect={multiSelect}
                  setMultiSelect={setMultiSelect}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  onSelectedItemsChange={onSelectedItemsChange}
                />

                {/* --------------------------------------- DATE SECTION --------------------------------------- */}

                {/* ------------------- BIO SECTION --------------------------------------- */}

                <InputBox
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  valuesType={values.agent_name}
                  name="agent_name"
                  iconName="face-agent"
                  iconType="material-community"
                  placeholder="Agent Name"
                  autoCompleteType="name"
                  textContentType="givenName"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  boxStyle={{ borderRadius: 50 }}
                />

                <Button
                  TouchableComponent={() => {
                    return isLoading ? (
                      <ActivityIndicator
                        animating={true}
                        size={normalize(21)}
                        color={colors.text}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={{
                          color: colors.text,
                          alignSelf: 'center',
                          backgroundColor: colors.primary,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          marginTop: 20,
                          borderRadius: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: colors.background,
                            fontSize: normalize(15),
                            fontFamily: 'Comfortaa-Bold',
                            textAlign: 'center',
                          }}>
                          Submit
                        </Text>
                        <Icon
                          name={'send'}
                          type={'material'}
                          color={colors.background}
                          size={normalize(18)}
                          style={{
                            color: colors.text,
                            marginLeft: 10,
                            // alignSelf: 'center',
                          }}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      <DeviceList
        showDevice={showDevice}
        colors={colors}
        scanDevice={scanDevice}
        isLoadingDevice={isLoadingDevice}
        deviceTypes={deviceTypes}
        connectDevice={connectDevice}
        disconnectDevice={disconnectDevice}
        setShowDevice={setShowDevice}
        state={state}
      />
    </View>
  );
};
// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
//   isLoading: selectIsLoading,
// });

const mapDispatchToProps = (dispatch) => ({
  // getPracticesAllStart: () => dispatch(getPracticesAllStart()),
  signOutStart: () => dispatch(signOutStart()),
  submitSlip: (data) => dispatch(submitSlip(data)),
});
export default connect(null, mapDispatchToProps)(Home);
