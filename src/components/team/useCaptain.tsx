import { useEffect, useState } from 'react';
import { Team } from '../../lib/api/team';
import { useLoginContext } from '../../lib/loginContext';

export default function useCaptain(team: Team | undefined): boolean {
  const [isCaptain, setIsCaptain] = useState(false);

  const { user } = useLoginContext();

  useEffect(() => {
    if (team && team?.members.length > 0 && user?.id) {
      setIsCaptain(
        team.members.findIndex(
          (member) => member.id === user.id && member.role === 'captain'
        ) > -1
      );
    }
  }, [team, user]);

  return isCaptain;
}
