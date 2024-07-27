import { useField } from 'formik'
import './Form.css'

const TextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props)

  return (
    <>
      <input className='form-input' {...field} {...props} />
      {meta.touched && meta.error
        ? (
          <div className="error">{meta.error}</div>
          )
        : null}
    </>
  )
}

const Textarea = ({ label, ...props }: any) => {
  const [field, meta] = useField(props)

  return (
    <>
      <textarea className='form-input form-text-area' {...field} {...props} name={props.name} />
      {meta.touched && meta.error
        ? (
          <div className="error">{meta.error}</div>
          )
        : null}
    </>
  )
}

export { TextInput, Textarea }
