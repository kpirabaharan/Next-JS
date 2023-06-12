import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../helpers/api-util';
import ResultsTitle from '../../components/events/ResultsTItle';
import EventList from '../../components/events/EventList';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';

const FilteredEventsPage = (props) => {
  const router = useRouter();

  const { events } = props;
  const { year, month } = props.date;

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className='center'>Loading...</p>;
  }

  const filterYear = +filterData[0];
  const filterMonth = +filterData[1];

  if (props.hasError) {
    return (
      <div className='center'>
        <ErrorAlert>
          <p>Invalid Filter. Please Adjust Your Values.</p>
        </ErrorAlert>
        <Button link='/events'>Show All Events</Button>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div>
        <ErrorAlert>
          <p className='center'>No Events For This Month</p>;
        </ErrorAlert>
        <Button link='/events'>Show All Events</Button>
      </div>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filterYear = +filterData[0];
  const filterMonth = +filterData[1];

  if (
    isNaN(filterYear) ||
    isNaN(filterMonth) ||
    filterYear > 2030 ||
    filterYear < 2021 ||
    filterMonth < 1 ||
    filterMonth > 12
  ) {
    return { props: { hasError: true } };
  }

  const filteredEvents = await getFilteredEvents({
    year: filterYear,
    month: filterMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: { year: filterYear, month: filterMonth },
    },
  };
}

export default FilteredEventsPage;
