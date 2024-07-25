import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useField } from 'formik'

const InputCss = css`
  border: 0px;    
  padding: 15px;
  margin-bottom: 5px;
  box-sizing: border-box;
  font: inherit;
  font-size: small;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 5%) 0px 4px 6px -1px, rgb(0 0 0 / 3%) 0px 2px 4px -1px;

  :hover {
      outline: 1px solid hsl(var(--color-primary));
  }

  :focus {
      outline: 2px solid hsl(var(--color-primary-variant));
  }
`

const InputElement = styled.input`
  ${InputCss}
`

const TextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <InputElement {...field} {...props} />
      {meta.touched && meta.error
        ? (
          <div className="error">{meta.error}</div>
          )
        : null}
    </>
  )
}

const TextareaElement = styled.textarea`
    ${InputCss}
    resize: none;
  `

const Textarea = ({ label, ...props }: any) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <TextareaElement {...field} {...props} />
      {meta.touched && meta.error
        ? (
          <div className="error">{meta.error}</div>
          )
        : null}
    </>
  )
}

const FormWrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  margin-top: 2rem;

  border-radius: 0.5rem;
  padding: 20px;
  
  background-color: hsl(var(--color-surface) / 0.6);
  box-sizing: border-box;
  width: 30%;
  min-width: 650px;

  @media (max-width: 768px) { 
      min-width: 90%;
  }
`

const FormSection = styled.div<{ width?: string | null }>`
  width: ${props => props.width ?? '50%'};
  margin:20px;
  @media (max-width: 768px) { 
      margin: 0;
  }
  display: flex;
  flex-direction: column;
`

const FormRow = styled.div<{ lastrow?: boolean | null, height?: string | null }>`
  width:100%;
  display: flex;
  height: ${props => props.height ?? '100px'};
  margin-bottom: ${props => props.lastrow ? '5px' : null}
`

export { TextInput, Textarea, FormWrapper, FormSection, FormRow }
