const UserProfilePage = (props) => {
  return <h1>{props.username}</h1>;
};

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  // Generated every refresh, REAL server side rendering
  console.log('Server-side Code');

  // console.log(req);
  // console.log(res);

  return {
    props: {
      username: 'Keeshigan',
    },
  };
}

export default UserProfilePage;
