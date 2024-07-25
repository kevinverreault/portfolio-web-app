import { useEffect, useState, useRef } from 'react'
import { GalleryListItem } from './GalleryListItem'
import useWaitAllImages from '../../Hooks/useWaitAllImages'
import useImageGallery from '../../Hooks/useImageGallery'
import ResponsiveImageService from 'src/react-app/Services/ResponsiveImageService'
import type { Album } from 'src/types/SiteMetadata'
import './Gallery.css'

const PhotoGallery = (props: {Album: Album}) => {
  const { Album } = props;
  const galleryLowerCase = props.Album.title.toLowerCase()
  const pageSize = 12
  const gallerySize = Album.count
  const totalPages = Math.ceil(gallerySize / pageSize)

  const [pageNumber, setPageNumber] = useState(1)
  const [imageKeys, setImageKeys] = useState<number[]>([])
  const { isLoading, onLoadNotification } = useWaitAllImages(pageSize)

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
      for (let i = ((pageNumber - 1) * pageSize) + 1; (i <= pageNumber * pageSize) && (i <= gallerySize); ++i) {
        imagesToLoad.push(i)
      }

      setImageKeys(previousList => [...previousList, ...imagesToLoad])
    }

    if (pageNumber <= totalPages) {
      addPage()
    }
  }, [pageNumber, gallerySize])

  useImageGallery()

  return (
    <div className='photo-gallery'>
      <div className='gallery-inner-container'>
        <ul className='gallery-list'>
          {
            imageKeys.map((listNumber) => {
                const imageProps = Album.photos[listNumber - 1];
                return <GalleryListItem
                  ref={listNumber === Math.round(imageKeys.length - (pageSize * 0.33)) ? lastElement : undefined}
                  key={`${galleryLowerCase}-${listNumber.toString()}`}
                  imageProperties={ResponsiveImageService.createImageSourceSet(imageProps.id)}
                  description={imageProps.metadata.description}
                  alt={`${galleryLowerCase} - ${imageProps.metadata.description}`}
                  onLoad={onLoadNotification}/>
              }
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default PhotoGallery
