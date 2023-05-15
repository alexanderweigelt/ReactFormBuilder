import React, { forwardRef, type InputHTMLAttributes } from 'react'
import classNames from 'classnames'

export type InputTextProps = {
  type: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url'
  id: string
  label?: string | null
  message?: string | false
  error?: boolean
  fullWidth?: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
} & InputHTMLAttributes<HTMLInputElement>

type Ref = HTMLInputElement

const InputText = forwardRef<Ref, InputTextProps>((props, ref) => {
  const {
    type,
    id,
    label = null,
    message = false,
    error = false,
    fullWidth = false,
    disabled = false,
    size = 'medium',
    className,
    ...restProps
  } = props
  const styles = {
    small: 'p-2 sm:text-xs',
    medium: 'p-2.5 text-sm',
    large: 'p-4 sm:text-md'
  }

  return (
    <>
      {(label != null) && (
        <label
          htmlFor={id}
          className={'mb-2 block text-sm font-medium text-gray-800'}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        disabled={disabled}
        className={classNames(
          'border-black rounded focus:border-blue-500',
          { 'w-full': fullWidth, 'bg-gray-100': disabled },
          styles[size],
          className
        )}
        {...restProps}
      />
      {Boolean(message) && (
        <span
          className={classNames('mb-2 block text-sm font-medium', {
            'text-red-700': error
          })}
        >
          {message}
        </span>
      )}
    </>
  )
})

InputText.displayName = 'InputText'

export default InputText
