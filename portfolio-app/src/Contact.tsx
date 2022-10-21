import React, { useState, useCallback } from 'react'
import ContactForm from './Components/Forms/ContactForm'
import LoadingOverlay from './LoadingOverlay'

import { ImageHeader, TextHeader, TextSubHeader } from './Components/Forms/Shared/ImageHeader'
import useWaitImageLoad from './Hooks/useWaitImageLoad'

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false)
  const headerUrl = 'images/contact-header.jpg'
  const headerImageIsLoading = useWaitImageLoad(headerUrl)

  const isLoadingCallback = useCallback((isLoadingParam: boolean) => { setIsLoading(isLoadingParam) }, [])

  return (
        <React.Fragment>
            <LoadingOverlay isLoading={headerImageIsLoading} />

            <LoadingOverlay isLoading={isLoading} margin="500px" hideIndicator />

            <ImageHeader imageIsLoading={headerImageIsLoading} headerUrl={headerUrl}>
                <TextHeader>Contact</TextHeader>
                <TextSubHeader>Questions et commentaires</TextSubHeader>
            </ImageHeader>
            <ContactForm isLoadingCallback={isLoadingCallback} />
        </React.Fragment>
  )
}

export default Contact
