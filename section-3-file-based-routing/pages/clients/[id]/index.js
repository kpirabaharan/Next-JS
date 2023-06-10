import { useRouter } from 'next/router';
import PortfolioProjectPage from '../../portfolio/[projectId]';

const ClientsProjectsPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const loadProjectHandler = () => {
    // router.push('/clients/keesh/projectA');
    router.push({
      pathname: '/clients/[id]/[clientProjectId]',
      query: { id: id, clientProjectId: 'projectA' },
    });
    // Cannot go back when replaced
    // router.replace('/clients/keesh/projectA');
  };

  return (
    <div>
      <h1>The projects of a given client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientsProjectsPage;
