// Readable fetchs API
const api = "http://localhost:3001";
// const api = "http://192.168.1.47:3001";

// fetch authentication
export const getLogout = () => fetch(`${api}/logout`, {credentials: "include"} ).then(x => x.json());

// fetch users
export const getUser = () => fetch(`${api}/user`, {credentials: "include"}).then(x => x.json());

export const postLogin = newLogin =>
  fetch(`${api}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // ...headers
    },
    credentials: "include",
    body: JSON.stringify(newLogin)
  }).then(x => x.json());

export const postSignUp = newSignup =>
  fetch(`${api}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // ...headers
    },
    credentials: "include",
    body: JSON.stringify(newSignup)
  })
  .then(x => x.json());

// fetch projects
export const getProjects = () =>
  fetch(`${api}/projects`, {credentials: "include"})
    .then(x => x.json());

export const postProjects = newProject =>
  fetch(`${api}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(newProject)
  }).then(x => x.json());

export const deleteProjects = deletedProject =>
  fetch(`${api}/projects`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
      // ...headers
    },
    credentials: "include",
    body: JSON.stringify(deletedProject)
  });

// fetch tasks

export const getTasks = (project_id) => fetch(`${api}/tasks/${project_id}`, {credentials: "include"}).then(x => x.json());

export const postTasks = newTasks =>
  fetch(`${api}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(newTasks)
  }).then(x => x.json());

export const deleteTasks = deleteTasks =>
fetch(`${api}/tasks`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
    // ...headers
  },
  credentials: "include",
  body: JSON.stringify(deleteTasks)
});