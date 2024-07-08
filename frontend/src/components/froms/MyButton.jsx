import Button from '@mui/material/Button';

export default function MyButton(props) {
    const {label,type} = props
  return (
      <Button variant="contained" type={type} className={'myButton'}>{label} </Button>
  );
}