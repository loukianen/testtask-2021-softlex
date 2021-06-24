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

export const isAuthenticationValid = (validityPeriod) => {
  if (!localStorage.getItem('softlexToDoToken') || !localStorage.getItem('softlexToDoTokenDate')) {
    return false;
  }
  return (Date.now() - Number(localStorage.getItem('softlexToDoTokenDate'))) < validityPeriod;
};

export const clearTokenData = () => {
  localStorage.removeItem('softlexToDoToken');
  localStorage.removeItem('softlexToDoTokenDate');
  localStorage.removeItem('softlexToDoTokenUsername');
};
