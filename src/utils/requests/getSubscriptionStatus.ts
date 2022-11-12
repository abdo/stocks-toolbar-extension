const getSubscriptionStatus = ({ userId }: { userId: string }) => {
  return fetch(
    `https://us-central1-tastola-86b7b.cloudfunctions.net/v1/check-s-status?cId=${userId}`,
  )
    .then((response) => response.json());
};

export default getSubscriptionStatus;