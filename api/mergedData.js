import { getTeamsMembers, getSingleTeam, deleteTeam } from './teamData';
import { getSingleMember, deleteMembers } from './memberData';

const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObject) => {
      getSingleTeam(memberObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...memberObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamsMembers(teamFirebaseKey)])
    .then(([teamObject, teamMemberArray]) => {
      resolve({ ...teamObject, members: teamMemberArray });
    }).catch((error) => reject(error));
});

const deleteTeamMembers = (teamId) => new Promise((resolve, reject) => {
  getTeamsMembers(teamId).then((membersArray) => {
    console.warn(membersArray, 'Team Members');
    const deleteMemberPromises = membersArray.map((members) => deleteMembers(members.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewMemberDetails, viewTeamDetails, deleteTeamMembers };
