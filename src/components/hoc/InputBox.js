import React, { useState } from 'react';
import { View, Dimensions, TextInput, StyleSheet } from 'react-native';
import { normalize } from 'react-native-elements';
import { useScrollToTop, useTheme } from '@react-navigation/native';
import { Icon, Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const appwidth = windowWidth * 0.8;
const colors = {
  primary: '#00c7e5',
  text: '#777777',
  text_1: '#4d4c4c',
  text_2: '#a8a8a8',
  text_4: '#9b9b9b',
  background: '#ffffff',
  background_1: '#ffffff',
  background_2: '#252a3e',
};

const items = [
  {
    id: '92iijs7yta',
    name: 'Monday',
  },
  {
    id: 'a0s0a8ssbsd',
    name: 'Tuesday',
  },
  {
    id: '16hbajsabsd',
    name: 'Wednesday',
  },
  {
    id: 'nahs75a5sg',
    name: 'Thursday',
  },
  {
    id: '667atsas',
    name: 'Friday',
  },
  {
    id: 'hsyasajs',
    name: 'Saturday',
  },
  {
    id: 'djsjudksjd',
    name: 'Sunday',
  },
];

const InputBox = ({
  handleChange,
  handleBlur,
  valuesType,
  name,
  iconName,
  iconType,
  iconColor,
  iconSize,
  placeholder,
  placeholderTextColor,
  autoCompleteType,
  textContentType,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  boxStyle,
  styling,
  select,
  multiSelect,
  setMultiSelect,
  selectedItems,
  setSelectedItems,
  onSelectedItemsChange,
}) => {
  // const { colors } = useTheme();

  return (
    <View
      style={[
        select ? { marginTop: 20 } : styles.formField,
        // select ? null : boxStyle,
        {
          backgroundColor: colors.background_1,
        },
      ]}>
      <Icon
        name={iconName}
        type={iconType}
        color={iconColor ? iconColor : colors.text}
        size={normalize(iconSize ? iconSize : 18)}
        style={[
          styles.formIcons,
          styling && styling.icon
            ? styling.icon
            : {
                alignSelf: 'flex-start',
                marginLeft: select ? 15 : null,
                marginTop: 5,
              },
          { width: 40 },
        ]}
      />

      {select ? (
        <>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="name"
            ref={(component) => {
              setMultiSelect(component);
            }}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Cash Out Days"
            searchInputPlaceholderText="Search Items..."
            // onChangeInput={(text) => console.log(text)}
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor={colors.text}
            itemFontSize={normalize(15)}
            fontSize={normalize(15)}
            textColor={colors.text_2}
            displayKey="name"
            styleDropdownMenu={{ borderRadius: 20 }}
            styleDropdownMenuSubsection={{
              marginLeft: 40,
              marginRight: 40,
              marginTop: 10,
              // backgroundColor: 'red',
              height: 30,
            }}
            styleListContainer={{
              borderRadius: 80,
            }}
            searchInputStyle={{
              borderRadius: 20,
            }}
            styleInputGroup={{}}
            styleItemsContainer={{}}
            // styleMainWrapper={{
            //   borderRadius: 70,
            //   backgroundColor: 'green',
            //   // width: 100,
            // }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />

          {multiSelect && multiSelect.getSelectedItemsExt(selectedItems)}
        </>
      ) : (
        <TextInput
          autoCapitalize={autoCapitalize}
          autoCompleteType={autoCompleteType}
          textContentType={textContentType}
          keyboardType={keyboardType}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : colors.text_2
          }
          style={[
            styles.formTextInput,
            styling && styling.input ? styling.input : { color: colors.text },
          ]}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          value={valuesType}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    marginTop: 5,
    fontSize: normalize(16),
    fontFamily: 'SofiaProRegular',
  },

  formField: {
    flexDirection: 'row',
    // borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 0,
    marginTop: 15,
    alignItems: 'center',
  },

  formTextInput: {
    marginLeft: 20,
    width: '90%',
    fontSize: normalize(17),
    fontFamily: 'SofiaProRegular',
  },

  formIcons: {
    alignSelf: 'center',
  },

  flexrow: {
    flexDirection: 'row',
  },

  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: -40,
  },

  whiteFont: {
    fontSize: normalize(14),
    fontFamily: 'SofiaProRegular',
  },
  spacer: {
    marginRight: 15,
    borderRadius: 6,
    marginLeft: -10,
    width: 22,
    alignItems: 'center',
  },

  bellowFormView: {
    flexDirection: 'row',
    width: appwidth,
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 25,
  },

  bellowFormViewtext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  loginButtonView: {
    width: windowWidth,
    alignItems: 'center',
  },

  loginButton: {
    width: appwidth,
    justifyContent: 'center',
    borderRadius: 10,
  },
  bellowButtonText: {
    alignItems: 'center',
    marginTop: windowHeight * 0.05,
    marginBottom: 23,
  },

  error: {
    fontSize: 13,
    color: 'red',
  },
});

export default InputBox;
