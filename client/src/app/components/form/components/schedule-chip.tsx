import { useEffect, useMemo, useState } from 'react';
import { Chip } from '@mui/material';
import { formatDateToTimeStr } from '../../../utils/date-utils';
import { JsonSchedule } from '@shared-utils';
import { isPast } from 'date-fns';

interface ScheduleChipProps {
  schedule: JsonSchedule;
  isSelected: boolean;
  onSelect: () => void;
}

const ScheduleChip = ({
  schedule,
  onSelect,
  isSelected,
}: ScheduleChipProps) => {
  const [isDateTimePast, setIsDateTimePast] = useState(
    isPast(schedule.dateTime)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsDateTimePast(isPast(schedule.dateTime));
    }, 1000 * 20); // 20 seconds

    return () => clearInterval(intervalId);
  }, [schedule.dateTime]);

  const formattedTime = useMemo(
    () => formatDateToTimeStr(schedule.dateTime),
    [schedule.dateTime]
  );

  return (
    <Chip
      label={formattedTime}
      disabled={isDateTimePast || schedule.booked}
      onClick={onSelect}
      color={isSelected ? 'primary' : 'default'}
      variant="filled"
    />
  );
};

export default ScheduleChip;
