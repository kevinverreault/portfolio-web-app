import { useEffect, useState, useRef } from 'react'
import { GalleryListItem } from './GalleryListItem'
import styled from '@emotion/styled'
import LoadingOverlay from '../Shared/LoadingOverlay'
import useWaitAllImages from '../../Hooks/useWaitAllImages'
import useImageGallery from '../../Hooks/useImageGallery'
import { ImageHeader, TextHeader, TextSubHeader } from '../Shared/ImageHeader'
import useWaitImageLoad from '../../Hooks/useWaitImageLoad'

const Container = styled.div`
    width: 1920px;
    padding: 0;
    display: block;
    box-sizing: border-box;
    font-size: 0px;
    letter-spacing: 0px;
    word-spacing: 0px;
    transition: opacity 1s ease, filter 1s ease;
    min-height: 100vh;
    margin-right: auto;
    margin-left: auto;
    margin-top: 2rem;

    @media (max-width:1920px) {
        width: 1366px;
    }
    @media (max-width:1366px) {
        width: 100%;
    }
    `

const GalleryList = styled.ul`
    padding: 0;
    `

const Gallery = styled.div`
    min-height: 100vh;
`

interface PhotoGalleryProps {
  GalleryName: string
  GallerySize: number
}

const PhotoGallery = (props: PhotoGalleryProps) => {
  const pageSize = 15
  const totalPages = Math.ceil(props.GallerySize / pageSize)

  const [pageNumber, setPageNumber] = useState(1)
  const [imageKeys, setImageKeys] = useState<number[]>([])
  const { isLoading, onLoadNotification } = useWaitAllImages(pageSize)

  const headerUrl = `${props.GalleryName.toLowerCase()}-header.jpg`
  const headerImageIsLoading = useWaitImageLoad(headerUrl)

  const lastElement = useRef<HTMLLIElement>(null)
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    const options = {
      root: document,
      rootMargin: '20px',
      threshold: 1
    }

    const callback = (entries: IntersectionObserverEntry[]): void => {
      const first = entries[0]
      if (first.isIntersecting) {
        setPageNumber((pageNumber) => pageNumber + 1)
      }
    }

    observer.current = new IntersectionObserver(callback, options)

    if (lastElement.current) {
      observer.current.observe(lastElement.current)
    }
    return () => {
      observer?.current?.disconnect()
    }
  })

  useEffect(() => {
    const addPage = () => {
      const imagesToLoad: number[] = []
      for (let i = ((pageNumber - 1) * pageSize) + 1; (i <= pageNumber * pageSize) && (i <= props.GallerySize); ++i) {
        imagesToLoad.push(i)
      }

      setImageKeys(previousList => [...previousList, ...imagesToLoad])
    }

    if (pageNumber <= totalPages) {
      addPage()
    }
  }, [pageNumber, props.GallerySize])

  useImageGallery()

  return (
    <Gallery>
        <LoadingOverlay isLoading={isLoading || headerImageIsLoading} />
        <ImageHeader
          imageIsLoading={headerImageIsLoading}
          headerUrl={headerUrl}
          opacity="0.85">
            <TextHeader>{props.GalleryName}</TextHeader>
            <TextSubHeader></TextSubHeader>
        </ImageHeader>
        <Container>
          <GalleryList>
            {
              imageKeys.map((listNumber) =>
                <GalleryListItem
                  ref={listNumber === Math.round(imageKeys.length - (pageSize * 0.33)) ? lastElement : undefined}
                  key={`${props.GalleryName}-${listNumber.toString()}`}
                  imageId={listNumber.toString()}
                  galleryName={props.GalleryName}
                  onLoad={onLoadNotification}/>
              )
            }
          </GalleryList>
        </Container>
    </Gallery>
  )
}

export default PhotoGallery
