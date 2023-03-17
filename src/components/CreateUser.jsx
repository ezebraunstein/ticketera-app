import "../App.css";
import { useState } from "react";
import { createUser } from "../graphql/mutations";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import awsExports from "../aws-exports";
import Swal from 'sweetalert2';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsExports);

function App({ user }) {

  const [userData, setUsersData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (users) => {
    users.preventDefault();
    const createUserInput = {
      id: user.username,
      nameUser: userData.nameUser,
      surnameUser: userData.surnameUser,
      dniUser: userData.dniUser,
      emailUser: user.attributes.email,
      aliasUser: userData.aliasUser,
    };

    try {
      await API.graphql(
        graphqlOperation(createUser, { input: createUserInput }))
      Swal.fire({
        icon: 'success',
        title: 'Usuario creado con éxito.',

      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el usuario.',
      });
    }
    navigate(`/`);
  };




  return (
    <div>
      <form className="userForm" onSubmit={handleSubmit}>
        <label className="newUser">
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
          <label className="aliasUser">ALIAS
            <input
              placeholder="ALIAS"
              value={userData.aliasUser}
              onChange={(e) =>
                setUsersData({ ...userData, aliasUser: e.target.value })
              }
            ></input>
          </label>
          <button className='buttonEvent' type="submit">Agregar Usuario</button>
        </label>
      </form>
    </div>

  );
}

export default withAuthenticator(App);
