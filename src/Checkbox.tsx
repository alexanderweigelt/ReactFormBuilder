import React, { forwardRef, type InputHTMLAttributes } from 'react'
import classNames from 'classnames'

export type CheckboxProps = {
  id: string
  label?: string | null
  inline?: boolean
  message?: string | false
  error?: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

type Ref = HTMLInputElement

const Checkbox = forwardRef<Ref, CheckboxProps>((props, ref) => {
  const {
    id,
    label = null,
    inline = false,
    message = false,
    error = false,
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

  const input = (
    <input
      ref={ref}
      type="checkbox"
      id={id}
      disabled={disabled}
      className={classNames(
        'border-black rounded focus:border-blue-500 mr-2',
        { 'inline-block': inline, 'bg-gray-100': disabled },
        styles[size],
        className
      )}
      {...restProps}
    />
  )

  return (
    <>
      {(label != null)
        ? (
          <label
            htmlFor={id}
            className={classNames(
              'mb-2 text-sm font-medium text-gray-800 items-center',
              inline ? 'inline-flex mr-2' : 'flex'
            )}
          >
            {input} {label}
          </label>
          )
        : (
            <>{ input }</>
          )}
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

Checkbox.displayName = 'Checkbox'

export default Checkbox
