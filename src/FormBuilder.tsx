import React, { createElement, type FC, type FormHTMLAttributes, type ReactNode } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import { type BooleanSchema, type NumberSchema, type StringSchema } from 'yup'
import InputSubmit, { type InputSubmitProps } from './InputSubmit'
import InputText, { type InputTextProps } from './InputText'
import Select, { type SelectProps } from './Select'
import Checkbox, { type CheckboxProps } from './Checkbox'

type NumericRange<
  START extends number,
  END extends number,
  ARR extends unknown[] = [],
  ACC extends number = never
> = ARR['length'] extends END
  ? ACC | START | END
  : NumericRange<START, END, [...ARR, 1], ARR[START] extends undefined ? ACC : ACC | ARR['length']>

export type FormField = {
  component: string
  name: string
  validation?: StringSchema | NumberSchema | BooleanSchema
  col: NumericRange<1, 12>
} & (InputTextProps | SelectProps | InputSubmitProps | CheckboxProps)

type Props = {
  fields: FormField[]
  submitForm: (values: any) => Promise<void>
} & FormHTMLAttributes<HTMLFormElement>

const Components: Record<string, any> = {
  input: InputText,
  select: Select,
  checkbox: Checkbox,
  submit: InputSubmit
}

const FormBuilder: FC<Props> = ({ fields, submitForm, className, ...props }) => {
  const columns = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
    12: ''
  }

  const initialValues = fields.reduce(
    (valuesObj, field) => ({ ...valuesObj, [field.name]: '' }),
    {}
  )

  const validationSchema = Yup.object().shape(
    fields.reduce(
      (schemaObj, field) => ({
        ...schemaObj,
        [field.name]: field.validation ?? Yup.string()
      }),
      {}
    )
  )

  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        await submitForm(values)
        resetForm({ values: initialValues })
        setSubmitting(false)
      }
    })

  const renderField = (field: FormField): ReactNode => {
    const { component, validation, col, ...props } = field
    if (typeof Components[component] !== 'undefined') {
      return createElement(
        Components[component],
        {
          key: field.id,
          onChange: handleChange,
          value: values[field.name as (keyof typeof values)],
          disabled: isSubmitting,
          error: touched[field.name as (keyof typeof touched)] && Boolean(errors[field.name as (keyof typeof errors)]),
          message: touched[field.name as (keyof typeof touched)] && errors[field.name as (keyof typeof errors)],
          ...props
        }
      )
    }
    return createElement(
      () => <div>It seems to be a mismatch in your form configuration schema on ID {field.id}.</div>,
      { key: field.id }
    )
  }

  return (
    <form onSubmit={handleSubmit} className={classNames(className, 'mb-4 grid gap-4 md:grid-cols-12')} {...props}>
      {fields.map((field, index) => (
        <div key={index} className={classNames('col-span-12', columns[field.col])}>
          {renderField(field)}
        </div>
      ))}
    </form>
  )
}

export default FormBuilder
