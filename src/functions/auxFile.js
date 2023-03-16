// const [users, setUsers] = useState([]);
// const [userData, setUsersData] = useState({});

// useEffect(() => {
//   fetchUsers();
// }, []);

// const fetchUsers = async () => {
//   try {
//     const userData = await API.graphql(graphqlOperation(listUsuarios));
//     const userList = userData.data.listUsuarios.items;
//     console.log("Lista de Usuarios", userList);
//     setUsers(userList);
//   } catch (error) {
//     console.log("error on fetching users", error);
//   }
// };
// const uploadUser = async () => {
//   const createUserInput = {
//     id: uuid(),
//     nombre: userData.nombre,
//     apellido: userData.apellido,
//     dni: userData.dni,
//     email: userData.email,
//     facturacion: userData.facturacion,
//   };
//   await API.graphql(
//     graphqlOperation(createUsuario, { input: createUserInput })
//   );
// };

//   {/* <table></table>
// <h1>Lista de Usuarios</h1>
// <div className="userList">
//   {users.map((users) => {
//     return (
//       <div className="user" key={users.id}>
//         <h2>{users.nombre}</h2>
//         <h2>{users.apellido}</h2>
//         <h2>{users.dni}</h2>
//         <h2>{users.email}</h2>
//         <h2>{users.facturacion}</h2>
//       </div>
//     );
//   })}
// </div>
// <div className="newUser">
//   <input
//     id="descNom"
//     placeholder="Nombre"
//     value={userData.nombre}
//     onChange={(e) =>
//       setUsersData({ ...userData, nombre: e.target.value })
//     }
//   ></input>
//   <input
//     placeholder="Apellido"
//     value={userData.apellido}
//     onChange={(e) =>
//       setUsersData({ ...userData, apellido: e.target.value })
//     }
//   ></input>
//   <input
//     placeholder="DNI"
//     value={userData.dni}
//     onChange={(e) => setUsersData({ ...userData, dni: e.target.value })}
//   ></input>
//   <input
//     placeholder="Email"
//     value={userData.email}
//     onChange={(e) => setUsersData({ ...userData, email: e.target.value })}
//   ></input>
//   <input
//     placeholder="Facturacion"
//     value={userData.facturacion}
//     onChange={(e) =>
//       setUsersData({ ...userData, facturacion: e.target.value })
//     }
//   ></input>
//   <button onClick={uploadUser}>Agregar Usuario</button>
// </div> */}
