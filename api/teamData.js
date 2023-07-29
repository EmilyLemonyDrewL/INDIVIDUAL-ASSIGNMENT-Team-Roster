import { clientCredentials } from '../utils/client';

// API calls for teams

const endpoint = clientCredentials.databaseURL;

// GET THE TEAMS
const getTeams = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE NEW TEAMS
const createTeam = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET SINGLE TEAM
const getSingleTeam = (firesbaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams/${firesbaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE TEAM
const deleteTeam = (firesbaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams/${firesbaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// UPDATE TEAM
const updateTeam = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams/${payload.firesbaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// GET A SINGLE TEAMS MEMBERS
const getTeamsMembers = (firesbaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members.json?orderBy="team_id"&equalTo="${firesbaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getTeams,
  createTeam,
  getSingleTeam,
  deleteTeam,
  updateTeam,
  getTeamsMembers,
};
