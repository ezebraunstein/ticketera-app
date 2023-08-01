// import { useState, useEffect } from "react";
// import { createUser } from "../graphql/mutations";
// import { Amplify, API, graphqlOperation } from "aws-amplify";
// import { useNavigate } from "react-router-dom";
// import awsExports from "../aws-exports";
// import Swal from 'sweetalert2';
// import checkPublica from './CheckPublica';
// import { withAuthenticator } from '@aws-amplify/ui-react';

// Amplify.configure(awsExports);

// function App({ user }) {

//   const [userData, setUsersData] = useState({});
//   const [publica, setPublica] = useState('No');
//   const navigate = useNavigate();
//   const [userPublica, setUserPublica] = useState(null);
//   const [isFormValid, setIsFormValid] = useState(false);

//   useEffect(() => {
//     setIsFormValid(
//       userData.nameUser &&
//       userData.surnameUser &&
//       userData.dniUser &&
//       userData.aliasUser
//     );

//   }, [userData]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const createUserInput = {
//       id: user.username,
//       nameUser: userData.nameUser,
//       surnameUser: userData.surnameUser,
//       dniUser: userData.dniUser,
//       emailUser: user.attributes.email,
//       aliasUser: userData.aliasUser,
//       publica: publica === 'publica',
//     };

//     try {
//       await API.graphql(
//         graphqlOperation(createUser, { input: createUserInput }))

//       if (user) {
//         const checkData = async () => {
//           const userPublicaResult = await checkPublica(user);
//           setUserPublica(userPublicaResult);
//         };
//         checkData();
//       }

//       Swal.fire({
//         icon: 'success',
//         title: 'Usuario creado con éxito.',
//         showConfirmButton: true,
//         confirmButtonText: 'Aceptar'
//       }).then(() => {
//         if (userPublica === true) {
//           navigate(`/publica-events`);
//         } else {
//           navigate(`/`);
//         }
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error al crear el usuario.',
//       });
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUsersData({ ...userData, [name]: value });
//   };

//   const handlePublicaChange = (event) => {
//     setPublica(event.target.value);
//   };

//   return (
//     <div>
//       <form className="eventForm" onSubmit={handleSubmit}>
//         <label className="labelEvent">Nombre/s:
//           <input className='inputEvent'
//             placeholder="Nombre"
//             name="nameUser"
//             value={userData.nameUser || ''}
//             onChange={handleInputChange}
//           ></input>
//         </label>
//         <label className='labelEvent'>Apellido/s:
//           <input className='inputEvent'
//             placeholder="Apellido"
//             name="surnameUser"
//             value={userData.surnameUser || ''}
//             onChange={handleInputChange}
//           ></input>
//         </label>
//         <label className='labelEvent'>DNI:
//           <input className='inputEvent'
//             placeholder="DNI"
//             name="dniUser"
//             value={userData.dniUser || ''}
//             onChange={handleInputChange}
//           ></input>
//         </label>
//         <label className='labelEvent'>ALIAS:
//           <input className='inputEvent'
//             placeholder="ALIAS"
//             name="aliasUser"
//             value={userData.aliasUser || ''}
//             onChange={handleInputChange}
//           ></input>
//         </label>
//         <label className='labelEvent'>Tipo de usuario (seleccionar Productor o RR.PP):
//           <select className='form-control'
//             name="publica"
//             value={publica}
//             onChange={handlePublicaChange}
//           >
//             <option value="productor">Productor</option>
//             <option value="publica">RR.PP</option>
//           </select>
//         </label>
//         <label className='labelEvent'>
//           <button className='btn btn-primary' type="submit" disabled={!isFormValid}>
//             Agregar Usuario
//           </button>
//         </label>
//       </form>
//     </div>
//   );
// }

// export default withAuthenticator(App);

import { useState, useEffect } from "react";
import { createUser } from "../graphql/mutations";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import awsExports from "../aws-exports";
import Swal from 'sweetalert2';
import checkPublica from './CheckPublica';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsExports);

function App({ user }) {
  const [userData, setUsersData] = useState({});
  const [publica, setPublica] = useState('No');
  const navigate = useNavigate();
  const [userPublica, setUserPublica] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      userData.nameUser &&
      userData.surnameUser &&
      userData.dniUser &&
      userData.aliasUser
    );
  }, [userData]);

  useEffect(() => {
    if (userPublica === true) {
      navigate(`/publica-events`);
    } else if (userPublica === false) {
      navigate(`/`);
    }
  }, [userPublica, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createUserInput = {
      id: user.username,
      nameUser: userData.nameUser,
      surnameUser: userData.surnameUser,
      dniUser: userData.dniUser,
      emailUser: user.attributes.email,
      aliasUser: userData.aliasUser,
      publica: publica === 'publica',
    };

    try {
      await API.graphql(
        graphqlOperation(createUser, { input: createUserInput })
      );

      if (user) {
        const userPublicaResult = await checkPublica(user);
        setUserPublica(userPublicaResult);
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

  const handlePublicaChange = (event) => {
    setPublica(event.target.value);
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
        <label className='labelEvent'>Tipo de usuario:
          <select className='form-control'
            name="publica"
            value={publica}
            onChange={handlePublicaChange}
          >
            <option value="productor">Productor</option>
            <option value="publica">RRPP</option>
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
