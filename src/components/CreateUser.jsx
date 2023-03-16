import "../App.css";
import { useState, useEffect } from "react";
import { createUser } from "../graphql/mutations";
import { v4 as uuid } from "uuid";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsExports from "../aws-exports";
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsExports);

function App({ user }) {

  const [users, setUsers] = useState([]);
  const [userData, setUsersData] = useState({});

  const uploadUser = async () => {
    await API.graphql({
      query: createUser,
      variables: {
        input: {
          id: user.username,
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
        <label className="nameUser">Nombre
          <input
            placeholder="Nombre"
            value={userData.nameUser}
            onChange={(e) =>
              setUsersData({ ...userData, nameUser: e.target.value })
            }
          ></input>
        </label>
        < label className="surnameUser">Apellido
          <input
            placeholder="Apellido"
            value={userData.surnameUser}
            onChange={(e) =>
              setUsersData({ ...userData, surnameUser: e.target.value })
            }
          ></input>
        </label>
        < label className="dniUser">DNI
          <input
            placeholder="DNI"
            value={userData.dniUser}
            onChange={(e) => setUsersData({ ...userData, dniUser: e.target.value })}
          ></input>
        </label>
        <label className="emailUser">Email
          <input
            placeholder="Email"
            value={userData.emailUser}
            onChange={(e) => setUsersData({ ...userData, emailUser: e.target.value })}
          ></input>
        </label>
        <label className="aliasUser">ALIAS
          <input
            placeholder="ALIAS"
            value={userData.aliasUser}
            onChange={(e) =>
              setUsersData({ ...userData, aliasUser: e.target.value })
            }
          ></input>
        </label>
        <button onClick={uploadUser}>Agregar Usuario</button>
      </div>
    </div>
  );
}

export default App;
