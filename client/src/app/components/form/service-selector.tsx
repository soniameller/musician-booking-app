import { FormikProps } from 'formik';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { JsonService } from '@shared-utils';
import { BookingDetails, BookingDetailsType } from '../../types/types';

interface ServiceSelectorProps {
  services: JsonService[];
  formik: FormikProps<BookingDetails>;
}

const ServiceSelector = ({ formik, services }: ServiceSelectorProps) => (
  <>
    <InputLabel variant="standard">Which Instrument?</InputLabel>
    <FormControl fullWidth>
      <InputLabel id="service-select-label">Select Instrument</InputLabel>
      <Select
        labelId="service-select-label"
        id={BookingDetailsType.SERVICE_ID}
        name={BookingDetailsType.SERVICE_ID}
        IconComponent={ExpandMoreIcon}
        onChange={formik.handleChange}
        value={formik.values[BookingDetailsType.SERVICE_ID]}
        label="Select Instrument"
      >
        {services.map((service) => (
          <MenuItem key={service.id} value={service.id}>
            {service.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    {formik.touched[BookingDetailsType.SERVICE_ID] &&
      formik.errors[BookingDetailsType.SERVICE_ID] && (
        <FormHelperText error={true}>
          {formik.errors[BookingDetailsType.SERVICE_ID]}
        </FormHelperText>
      )}
  </>
);

export default ServiceSelector;
