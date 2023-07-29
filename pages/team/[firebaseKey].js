import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../../api/mergedData';
import MemberCard from '../../components/MemberCard';
import { getTeamsMembers } from '../../api/teamData';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  // grab the firebase key
  const { firebaseKey } = router.query;
  // make API call to the API layer to grab your data
  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>
          {teamDetails.team_name}
        </h5>
      </div>
      <div className="d-flex flex-wrap">
        {teamDetails.members?.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getTeamsMembers} />
        ))}
      </div>
    </div>
  );
}
