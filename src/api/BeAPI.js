// Readable fetchs API
const api = "http://localhost:3001";

// fetch authentication

export const postLogin = newLogin =>
  fetch(`${api}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // ...headers
    },
    body: JSON.stringify(newLogin)
  }).then(x => x.json());

export const postSignUp = newSignup =>
  fetch(`${api}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // ...headers
    },
    body: JSON.stringify(newSignup)
  })
  .then(x => x.json());


// fetch projects

export const getProjects = () => fetch(`${api}/projects`).then(x => x.json());

export const postProjects = newProject =>
  fetch(`${api}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin",
    body: JSON.stringify(newProject)
  }).then(x => x.json());

export const deleteProjects = deletedProject =>
  fetch(`${api}/projects`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
      // ...headers
    },
    body: JSON.stringify(deletedProject)
  });

// fetch tasks

export const getTasks = () => fetch(`${api}/tasks`).then(x => x.json());

export const postTasks = newTasks =>
  fetch(`${api}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTasks)
  }).then(x => x.json());

export const deleteTasks = deleteTasks =>
fetch(`${api}/tasks`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
    // ...headers
  },
  body: JSON.stringify(deleteTasks)
});