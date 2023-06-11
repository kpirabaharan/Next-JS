import Link from 'next/link';

import classes from './EventItem.module.css';

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
    <li className={classes.item}>
      <img src={'/' + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={formattedLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
