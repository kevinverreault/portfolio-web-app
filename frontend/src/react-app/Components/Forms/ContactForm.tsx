import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextButton from '../Shared/TextButton'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
import React, { useRef, useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Textarea, TextInput } from './FormFields'

interface EmailPayload {
  replyTo: string;
  from: string;
  message: string;
}

const sendHttpRequest = (payload: EmailPayload) => {
  return fetch(import.meta.env.PUBLIC_EMAIL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
};

const ContactForm = () => {
  const { width } = useWindowDimensions()
  const [onSubmitEvent, setOnSubmitEvent] = useState<{
    nom: string
    email: string
    comment: string
    setSubmitting: any
    resetForm: any
  }>({
    nom: '', email: '', comment: '', setSubmitting: null, resetForm: null
  })

  const mountedRef = useRef(true)

  useEffect(() => {
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    if (onSubmitEvent.setSubmitting === null) return

    const sendEmailPromise = sendHttpRequest({
      replyTo: onSubmitEvent.email,
      from: onSubmitEvent.nom,
      message: onSubmitEvent.comment
    })

    toast.promise(sendEmailPromise, {
      success: 'envoi réussi',
      loading: 'envoi en cours',
      error: () => "erreur dans l'envoi du message"
    }, {
      style: {
        color: 'hsl(var(--color-on-surface))',
        backgroundColor: 'hsl(var(--color-surface))',
        minWidth: '300px',
      }
    })

    sendEmailPromise.then(() => {
      if (mountedRef.current) {
        onSubmitEvent.resetForm({
          values: {
            nom: '',
            email: '',
            comment: ''
          }
        })
      }
    }).finally(() => {
      if (mountedRef.current) {
        onSubmitEvent.setSubmitting(false)
        setOnSubmitEvent({ ...onSubmitEvent, setSubmitting: null, resetForm: null })
      }
    })
  }, [onSubmitEvent])

  return (
    <div style={{ minHeight: '100vh' }}>
        <div className='form-wrapper'>
            <Formik initialValues={{ nom: '', email: '', comment: '' }}
                validationSchema={Yup.object({
                  nom: Yup.string().required('champ requis'),
                  email: Yup.string().email('courriel invalide').required('champ requis'),
                  comment: Yup.string().required('champ requis')
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setOnSubmitEvent({
                    nom: values.nom,
                    email: values.email,
                    comment: values.comment,
                    setSubmitting,
                    resetForm
                  })
                }}>
                <Form>
                    {
                      !width || width > 768
                        ? (
                          <div className='form-row'>
                              <div className='form-section'>
                                  <TextInput name="nom" type="text" placeholder="nom" />
                              </div>
                              <div className='form-section'>
                                  <TextInput name="email" type="email" placeholder="courriel" />
                              </div>
                          </div>
                          )
                        : (
                          <React.Fragment>
                              <div className='form-row'>
                                  <div className='form-section mobile'>
                                      <TextInput name="nom" type="text" placeholder="nom" />
                                  </div>
                              </div>
                              <div className='form-row'>
                                  <div className='form-section mobile'>
                                      <TextInput name="email" type="email" placeholder="courriel" />
                                  </div>
                              </div>
                          </React.Fragment>
                          )
                    }

                    <div className='form-row last'>
                      <div className='form-section mobile'>
                            <Textarea name="comment" placeholder="message" rows={4} />
                        </div>
                    </div>

                    <div style={{ margin: '0 20px 15px 20px' }}>
                        <TextButton type="submit" label="envoyer" width="100%" />
                    </div>
                    <Toaster containerStyle={{
                      position: 'absolute',
                      top: '50%'
                    }}/>
                </Form>
            </Formik>
        </div>
    </div>
  )
}

export default ContactForm
