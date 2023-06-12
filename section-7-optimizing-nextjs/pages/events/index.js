import { useRouter } from 'next/router';
import Head from 'next/head';

import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';

const EventsPage = (props) => {
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name='description' content='Lots of greate events' />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />;
    </>
  );
};

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: { events: allEvents },
    revalidate: 60,
  };
}

export default EventsPage;
