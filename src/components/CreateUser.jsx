import { useState, useEffect } from "react";
import { createUser, createRRPP } from "../graphql/mutations";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import awsExports from "../aws-exports";
import Swal from 'sweetalert2';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsExports);

function App({ user }) {
  const [userData, setUsersData] = useState({});
  const [typeUser, setTypeUser] = useState('producer');
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      userData.nameUser &&
      userData.surnameUser &&
      userData.dniUser
    );
  }, [userData]);

  const handleSubmit = async (event) => {

    event.preventDefault();

    const createUserInput = {
      id: user.username,
      nameUser: userData.nameUser,
      surnameUser: userData.surnameUser,
      dniUser: userData.dniUser,
      emailUser: user.attributes.email
    };

    const createRRPPInput = {
      id: user.username,
      nameRRPP: userData.nameUser,
      surnameRRPP: userData.surnameUser,
      dniRRPP: userData.dniUser,
      emailRRPP: user.attributes.email
    };

    try {
      debugger;
      if (typeUser === 'rrpp') {
        await API.graphql(
          graphqlOperation(createRRPP, { input: createRRPPInput }));
        navigate(`/publica-events`);
      } else if (typeUser === 'producer') {
        await API.graphql(
          graphqlOperation(createUser, { input: createUserInput }));
        navigate(`/`);
      }

      Swal.fire({
        icon: 'success',
        title: 'Usuario creado con éxito.',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el usuario.',
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsersData({ ...userData, [name]: value });
  };

  const handleTypeUserChange = (event) => {
    setTypeUser(event.target.value);
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
        <label className='labelEvent'>Tipo de usuario:
          <select className='form-control'
            name="typeUser"
            value={typeUser}
            onChange={handleTypeUserChange}
          >
            <option value="producer">Productor</option>
            <option value="rrpp">RRPP</option>
          </select>
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
