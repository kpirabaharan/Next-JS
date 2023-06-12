import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { getFilteredEvents } from '../../helpers/api-util';
import ResultsTitle from '../../components/events/ResultsTItle';
import EventList from '../../components/events/EventList';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';

const FilteredEventsPage = () => {
  const router = useRouter();
  const [events, setEvents] = useState();

  const filterData = router.query.slug;

  const filterYear = +filterData[0];
  const filterMonth = +filterData[1];

  const { data, error } = useSWR('http://localhost:3007/events', (url) =>
    fetch(url).then((res) => res.json()),
  );

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  if (!events) {
    return <p className='center'>Loading...</p>;
  }

  if (
    isNaN(filterYear) ||
    isNaN(filterMonth) ||
    filterYear > 2030 ||
    filterYear < 2021 ||
    filterMonth < 1 ||
    filterMonth > 12 ||
    error
  ) {
    return (
      <div className='center'>
        <ErrorAlert>
          <p>Invalid Filter. Please Adjust Your Values.</p>
        </ErrorAlert>
        <Button link='/events'>Show All Events</Button>
      </div>
    );
  }

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filterYear &&
      eventDate.getMonth() === filterMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div>
        <ErrorAlert>
          <p className='center'>No Events For This Month</p>;
        </ErrorAlert>
        <Button link='/events'>Show All Events</Button>
      </div>
    );
  }

  const date = new Date(filterYear, filterMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filterYear = +filterData[0];
//   const filterMonth = +filterData[1];

//   if (
//     isNaN(filterYear) ||
//     isNaN(filterMonth) ||
//     filterYear > 2030 ||
//     filterYear < 2021 ||
//     filterMonth < 1 ||
//     filterMonth > 12
//   ) {
//     return { props: { hasError: true } };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: filterYear,
//     month: filterMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: { year: filterYear, month: filterMonth },
//     },
//   };
// }

export default FilteredEventsPage;
