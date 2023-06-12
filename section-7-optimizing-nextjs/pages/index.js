import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/EventList';

const HomePage = (props) => {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { events: featuredEvents },
    revalidate: 60,
  };
}

export default HomePage;
