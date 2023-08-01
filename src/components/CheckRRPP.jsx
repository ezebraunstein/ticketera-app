import { getRRPP } from "../graphql/queries";
import { API, graphqlOperation } from 'aws-amplify';


const checkRRPP = async (user) => {

    const userCreado = user.username;
    const userData = await API.graphql(
      graphqlOperation(getRRPP, { id: userCreado })
    );

    if (userData.data.getRRPP !== null) {
      //console.log("El RRPP existe");
      return true;
    } else {
      //console.log("El RRPP no existe");
      return false;
    }
};

export default checkRRPP;