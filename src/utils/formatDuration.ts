import { intervalToDuration } from 'date-fns';

interface Duration {
  start: Date;
  end: Date;
}

export const formatDuration = ({ start, end }: Duration) => {
  const interval = intervalToDuration({ start, end });

  const hours = (interval.days || 0) * 24 + (interval.hours || 0);
  const minutes = interval.minutes || 0;

  return `${hours} h ${minutes > 0 ? minutes + ' min.' : ''}`;
};
