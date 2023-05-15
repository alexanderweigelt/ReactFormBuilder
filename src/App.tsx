import React, { type FC, useState } from 'react'
import logo from './logo.svg'
import FormBuilder, { type FormField } from './FormBuilder'
import * as yup from 'yup'

const App: FC = () => {
  const [result, setResult] = useState<Record<string, unknown>>({})

  const fields: FormField[] = [
    {
      component: 'input',
      id: 'first-name',
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      col: 6,
      fullWidth: true,
      validation: yup.string().required('First name is required')
    },
    {
      component: 'input',
      id: 'last-name',
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      col: 6,
      fullWidth: true,
      validation: yup.string().required('Last name is required')
    },
    {
      component: 'input',
      id: 'street-name',
      name: 'streetName',
      label: 'Street Name',
      type: 'text',
      col: 10,
      fullWidth: true,
      validation: yup.string().required('Street name is required')
    },
    {
      component: 'input',
      id: 'street-number',
      name: 'streetNumber',
      label: 'Street Number',
      type: 'text',
      col: 2,
      fullWidth: true,
      validation: yup.number().typeError('Please enter a valid number').required('Street number is required')
    },
    {
      component: 'input',
      id: 'postal-code',
      name: 'postalCode',
      label: 'Postal Code',
      type: 'text',
      col: 4,
      fullWidth: true,
      validation: yup.string().required('Postal code is required')
    },
    {
      component: 'input',
      id: 'city',
      name: 'city',
      label: 'City',
      type: 'text',
      col: 8,
      fullWidth: true,
      validation: yup.string().required('City is required')
    },
    {
      component: 'input',
      id: 'country',
      name: 'country',
      label: 'Country',
      type: 'text',
      col: 12,
      fullWidth: true,
      validation: yup.string().required('Country is required')
    },
    {
      component: 'checkbox',
      id: 'accept-terms',
      name: 'acceptTerms',
      label: 'Accept terms and conditions',
      col: 12,
      validation: yup.bool().oneOf([true], 'Please accept the terms and conditions')
    },
    {
      component: 'submit',
      name: 'submit',
      value: 'Submit',
      variant: 'primary',
      col: 4,
      fullWidth: true
    }
  ]

  const handleSubmit = async (values: any): Promise<void> => {
    console.log(values)
    setResult(values)
    // handle submit logic here
  }

  return (
    <div className={'flex h-screen flex-col justify-between lg:container lg:mx-auto px-3 lg:px-0'}>
      <header className={'flex pb-3 lg:mb-3 lg:border-b w-full items-center justify-between'}>
        <img src={logo} className={'max-w-[120px]'} alt="logo"/>
        <h1 className={'text-5xl font-bold text-gray-500'}>
          React JSON Form Builder
        </h1>
      </header>
      <main>
        <div className="flex p-4 text-sm text-gray-800 rounded-lg bg-gray-50 mb-10"
             role="alert">
          <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"></path>
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Note!</span> This form does not send any data. It is only a functional example
            of the implementation of the code.
          </div>
        </div>
        <FormBuilder fields={fields} submitForm={handleSubmit}/>
        {Object.entries(result).map(([key, value]) => (<p key={key}><strong>{key}</strong>: <>{value}</></p>))}
      </main>
      <footer className={'text-center py-4'}>
        <p className={'text-sm'}>&copy; 2023 by Alexander Weigelt</p>
      </footer>
    </div>
  )
}

export default App
