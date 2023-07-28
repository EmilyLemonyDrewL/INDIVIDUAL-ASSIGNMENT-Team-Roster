import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';
import { getTeams } from '../../api/teamData';

const initialState = {
  image: '',
  name: '',
  skill_set: '',
  weakness: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.id).then(setTeams);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push(`/member/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

      <FloatingLabel controlId="FloatingInput1" label="Member Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Pikachu"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="FloatingInput2" label="Member Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="FloatingInput3" label="Member Skills" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Recharges itself by sleeping"
          name="skill_set"
          value={formInput.skill_set}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="FloatingInput4" label="Member Weakness" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Earthquakes"
          name="weakness"
          value={formInput.weakness}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Team Select */}
      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select
          aria-label="Team"
          name="team_id"
          onChange={handleChange}
          className="mb-3"
          value={obj.team_id}
          required
        >
          <option value="">Select A Team</option>
          {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.team_name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    team_name: PropTypes.string,
    skill_set: PropTypes.string,
    weakness: PropTypes.string,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
