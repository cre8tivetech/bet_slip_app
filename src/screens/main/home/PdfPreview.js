import React from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { ActivityIndicator } from 'react-native-paper';
import Pdf from 'react-native-pdf';
import normalize from '../../../utils/normalize';
import RNPrint from 'react-native-print';
import { REACT_APP_API, REACT_APP_SEND_SLIP } from '@env';

const PdfPreview = ({
  showPreview,
  colors,
  fileData,
  setPreview,
  isFetching,
}) => {
  async function printRemotePDF() {
    // const fs = new File();

    // let fPath = Platform.select({
    //   ios: fs.dirs.DocumentDir,
    //   android: fs.dirs.DownloadDir,
    // });

    // fPath = `${fPath}/pdfFileName.pdf`;

    // if (Platform.OS === PlatformTypes.IOS) {
    //   await fs.createFile(fPath, fileData.base64Pdf, 'base64');
    // } else {
    //   await fs.writeFile(fPath, fileData.base64Pdf, 'base64');
    // }

    const data =
      REACT_APP_API + REACT_APP_SEND_SLIP + '/pdf/' + fileData.betSlip._id;
    console.log(data);
    // console.log(fileData.base64Pdf.split('pdf;base64,')[1]);
    await RNPrint.print({
      filePath: data,
    });
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.9}
      deviceWidth={Dimensions.get('window').height}
      deviceHeight={Dimensions.get('window').height}
      visible={showPreview}
      style={{
        margin: 0,
        alignItems: 'center',
        backgroundColor: '#000000cb',
        height: Dimensions.get('window').height,
        // opacity: 0.8,
      }}
      // onBackButtonPress={() => {
      //   setLoggingIn(false);
      //   setLogInPop(false);
      //   setModalVisible(false);
      // }}
      // customBackdrop={<View style={{ flex: 1, backgroundColor: 'red' }} />}
    >
      <View
        style={{
          // position: 'absolute',
          justifyContent: 'space-between',
          backgroundColor: colors.background,
          borderColor: colors.background_1 + 25,
          borderWidth: 3,
          height: Dimensions.get('window').height / 1.5,
          width: Dimensions.get('window').width / 1.2,
          paddingVertical: 15,
          // paddingHorizontal: 10,
          // alignItems: 'center',
          borderRadius: 10,
        }}>
        {isFetching ? (
          <View
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              animating={true}
              size={normalize(41)}
              color={colors.text}
            />
          </View>
        ) : (
          <>
            <Pdf
              source={{ uri: fileData ? fileData.base64Pdf : null }}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link presse: ${uri}`);
              }}
              style={{
                flex: 1,
                width: '100%',
                height: Dimensions.get('window').height,
              }}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button
                title="Close"
                titleStyle={{
                  fontSize: normalize(14),
                  fontFamily: 'Comfortaa-Bold',
                }}
                onPress={() => setPreview(false)}
                buttonStyle={{
                  width: 75,
                  height: 30,
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  alignSelf: 'center',
                  borderRadius: 10,
                }}
                // loading={loggingIn}
              />
              <Button
                title="Print"
                titleStyle={{
                  fontSize: normalize(14),
                  fontFamily: 'Comfortaa-Bold',
                }}
                onPress={() => printRemotePDF()}
                buttonStyle={{
                  width: 75,
                  height: 30,
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  alignSelf: 'center',
                  borderRadius: 10,
                }}
                // loading={loggingIn}
              />
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default PdfPreview;
