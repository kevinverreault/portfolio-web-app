import styled from '@emotion/styled'

const Button = styled.button<{ width?: string | null }>`
  background-color: hsl(var(--color-primary));
  color: hsl(var(--color-on-primary));
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
              rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, 
              rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-width: 0px;
  border-radius: .5rem;
  box-sizing: border-box;
  cursor: pointer;
  width: ${props => props.width ?? '7rem'};
  padding-top: .5rem;
  padding-bottom: .5rem;
  font-weight: 500;
  transition: all .2s ease;
  font-size: 18px;
  font-family: inherit;
  line-height: 24px;
  :hover {
      background-color:hsl(var(--color-primary-variant));
  }
  :active {
      transform: scale(0.97);
      box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                  rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                  rgba(0, 0, 0, 0.1) 0px 2px 3px -0.5px, 
                  rgba(0, 0, 0, 0.06) 0px 1px 2px -0.5px;
  }
}
`

interface ButtonProps {
  label: string
  type?: 'button' | 'reset' | 'submit' | null
  width?: string | null
}

const TextButton = (props: ButtonProps) => {
  return <Button type={props.type ?? 'button'} width={props.width}>{props.label}</Button>
}

export default TextButton
