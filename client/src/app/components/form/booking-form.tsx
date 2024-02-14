import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Stack, Button } from '@mui/material';
import { JsonSchedule, JsonService } from '@shared-utils';
import { BookingDetails } from '../../services/api-service';
import ServiceSelector from './service-selector';
import NameInput from './name-input';
import ScheduleSelector from './schedule-selector';

interface BookingFormProps {
  schedules: JsonSchedule[];
  onSubmit: (
    values: BookingDetails,
    formikHelpers: FormikHelpers<BookingDetails>
  ) => void | Promise<void>;
}

export enum BookingDetailsType {
  NAME = 'name',
  SCHEDULE_ID = 'scheduleId',
  SERVICE_ID = 'serviceId',
}

const validationSchema = Yup.object({
  [BookingDetailsType.NAME]: Yup.string().required('Name is required'),
  [BookingDetailsType.SCHEDULE_ID]: Yup.string().required(
    'A time must be selected'
  ),
  [BookingDetailsType.SERVICE_ID]: Yup.string().required(
    'A service must be selected'
  ),
});

const initialValues: BookingDetails = {
  [BookingDetailsType.NAME]: '',
  [BookingDetailsType.SCHEDULE_ID]: '',
  [BookingDetailsType.SERVICE_ID]: '',
};

const BookingForm = ({ schedules, onSubmit }: BookingFormProps) => {
  const formik = useFormik<BookingDetails>({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const musicianServices: JsonService[] =
    schedules[0]?.musician?.services || [];

  return (
    <form onSubmit={formik.handleSubmit} style={{ height: '100%' }}>
      <Stack spacing={2} p={3} height={'100%'}>
        <NameInput formik={formik} />

        <ScheduleSelector schedules={schedules} formik={formik} />

        <ServiceSelector formik={formik} services={musicianServices} />

        <div style={{ marginTop: 'auto', width: '100%', paddingTop: 20 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Book Session
          </Button>
        </div>
      </Stack>
    </form>
  );
};

export default BookingForm;
