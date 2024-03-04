import { InputAdornment } from "@mui/material";
import { PrimaryTextField } from '../../mui/PrimaryTextField';

const PrimaryInput = ({ formik, onChange, icon, name, ph, label, type, vr, dt, ac }) => {
  return (
    <>
      {
        icon ?
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
            label={label}
            placeholder={ph}
            autoComplete={ac}
            value={formik.values[name]}
            onChange={onChange ? (e) => { formik.handleChange(e); formik.handleSubmit() } : formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
          /> :
          <PrimaryTextField
            fullWidth
            type={type || "text"}
            variant={vr || "outlined"}
            id={name}
            name={name}
            label={label}
            placeholder={ph}
            value={formik.values[name]}
            onChange={onChange ? (e) => { formik.handleChange(e); formik.handleSubmit() } : formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete={ac}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            data-test={dt || name}
            helperText={formik.touched[name] && formik.errors[name]}
          />
      }
    </>
  )
}

export default PrimaryInput