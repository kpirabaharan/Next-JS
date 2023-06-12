export const getAllEvents = async () => {
  const response = await fetch('http://localhost:3007/events');
  const events = await response.json();

  // const events = [];
  // for (const key in data) {
  //   events.push({
  //     id: key,
  //   });
  // }

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};
