import { FormikProps } from 'formik';
import { TextField, FormHelperText, InputLabel } from '@mui/material';
import { BookingDetails } from '../../services/api-service';
import { BookingDetailsType } from './booking-form';

interface NameInputProps {
  formik: FormikProps<BookingDetails>;
}

const NameInput = ({ formik }: NameInputProps) => (
  <>
    <InputLabel htmlFor={BookingDetailsType.NAME} variant="standard">
      Whats your name?
    </InputLabel>
    <TextField
      fullWidth
      id={BookingDetailsType.NAME}
      name={BookingDetailsType.NAME}
      label="What's your name?"
      variant="outlined"
      onChange={formik.handleChange}
      value={formik.values.name}
    />
    {formik.touched[BookingDetailsType.NAME] &&
      formik.errors[BookingDetailsType.NAME] && (
        <FormHelperText error={true}>
          {formik.errors[BookingDetailsType.NAME]}
        </FormHelperText>
      )}
  </>
);

export default NameInput;
