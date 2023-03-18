import './CreateEvent.css';
import { useState, useEffect } from "react";
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
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      userData.nameUser &&
      userData.surnameUser &&
      userData.dniUser &&
      userData.aliasUser
    );
  }, [userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsersData({ ...userData, [name]: value });
  };

  return (
    <div>
      <form className="eventForm" onSubmit={handleSubmit}>
          <label className="labelEvent">Nombre/s:
            <input className='inputEvent'
              placeholder="Nombre"
              name="nameUser"
              value={userData.nameUser || ''}
              onChange={handleInputChange}
            ></input>
          </label>
          <label className='labelEvent'>Apellido/s:
            <input className='inputEvent'
              placeholder="Apellido"
              name="surnameUser"
              value={userData.surnameUser || ''}
              onChange={handleInputChange}
            ></input>
          </label>
          <label className='labelEvent'>DNI:
            <input className='inputEvent'
              placeholder="DNI"
              name="dniUser"
              value={userData.dniUser || ''}
              onChange={handleInputChange}
            ></input>
          </label>
          <label className='labelEvent'>ALIAS:
            <input className='inputEvent'
              placeholder="ALIAS"
              name="aliasUser"
              value={userData.aliasUser || ''}
              onChange={handleInputChange}
            ></input>
          </label>
          <label className='labelEvent'>
            <button className='btn btn-primary' type="submit" disabled={!isFormValid}>
              Agregar Usuario
            </button>
          </label>
      </form>
    </div>

  );
}

export default withAuthenticator(App);


