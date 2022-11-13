const getSubscriptionStatus = ({ userId, subscriptionId }: { userId: string, subscriptionId: string }) => {
  return fetch(
    `https://us-central1-tastola-86b7b.cloudfunctions.net/v1/check-s-status?cId=${userId}&sId=${subscriptionId}`,
  )
    .then((response) => response.json());
};

export default getSubscriptionStatus;