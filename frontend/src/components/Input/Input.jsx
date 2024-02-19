import { InputAdornment } from "@mui/material"
import { PrimaryTextField } from '../../mui/PrimaryTextField'

const Input = ({ formik, icon, name, ph, type, vr }) => {
  return (
    <PrimaryTextField
      fullWidth
      type={type || "text"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      }}
      variant={vr || "outlined"}
      id={name}
      name={name}
      placeholder={ph}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  )
}

export default Input