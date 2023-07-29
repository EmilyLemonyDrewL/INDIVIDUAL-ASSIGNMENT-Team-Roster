import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTeamMembers } from '../api/mergedData';

function TeamCard({ teamObj, onUpdate }) {
  if (!teamObj) {
    return null;
  }

  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.team_name} + all of their books?`)) {
      deleteTeamMembers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{teamObj.team_name}</Card.Title>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary">View Team Members</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="m-2">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
