import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const LOGIN_API = `${BASE_URL}/api/login`;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
  withCredentials: true
});

export const createUser = (user) =>
  api.post(`${USERS_API}`, user)
    .then(response => response.data);

export const findAllUsers = () =>
   api.get(USERS_API)
    .then(response => response.data);

export const findUserById = (uid) =>
  api.get(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUser = (uid) => {
  api.delete(`${USERS_API}/${uid}`)
      .then(response => response.data);
}

// export const deleteUsersByUsername = (username) =>
//   axios.delete(`${USERS_API}/username/${username}`)
//       .then(response => {
//         console.log("response");
//         console.log(response.data);
//         response.data});

export const deleteUsersByUsername = (username) =>
    api.delete(`${USERS_API}/username/${username}/delete`)
        .then(response => response.data);

export const findUserByCredentials = (credentials) =>
  api.post(`${LOGIN_API}`, credentials)
    .then(response => response.data);

const service = {
  findAllUsers
}

export default service;