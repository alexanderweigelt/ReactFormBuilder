import React, { forwardRef, type InputHTMLAttributes } from 'react'
import classNames from 'classnames'

export type InputSubmitProps = {
  fullWidth?: boolean
  disabled?: boolean
  error?: boolean
  variant?: 'primary' | 'secondary' | 'basic'
  size?: 'small' | 'medium' | 'large'
} & InputHTMLAttributes<HTMLInputElement>

type Ref = HTMLInputElement

const InputSubmit = forwardRef<Ref, InputSubmitProps>((props, ref) => {
  const {
    className,
    error,
    variant = 'basic',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    ...restProps
  } = props
  const buttonType = {
    primary: 'bg-blue-700 hover:bg-blue-500 text-white rounded',
    secondary: 'bg-gray-200 hover:bg-gray-300 rounded',
    basic: 'bg-white hover:text-gray-700 focus:text-gray-700'
  }
  const buttonSize = {
    small: 'py-1 px-2 text-xs',
    medium: 'py-2 px-4',
    large: 'py-3 px-6 text-lg'
  }

  return (
    <input
      ref={ref}
      type={'submit'}
      className={classNames(
        buttonSize[size],
        buttonType[variant],
        { 'w-full cursor-pointer': fullWidth, 'cursor-not-allowed': disabled }
      )}
      {...restProps}
    />
  )
})

InputSubmit.displayName = 'InputSubmit'

export default InputSubmit
