import { ButtonHTMLAttributes, FC } from 'react'
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  icon?: boolean;
}
  
const CustomButton: FC<CustomButtonProps> = ({value='Add new Section', icon=true, ...props}) => {
  return (
    <Button className='px-2 py-1' size='sm' {...props}>{value} {icon && <Plus className='fs-5'/>}</Button>
  )
}

export default CustomButton