import firebase from 'firebase/compat/app';
import firebaseConfig from './variables.js';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';

import { addDoc, collection, getDocs, query, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ReactSession from 'react-client-session';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
});

const consulta = gql`
query { 
   hola
}
`



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// firebase.functions().useEmulator("localhost", 5001);
const MySwal = withReactContent(Swal)

const consultarDatabase = async (nombreColeccion) => {
  try {

    const respuesta = await db.collection(nombreColeccion).get();
    const coleccionDatos = respuesta.docs.map((documento) => {
      console.log(documento);
      console.log(documento.data);
      const documentoTemporal = {
        id: documento.id,
        ...documento.data()

      }
      console.log(documentoTemporal)
      return documentoTemporal
    }
    )
    return coleccionDatos
  } catch (e) {
    throw new Error(e)
  }
}


const actualizarDocumentoDatabase = async (nombreColeccion, id, data) => {
  try {
    console.log(data);

    //const respuesta = await updateDoc(doc(db, nombreColeccion, id), data)
    await db.collection(nombreColeccion).doc(id).update(data);

  } catch (e) {
    throw new Error(e)
  }
}

const addDocumentoDatabase = async (nombreColeccion, data) => {
  try {
    console.log(data);


    await db.collection(nombreColeccion).add(data);

  } catch (e) {
    throw new Error(e)
  }
}

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        rol: "vendedor",
        estado: "pendiente"
      });
    }
    addUserGraphQl(user.multiFactor.user.displayName, user.email, user.uid, '123');
    //addUserGraphQl(user.name, )
    findUserGraphQl(user.email);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    client.query({
      query: consulta
    })
      .then((response) => {
        console.log(response.data)
        findUserGraphQl(email)
      })

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    const uid = user.uid;
    addUserGraphQl(name, email, uid, password);

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const addUserGraphQl = async (name, email, uid, password) => {
  try {
    await client.mutate({
      mutation: gql`
    mutation createUser($name: String!,$email: String!, $password: String!, $uid: String!) {
createUser(
  name:$name,
  email:$email,
  status:"61984d2558a50c9b2a89aeac",
  user:$uid,
  password:$password,
  rol:"61984d2558a50c9b2a89aeac"  
){
  name
  
}
    }
      `,
      variables: { name, email, uid, password }

    })
      .then((response) => {
        console.log(response.data)
      })


  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const findUserGraphQl = async (email) => {
  try {
    await client.mutate({
      mutation: gql`
      mutation findUser($email: String!) {
        findUser(
          email:$email
          ){
            email
            name
            _id
          }
        }`,
      variables: { email }
    })
      .then((response) => {
        console.log("userrrrr:", response.data.findUser)
        localStorage.setItem('email', response.data.findUser.email)
        localStorage.setItem('name', response.data.findUser.name)
        localStorage.setItem('_id', response.data.findUser._id)
      })


  } catch (err) {
    console.error(err);
    return err
  }
}

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);

    await MySwal.fire({
      title: <strong>Exito!</strong>,
      html: <i>Se envió el link de reiniciar contraseña a su correo!</i>,
      icon: 'success'
    })
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  localStorage.clear()
  auth.signOut();
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  consultarDatabase,
  actualizarDocumentoDatabase,
  addDocumentoDatabase
};