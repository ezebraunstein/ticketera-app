import "../App.css";
import { useState, useEffect } from "react";
import { createUser } from "../graphql/mutations";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

function App() {

  const [users, setUsers] = useState([]);
  const [userData, setUsersData] = useState({});

  const uploadUser = async () => {
    await API.graphql({
      query: createUser,
      variables: {
        input: {
          nameUser: userData.nameUser,
          surnameUser: userData.surnameUser,
          dniUser: userData.dniUser,
          emailUser: userData.emailUser,
          aliasUser: userData.aliasUser,
        }
      }
    });
  };

  return (
    <div className="App">
      <div className="newUser">
        <input
          placeholder="Nombre"
          value={userData.nameUser}
          onChange={(e) =>
            setUsersData({ ...userData, nameUser: e.target.value })
          }
        ></input>
        <input
          placeholder="Apellido"
          value={userData.surnameUser}
          onChange={(e) =>
            setUsersData({ ...userData, surnameUser: e.target.value })
          }
        ></input>
        <input
          placeholder="DNI"
          value={userData.dniUser}
          onChange={(e) => setUsersData({ ...userData, dniUser: e.target.value })}
        ></input>
        <input
          placeholder="Email"
          value={userData.emailUser}
          onChange={(e) => setUsersData({ ...userData, emailUser: e.target.value })}
        ></input>
        <input
          placeholder="ALIAS"
          value={userData.aliasUser}
          onChange={(e) =>
            setUsersData({ ...userData, aliasUser: e.target.value })
          }
        ></input>
        <button onClick={uploadUser}>Agregar Usuario</button>
      </div>
    </div>
  );
}

export default App;
