import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextButton from '../Shared/TextButton'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
import React, { useRef, useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import emailjs, { init } from 'emailjs-com'
import { FormRow, FormSection, FormWrapper, Textarea, TextInput } from './FormFields'

const ContactForm = (props: { isLoadingCallback: (isLoading: boolean) => void }) => {
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

  const isLoadingCallback = props.isLoadingCallback

  useEffect(() => {
    if (process.env.REACT_APP_EMAIL_USER_ID) {
      init(process.env.REACT_APP_EMAIL_USER_ID)
    }
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    if (onSubmitEvent.setSubmitting === null) return

    isLoadingCallback(true)
    if (!process.env.REACT_APP_EMAIL_SERVICE_ID || !process.env.REACT_APP_EMAIL_TEMPLATE_ID) {
      return
    }

    const sendEmailPromise = emailjs.send(process.env.REACT_APP_EMAIL_SERVICE_ID, process.env.REACT_APP_EMAIL_TEMPLATE_ID, {
      nom: onSubmitEvent.nom,
      message: onSubmitEvent.comment,
      reply_to: onSubmitEvent.email
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
        isLoadingCallback(false)
        onSubmitEvent.setSubmitting(false)
        setOnSubmitEvent({ ...onSubmitEvent, setSubmitting: null, resetForm: null })
      }
    })

    toast.promise(sendEmailPromise, {
      success: () => 'message envoyé',
      loading: 'envoi en cours',
      error: () => "erreur dans l'envoi du message"
    }, {
      style: {
        backgroundColor: 'rgb(209, 213, 219, 0.7)',
        minWidth: '300px'
      }
    }).catch((reason: Error) => {
      console.log(`erreur dans l'envoi du message: ${reason.message}`)
    })
  }, [onSubmitEvent, isLoadingCallback])

  return (
        <div style={{ minHeight: '100vh' }}>
            <FormWrapper>
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
                                <FormRow>
                                    <FormSection>
                                        <TextInput name="nom" type="text" placeholder="nom" />
                                    </FormSection>
                                    <FormSection>
                                        <TextInput name="email" type="email" placeholder="courriel" />
                                    </FormSection>
                                </FormRow>
                                )
                              : (
                                <React.Fragment>
                                    <FormRow>
                                        <FormSection width="100%">
                                            <TextInput name="nom" type="text" placeholder="nom" />
                                        </FormSection>
                                    </FormRow>
                                    <FormRow>
                                        <FormSection width="100%">
                                            <TextInput name="email" type="email" placeholder="courriel" />
                                        </FormSection>
                                    </FormRow>
                                </React.Fragment>
                                )
                        }

                        <FormRow lastrow={true} height="175px">
                            <FormSection width="100%">
                                <Textarea name="comment" placeholder="message" rows={4} />
                            </FormSection>
                        </FormRow>

                        <div style={{ margin: '0 20px 15px 20px' }}>
                            <TextButton type="submit" label="envoyer" width="100%" />
                        </div>
                        <Toaster containerStyle={{
                          position: 'absolute',
                          top: '90%'
                        }}/>
                    </Form>
                </Formik>
            </FormWrapper>
        </div>
  )
}

export default ContactForm
