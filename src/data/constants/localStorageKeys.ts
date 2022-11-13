// Local storage is mostly used for communication between
// the content script, and the payment website
// But because local storage is not very trustworthy, as it can be be blocked and manipulated
// we use local storage as one of the solutions for each case, and there is another fallback
// solution for each case

const LocalStorageKeys = {
  // popup passes user id/email to content script through storage api
  // content script passes user id/email to payment page through local storage
  // payment page associates this id to the user for payment
  // secondary existing solution:
  // -- when popup directs to payment page, it sends the user id/email through query params
  financialtoolbaruserid: 'financialtoolbaruserid',

  // upon payment, payment page passes subscription id to content script through local storage
  // content script passes subscription id to popup through storage api
  // popup checks for subscription status using that subscription id
  // secondary existing solution:
  // -- popup checks for subscription status using the user id/email only anyway
  // -- but it can take a minute after payment for it to reflect
  financialtoolbarsubscriptionid: 'financialtoolbarsubscriptionid'
};

export default LocalStorageKeys;