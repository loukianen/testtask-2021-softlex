/* eslint-disable import/prefer-default-export */
export const getErrorText = (errorMessage, mainText) => {
  const posibleErrors = ['password', 'token', 'id', 'username'];
  const resultTextParts = posibleErrors.reduce((acc, item) => {
    if (errorMessage[item]) {
      acc.push(errorMessage[item]);
    }
    return acc;
  }, [mainText]);
  return resultTextParts.join(' ');
};
