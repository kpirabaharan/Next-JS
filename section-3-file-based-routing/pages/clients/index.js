import Link from 'next/link';

const ClientsPage = () => {
  const clients = [
    { id: 'keesh', name: 'Keeshigan' },
    { id: 'binu', name: 'Biranugan' },
  ];
  return (
    <div>
      <h1>Client Page</h1>

      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={`/clients/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
