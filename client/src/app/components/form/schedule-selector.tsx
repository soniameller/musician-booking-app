import { FormikProps } from 'formik';
import { Stack, FormHelperText, InputLabel } from '@mui/material';
import ScheduleChip from './components/schedule-chip';
import { JsonSchedule } from '@shared-utils';
import { BookingDetails, BookingDetailsType } from '../../types/types';
import { isPast } from 'date-fns';

interface ScheduleSelectorProps {
  schedules: JsonSchedule[];
  formik: FormikProps<BookingDetails>;
}

const ScheduleSelector = ({ schedules, formik }: ScheduleSelectorProps) => {
  const hasAvailableSchedules = !schedules.every(
    (schedule) => schedule.booked || isPast(schedule.dateTime)
  );
  const musicianName = schedules[0]?.musician?.name;

  return (
    <>
      <InputLabel variant="standard">When?</InputLabel>
      <Stack direction="row" spacing={2}>
        {schedules.map((schedule: JsonSchedule) => (
          <ScheduleChip
            key={schedule.id}
            schedule={schedule}
            isSelected={
              formik.values[BookingDetailsType.SCHEDULE_ID] === schedule.id
            }
            onSelect={() =>
              formik.setFieldValue(BookingDetailsType.SCHEDULE_ID, schedule.id)
            }
          />
        ))}
      </Stack>
      {!hasAvailableSchedules && musicianName && (
        <FormHelperText error={true}>
          All slots with {musicianName} for today are booked
        </FormHelperText>
      )}
      {formik.touched[BookingDetailsType.SCHEDULE_ID] &&
        formik.errors[BookingDetailsType.SCHEDULE_ID] && (
          <FormHelperText error={true}>
            {formik.errors[BookingDetailsType.SCHEDULE_ID]}
          </FormHelperText>
        )}
    </>
  );
};

export default ScheduleSelector;
