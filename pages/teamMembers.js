import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getMembers } from '../api/memberData';
import MemberCard from '../components/MemberCard';
import { useAuth } from '../utils/context/authContext';

function ShowAllMembers() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();
  // create function to calls API and gets members
  const getAllTheMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllTheMembers();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="teamMember/new" passHref>
        <Button>Add A Member</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
        ))}
      </div>
    </div>
  );
}

export default ShowAllMembers;
