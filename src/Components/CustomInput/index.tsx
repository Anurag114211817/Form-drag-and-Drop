import { ChangeEvent, FC, InputHTMLAttributes } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: FC<CustomInputProps> = ({name, value, onChange}) => {
  return (
    <FloatingLabel controlId="floatingInput" label={`${name}`} className="mb-3" >
      <Form.Control type="text" placeholder="Input" size='sm' {...{name, value, onChange}} autoComplete='off'/>
    </FloatingLabel>
  )
}

export default CustomInput;