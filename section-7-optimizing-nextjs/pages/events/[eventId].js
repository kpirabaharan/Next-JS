import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert';
import Button from '../../components/ui/Button';

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className='center'>
        <ErrorAlert>
          <h1>No event found!</h1>
        </ErrorAlert>
        <Button link='/events'>Show All Events</Button>
      </div>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return { props: { selectedEvent: event }, revalidate: 30 };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paramPaths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paramPaths,
    // All paths are defined so fallback = false
    fallback: 'blocking',
  };
}

export default EventDetailPage;
