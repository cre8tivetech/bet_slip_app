import { createSelector } from 'reselect';

const selectUser = (state) => state.user;
// fileData;
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser,
);

export const selectToken = createSelector([selectUser], (user) => user.token);

export const selectMessage = createSelector(
  [selectUser],
  (user) => user.message,
);

export const selectError = createSelector([selectUser], (user) => user.error);

export const selectSuccess = createSelector(
  [selectUser],
  (user) => user.success,
);

export const selectFileData = createSelector(
  [selectUser],
  (user) => user.fileData,
);
export const selectShowPreview = createSelector(
  [selectUser],
  (user) => user.showPreview,
);

export const selectDownload = createSelector(
  [selectUser],
  (user) => user.downloads,
);

export const selectMyDownload = createSelector(
  [selectUser],
  (user) => user.myDownloads,
);
export const selectIsLoading = createSelector(
  [selectUser],
  (user) => user.isLoading,
);

export const selectIsConfirmMessage = createSelector(
  [selectUser],
  (user) => user.confirmMessage,
);

export const selectPaymentData = createSelector(
  [selectUser],
  (user) => user.paymentData,
);
