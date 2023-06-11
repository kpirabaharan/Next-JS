import Link from 'next/link';

const EventItem = (props) => {
  const { title, image, date, location, id } = props;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');

  const formattedLink = `/events/${id}`;

  return (
    <li>
      <img src={'/' + image} alt={title} />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{formattedDate}</time>
          </div>
          <div>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div>
          <Link href={formattedLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
