import { takeLatest, put, all, call, delay } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import {
  signUpApi,
  signInApi,
  signInByTokenApi,
  resendConfirmEmailApi,
  changePasswordApi,
  forgetPasswordApi,
  resetPasswordApi,
  verifyAccountApi,
} from '../../apis/auth';
import { paymentVerifyApi } from '../../apis/payment';
import {
  setToken,
  setDownloads,
  setMessage,
  setSubscription,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  signUpFailure,
  signUpSuccess,
  forgetPasswordSuccess,
  userPaymentFailure,
  submitSlipSuccess,
  setPreview,
} from './user.actions';
import {
  editProfileApi,
  getDownloadsApi,
  getSubscriptionApi,
  sendSlipApi,
} from '../../apis/api';
import { showMessage, hideMessage } from 'react-native-flash-message';

// const userActive = state => state.user.currentUser;
const userToken = (state) => state.user.token.key;
const userExpire = (state) => state.user.token.expire;

export function* signUp({
  payload: { email, firstname, lastname, dob, mobileNo, password, navigation },
}) {
  try {
    console.log(email);
    // const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const result = yield signUpApi(
      email,
      firstname,
      lastname,
      dob,
      mobileNo,
      password,
    ).then(function (response) {
      return response.data;
    });
    console.log(result);
    showMessage({
      message: result.message,
      type: 'success',
    });
    yield delay(5000);
    yield put(signUpSuccess(result.patient));
    yield put(navigation.navigate('verifyAccount'));
  } catch (error) {
    console.log(error);
    console.log(error.response);
    let eMsg = '';
    if (error.response) {
      error.response.data.errors.map(function (i, err) {
        if (error.response.data.errors.length > 1) {
          eMsg += err + 1 + '. ' + i + '\n';
          console.log(eMsg);
        } else {
          eMsg += i;
          console.log(eMsg);
        }
      });
      showMessage({
        message: eMsg,
        type: 'danger',
      });
    } else {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    }

    yield put(
      signUpFailure(
        error.response
          ? error.response.data.errors || error.response.data.errors
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again',
      ),
    );
  }
}

export function* willSubmitSlip({ payload: data }) {
  const tokens = yield select(userToken);
  console.log(tokens);
  console.log(data, 'and');
  try {
    const result = yield sendSlipApi(tokens, data).then(function (response) {
      return response.data.data;
    });
    console.log(result);
    showMessage({
      message: result.message,
      type: 'success',
    });
    yield put(setPreview(true));
    yield delay(3000);
    yield put(submitSlipSuccess(result));
  } catch (error) {
    console.log(error.response);
    let eMsg = '';

    // showMessage({
    //   message: error.message,
    //   type: 'danger',
    // });

    showMessage({
      message: error.response ? error.response.data.errors : error.message,
      type: 'danger',
    });
    yield delay(2000);
    yield put(
      signInFailure(
        error.response
          ? error.response.data.errors || error.response.data.errors
          : 'Sign in failed, Please check your connectivity, And try again',
      ),
    );
  }
}

export function* signIn({ payload: { email, password } }) {
  console.log('I am here');
  console.log(email, 'and');
  try {
    const result = yield signInApi(email, password).then(function (response) {
      return response.data.data;
    });
    console.log(result);
    const token = {
      key: result.token,
      expire: tokenExpiration(),
    };
    if (result) {
      console.log(result);
      showMessage({
        message: 'Login successfully',
        type: 'success',
      });
      yield delay(2000);
      yield put(setToken(token));
      yield yield put(signInSuccess(result.staff));
    }
  } catch (error) {
    // console.log(error.response.data);
    let eMsg = '';
    if (error.response) {
      error.response.data.errors.map(function (i, err) {
        if (error.response.data.errors.length > 1) {
          eMsg += err + 1 + '. ' + i + '\n';
          console.log(eMsg);
        } else {
          eMsg += i;
          console.log(eMsg);
        }
      });
      showMessage({
        message: eMsg,
        type: 'danger',
      });
    } else {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    }
    // showMessage({
    //   message: error.response ? error.response.data.errors : error.message,
    //   type: 'danger',
    // });
    yield delay(2000);
    yield put(
      signInFailure(
        error.response
          ? error.response.data.errors || error.response.data.errors
          : 'Sign in failed, Please check your connectivity, And try again',
      ),
    );
  }
}

export function* verifyAcct({ payload: verificationKey }) {
  console.log(verificationKey);
  try {
    const result = yield verifyAccountApi(verificationKey).then(function (
      response,
    ) {
      return response.data;
    });
    console.log(result);
    const token = {
      key: result.token,
      expire: tokenExpiration(),
    };
    if (result) {
      console.log(result);
      showMessage({
        message: result.message,
        type: 'success',
      });
      yield delay(2000);
      showMessage({
        message: 'Logging In...',
        type: 'success',
      });
      yield delay(3000);
      showMessage({
        message: 'Login successful!',
        type: 'success',
      });
      yield delay(3000);
      yield put(signInSuccess(result.patient));
      yield put(setToken(token));
    }
  } catch (error) {
    console.log(error.response);
    let eMsg = '';
    if (error.response) {
      error.response.data.errors.map(function (i, err) {
        if (error.response.data.errors.length > 1) {
          eMsg += err + 1 + '. ' + i + '\n';
          console.log(eMsg);
        } else {
          eMsg += i;
          console.log(eMsg);
        }
      });
      showMessage({
        message: eMsg,
        type: 'danger',
      });
    } else {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    }
    // showMessage({
    //   message: error.response ? error.response.data.errors : error.message,
    //   type: 'danger',
    // });
    yield delay(2000);
    yield put(
      signInFailure(
        error.response
          ? error.response.data.errors || error.response.data.errors
          : 'Sign in failed, Please check your connectivity, And try again',
      ),
    );
  }
}

export function* willEditProfile({ payload: profileDetails }) {
  // console.log(profileDetails);
  const token = yield select(userToken);
  console.log(token);
  try {
    // console.log(email);
    // const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const result = yield editProfileApi(token, profileDetails).then(function (
      response,
    ) {
      return response.data;
    });
    console.log(result);
    showMessage({
      message: 'Added new changes',
      type: 'success',
    });
    // yield delay(5000);
    yield yield put(signInSuccess(result.patient));
    // yield put(navigation.navigate('verifyAccount'));
  } catch (error) {
    console.log(error);
    console.log(error.response);
    let eMsg = '';
    if (error.response) {
      error.response.data.errors.map(function (i, err) {
        if (error.response.data.errors.length > 1) {
          eMsg += err + 1 + '. ' + i + '\n';
          console.log(eMsg);
        } else {
          eMsg += i;
          console.log(eMsg);
        }
      });
      showMessage({
        message: eMsg,
        type: 'danger',
      });
    } else {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    }

    yield put(
      signUpFailure(
        error.response
          ? error.response.data.errors || error.response.data.errors
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again',
      ),
    );
  }
}

export function* isForgetPassword({ payload: email }) {
  console.log(email);
  try {
    const result = yield forgetPasswordApi(email).then(function (response) {
      return response.data;
    });
    if (result) {
      console.log(result);
      showMessage({
        message: result.message,
        type: 'success',
      });
      yield delay(5000);
      yield put(forgetPasswordSuccess());
      // yield put(setMessage({ type: 'success', message: result.message }));
      // yield delay(8000);
      // yield put(setMessage(null));
    }
  } catch (error) {
    console.log(error.response);
    let eMsg = '';
    if (error.response) {
      error.response.data.errors.map(function (i, err) {
        if (error.response.data.errors.length > 1) {
          eMsg += err + 1 + '. ' + i + '\n';
          console.log(eMsg);
        } else {
          eMsg += i;
          console.log(eMsg);
        }
      });
      showMessage({
        message: eMsg,
        type: 'danger',
      });
    } else {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    }
    // showMessage({
    //   message: error.response ? error.response.data.errors : error.message,
    //   type: 'danger',
    // });
    yield delay(2000);
    yield put(
      signInFailure(
        error.response
          ? error.response.data.errors || error.response.data.errors
          : 'Sign in failed, Please check your connectivity, And try again',
      ),
    );
  }
}

export function* signByToken({ payload: token }) {
  try {
    const result = yield signInByTokenApi(token).then(function (response) {
      return response.data.data;
    });
    const tokens = {
      key: result.token,
      expire: tokenExpiration(),
    };
    if (result) {
      const download = yield getDownloadsApi(tokens.key).then(function (
        response,
      ) {
        return response.data.data;
      });
      const subscription = yield getSubscriptionApi(tokens.key).then(function (
        response,
      ) {
        return response.data.data;
      });
      yield put(setToken(tokens));
      yield put(setSubscription(subscription.subscription));
      yield put(setDownloads(download.downloads));
      yield put(signInSuccess(result.user));
    }
  } catch (error) {
    yield put(
      signInFailure(
        error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again',
      ),
    );
  }
}

const tokenExpiration = () => {
  const loginExp = new Date();
  const timeExp = loginExp.setHours(loginExp.getHours() + 12);
  // const timeExp = loginExp.setSeconds(loginExp.getSeconds() + 10);
  const result = new Date(timeExp);
  return result;
};

export function* isResendConfirmEmail() {
  const token = yield select(userToken);
  try {
    const result = yield resendConfirmEmailApi(token).then(function (response) {
      return response.data.data;
    });
    if (result) {
      // yield put(resendConfirmEmailSuccess(""));
      yield put(setMessage({ type: 'success', message: result.message }));
      yield delay(6000);
      yield put(setMessage(null));
    }
  } catch (error) {
    yield put(
      setMessage({
        type: 'error',
        message: error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again',
      }),
    );
    yield delay(8000);
    yield put(setMessage(null));
  }
}

export function* isChangePassword({ payload: { old_password, new_password } }) {
  const token = yield select(userToken);
  try {
    const result = yield changePasswordApi(
      token,
      old_password,
      new_password,
    ).then(function (response) {
      return response.data.data;
    });
    if (result) {
      yield put(setMessage({ type: 'success', message: result.message }));
      yield delay(6000);
      yield put(setMessage(null));
    }
  } catch (error) {
    yield put(
      setMessage({
        type: 'error',
        message: error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again',
      }),
    );
    yield delay(8000);
    yield put(setMessage(null));
  }
}

export function* isResetPassword({ payload: { token, new_password } }) {
  try {
    const result = yield resetPasswordApi(token, new_password).then(function (
      response,
    ) {
      return response.data.data;
    });
    if (result) {
      yield put(setMessage({ type: 'success', message: result.message }));
      yield delay(6000);
      yield put(setMessage(null));
    }
  } catch (error) {
    yield put(
      setMessage({
        type: 'error',
        message: error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again',
      }),
    );
    yield delay(5000);
    yield put(setMessage(null));
  }
}

export function* isUserAuthenticated() {
  try {
    const expire = yield select(userExpire);
    if (new Date(expire) <= new Date(Date.now())) {
      const message = 'Login Session as expired, 🙏 Please re-login!!';
      yield showMessage({
        message: message,
        type: 'info',
      });
      // yield put(setMessage({ type: 'error', message: message }));
      yield delay(3000);
      yield put(signOutStart());
      yield delay(2000);
      yield put(setMessage(null));
    }
  } catch (error) {
    yield delay(5000);
    yield put(setMessage(null));
  }
}

export function* signOut() {
  try {
    yield delay(2500);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* makePayment({ payload: txref }) {
  const token = yield select(userToken);

  try {
    const result = yield paymentVerifyApi(token, txref).then(function (
      response,
    ) {
      return response.data.data;
    });
    yield put(setSubscription(result.subscription));
    yield put(signInSuccess(result.user));
    yield put(setMessage({ type: 'success', message: result.message }));
    yield delay(6000);
    yield put(setMessage(null));
  } catch (error) {
    // yield put(())
    yield put(
      userPaymentFailure({
        type: 'error',
        message: error.response
          ? error.response.data.message || error.response.data.error
          : 'Oops!!, Poor internet connection, Please check your connectivity, And try again',
      }),
    );
    // yield delay(6000);
    // yield put(setMessage(null));
  }
}

// export function* signInAfterSignUp({ payload: { user, additionalData } }) {
//   yield getSnapshotFromUserAuth(user, additionalData);
// }

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}
export function* OnVerifyAccount() {
  yield takeLatest(UserActionTypes.VERIFY_ACCOUNT, verifyAcct);
}

export function* onEditProfileStart() {
  yield takeLatest(UserActionTypes.EDIT_PROFILE, willEditProfile);
}

// verifyAcct;
export function* onSignInByTokenStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_BY_TOKEN_START, signByToken);
}

export function* onResendConfirmEmail() {
  yield takeLatest(
    UserActionTypes.RESEND_CONFIRM_EMAIL_START,
    isResendConfirmEmail,
  );
}

export function* onChangePassword() {
  yield takeLatest(UserActionTypes.CHANGE_PASSWORD, isChangePassword);
}

export function* onForgetPassword() {
  yield takeLatest(UserActionTypes.FORGET_PASSWORD_START, isForgetPassword);
}

export function* onResetPassword() {
  yield takeLatest(UserActionTypes.RESET_PASSWORD, isResetPassword);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSubmitSlip() {
  yield takeLatest(UserActionTypes.SUBMIT_SLIP_START, willSubmitSlip);
}

export function* userSagas() {
  yield all([
    call(onSubmitSlip),
    call(onSignInStart),
    call(OnVerifyAccount),
    call(onEditProfileStart),
    call(onSignInByTokenStart),
    call(onResendConfirmEmail),
    call(onChangePassword),
    call(onForgetPassword),
    call(onResetPassword),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    // call(onSignUpSuccess),
  ]);
}
