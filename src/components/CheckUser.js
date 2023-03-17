import { getUser } from "../graphql/queries";
import { API, graphqlOperation } from 'aws-amplify';


const checkUser = async (user) => {

    const userCreado = user.username;
    const userData = await API.graphql(
        graphqlOperation(getUser, { id: userCreado })
    );

    if (userData.data.getUser !== null) {
        console.log("El usuario ya existe");
        return true;
    } else {
        console.log("El usuario no existe");
        return false;
    }
};

export default checkUser;