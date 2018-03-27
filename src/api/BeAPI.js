// Readable fetchs API
const api = "http://localhost:3001"

export const getProjects = () => 
fetch(`${api}/projects`)
      .then(x => x.json());

export const postProjects = (newProject) => 
fetch(`${api}/projects`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // ...headers
  },
  body: JSON.stringify(newProject)
  }).then(x => x.json())