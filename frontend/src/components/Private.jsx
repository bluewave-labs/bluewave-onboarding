import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/authProvider';
import { getTeamCount } from '../services/teamServices';
import LoadingPage from './LoadingPage/LoadingPage'

const Private = ({ Component }) => {
  const { isLoggedIn, isFetching } = useAuth();
  const [teamExistence, setTeamExistence] = useState(false);
  const [isFetchingTeam, setFetchingTeam] = useState(true);

  useEffect(() => {
    const fetchTeamCount = async () => {
      try {
        const { teamExists } = await getTeamCount();
        setTeamExistence(teamExists);
      } catch (err) {
        console.error(err);
        setTeamExistence(false);
      } finally {
        setFetchingTeam(false);
      }
    };
    fetchTeamCount();
  }, []);

  return (isFetching || isFetchingTeam) ? <LoadingPage /> : (isLoggedIn ? <Component /> : (teamExistence ? <Navigate to="/login" /> : <Navigate to="/signup" />));
}

export default Private;