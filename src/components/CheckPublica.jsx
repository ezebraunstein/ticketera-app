import { getUser } from "../graphql/queries";
import { API, graphqlOperation } from 'aws-amplify';

const checkPublica = async (user) => {
  const userCreado = user.username;
  const userData = await API.graphql(
    graphqlOperation(getUser, { id: userCreado })
  );

  if (userData.data.getUser !== null) {
    return userData.data.getUser.publica;
  } else {
    return null;
  }
};

export default checkPublica;
