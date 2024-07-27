import './TextButton.css'

interface ButtonProps {
  label: string
  type?: 'button' | 'reset' | 'submit' | null
  width?: string | null
}

const TextButton = (props: ButtonProps) => {
  return <button type={props.type ?? 'button'} className='text-button'>{props.label}</button>
}

export default TextButton
