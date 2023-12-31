import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { createTeam, updateTeam } from '../../api/teamData';
import { useAuth } from '../../utils/context/authContext';

const initialTeamState = {
  team_name: '',
};

function TeamForm({ obj }) {
  const [tFormInput, setTFormInput] = useState(initialTeamState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (obj.firebaseKey) {
      setTFormInput(obj);
    }
  }, [obj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTeam(tFormInput).then(() => router.push(`/team/${obj.firebaseKey}`));
    } else {
      const payload = { ...tFormInput, uid: user.uid };
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeam(patchPayload).then(() => {
          router.push('/teams');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team</h2>

      <FloatingLabel controlId="FloatingInputT1" label="Team Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Star"
          name="team_name"
          value={tFormInput.team_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
    </Form>
  );
  // end of function
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    team_name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: initialTeamState,
};

export default TeamForm;
