import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  downloads: null,
  myDownloads: null,
  subscription: null,
  message: null,
  token: null,
  success: null,
  error: null,
  isLoading: null,
  confirmMessage: null,
  paymentData: null,
  fileData: null,
  showPreview: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //Either any of the cases
    case UserActionTypes.EDIT_PROFILE:
      return {
        ...state,
        isLoading: true,
      };

    case UserActionTypes.SET_PREVIEW:
      return {
        ...state,
        showPreview: action.payload,
        error: null,
      };
    case UserActionTypes.SUBMIT_SLIP_START:
      return {
        ...state,
        isLoading: true,
        fileData: null,
        error: null,
      };
    case UserActionTypes.SUBMIT_SLIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fileData: action.payload,
        error: null,
      };
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        // isLoading: true,
        error: null,
        // message: null,
        success: null,
        // paymentData: '',
        currentUser: action.payload,
      };
    case UserActionTypes.SET_MY_DOWNLOADS:
      return {
        ...state,
        // isLoading: true,
        error: null,
        // message: null,
        success: null,
        // paymentData: '',
        myDownloads: action.payload,
      };
    case UserActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        // isLoading: true,
        error: null,
        // message: null,
        success: null,
        // paymentData: '',
      };
    case UserActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        error: null,
        success: null,
      };
    case UserActionTypes.SET_DOWNLOADS:
      return {
        ...state,
        downloads: action.payload,
        error: null,
        success: null,
        isLoading: null,
      };
    case UserActionTypes.SET_SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload,
        error: null,
        success: null,
      };
    case UserActionTypes.SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
        error: null,
        success: null,
      };
    case UserActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        message: null,
        error: null,
        success: null,
        paymentData: null,
      };
    case UserActionTypes.SET_PAYMENT_DATA:
      return {
        ...state,
        message: null,
        paymentData: action.payload,
        isLoading: true,
        error: null,
        success: null,
      };

    case UserActionTypes.USER_PAYMENT_START:
      return {
        ...state,
        message: null,
        isLoading: true,
        error: null,
        success: null,
      };

    case UserActionTypes.USER_PAYMENT_SUCCESS:
      return {
        ...state,
        message: null,
        isLoading: false,
        error: null,
        success: null,
        // paymentData: null,
      };

    case UserActionTypes.USER_PAYMENT_FAILURE:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: null,
        success: null,
        // paymentData: null,
      };
    case UserActionTypes.FORGET_PASSWORD_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };
    case UserActionTypes.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: null,
      };
    case UserActionTypes.RESEND_CONFIRM_EMAIL_START:
      return {
        ...state,
        isLoading: true,
        message: action.payload,
        error: null,
        success: null,
      };
    case UserActionTypes.RESEND_CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        error: null,
        success: null,
      };
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        isLoading: true,
        currentUser: null,
        token: null,
        error: null,
        success: null,
      };
    case UserActionTypes.SIGN_OUT_START:
      return {
        ...state,
        isLoading: false,
        currentUser: null,
        subscription: null,
        downloads: null,
        myDownloads: null,
        token: null,
        error: null,
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_IN_START:
      return {
        ...state,
        isLoading: true,
        currentUser: null,
        token: null,
        error: null,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: null,
        subscription: null,
        downloads: null,
        myDownloads: null,
        token: null,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
