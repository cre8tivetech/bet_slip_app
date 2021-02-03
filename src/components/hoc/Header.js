import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { DrawerActions, useTheme } from '@react-navigation/native';
import normalize from '../../utils/normalize';
import { Button, Icon } from 'react-native-elements';
import { CheckBox } from 'native-base';
import { ActivityIndicator } from 'react-native-paper';

const colors = {
  primary: '#00c7e5',
  text: '#777777',
  text_1: '#242424',
  text_2: '#e6e1e1',
  text_4: '#9b9b9b',
  background: '#ffffff',
  background_1: '#838383',
  background_2: '#252a3e',
};

const Header = ({
  navigation,
  title,
  iconRight1,
  notifyIcon,
  checkState,
  setCheckState,
  setFilter,
  backArrow,
  isLoading,
  logoutBtn,
  signOut,
}) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  console.log(screenWidth, '&', screenWidth / 2);
  console.log(checkState);

  // const advanceCheck = (type) => {
  //   if (type === 'opt1') {
  //     console.log('Test working');
  //     // setCheckState(...checkState, { opt1: !checkState.opt1 });
  //   }
  // };

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 100,
        height: 50,
        width: Math.round(Dimensions.get('window').width),
        borderBottomColor: '#f4f2f2',
        borderBottomWidth: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: colors.background,
      }}>
      {/* {backArrow ? (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            marginHorizontal: 20,
            marginVertical: 15,
            width: 40,
            height: 30,
            alignItems: 'flex-start',
          }}
          onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            type="material-icons"
            color={colors.text}
            size={normalize(21)}
            style={{
              color: colors.text,
              // alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            // marginTop: 20,
            // marginLeft: 20,
            // backgroundColor: 'green',
            marginHorizontal: 20,
            marginVertical: 15,
            width: 40,
            height: 30,
            alignItems: 'center',
          }}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <View
            style={{
              backgroundColor: colors.text,
              width: 22,
              height: 1.7,
              marginTop: 4,
              alignSelf: 'flex-start',
            }}
          />
          <View
            style={{
              backgroundColor: colors.primary,
              width: 11,
              height: 1.8,
              marginTop: 4,
              alignSelf: 'flex-start',
            }}
          />
        </TouchableOpacity>
      )} */}
      <View
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          position: 'absolute',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: normalize(17.5),
            fontFamily: 'SofiaProSemiBold',
            color: colors.text,
          }}>
          {title}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
        {iconRight1 && iconRight1.buttonType === 'save' && (
          <Button
            // onPress={handleSubmit}
            TouchableComponent={() => {
              return isLoading ? (
                <ActivityIndicator
                  animating={true}
                  size={normalize(21)}
                  color={colors.text}
                />
              ) : (
                <TouchableOpacity onPress={() => iconRight1.onPress()}>
                  <Icon
                    name={iconRight1.name}
                    type={iconRight1.type}
                    color={colors.text}
                    size={normalize(21)}
                    style={{
                      color: colors.text,
                      // alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        )}
        {logoutBtn && (
          <TouchableOpacity
            onPress={() => signOut()}
            style={{ flexDirection: 'row' }}>
            <Icon
              name="logout"
              type="antdesign"
              color={colors.text}
              size={normalize(21)}
              style={{
                color: colors.text,
                marginLeft: 25,
              }}
            />
            {/* <Text style={{ fontSize: normalize(16), marginLeft: 5 }}>
              Logout
            </Text> */}
          </TouchableOpacity>
        )}
        {notifyIcon && (
          <TouchableOpacity onPress={() => console.log('hello world')}>
            <Icon
              name="ios-notifications-outline"
              type="ionicon"
              color={colors.text}
              size={normalize(21)}
              style={{
                color: colors.text,
                marginLeft: 25,
              }}
            />
            <View
              style={{
                position: 'absolute',
                right: 3,
                top: 2,
                width: 6,
                height: 6,
                backgroundColor: colors.primary,
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
