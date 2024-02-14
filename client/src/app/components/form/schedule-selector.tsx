import { FormikProps } from 'formik';
import { Stack, FormHelperText, InputLabel } from '@mui/material';
import ScheduleChip from './components/schedule-chip';
import { BookingDetails } from '../../services/api-service';
import { JsonSchedule } from '@shared-utils';
import { BookingDetailsType } from './booking-form';

interface ScheduleSelectorProps {
  schedules: JsonSchedule[];
  formik: FormikProps<BookingDetails>;
}

const ScheduleSelector = ({ schedules, formik }: ScheduleSelectorProps) => {
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
