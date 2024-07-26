import HomeGridItem from './HomeGridItem'
import useWaitAllImages from '../../../Hooks/useWaitAllImages'
import useImageGallery from '../../../Hooks/useImageGallery'
import type { Album } from 'src/react-app/Contexts/SiteMetadata'
import '../Gallery.css'

const sizes = '(max-width:768px) 30vw, (max-width:1280px) 25vw, 15vw'

const HomeGallery = (props: {Album: Album}) => {
  const { Album } = props;
  const imageCount = 9
  const { isLoading, onLoadNotification } = useWaitAllImages(imageCount)
  
  useImageGallery()

  return (
    <div>
        <div className='home-gallery-grid'>
          <div className='home-gallery-grid-column'>
            <HomeGridItem image={Album.photos[0]} onLoad={onLoadNotification} sizes={sizes} />
            <HomeGridItem image={Album.photos[1]} onLoad={onLoadNotification} sizes={sizes} />
            <HomeGridItem image={Album.photos[2]} onLoad={onLoadNotification} sizes={sizes} />
          </div>
          <div className='home-gallery-grid-column'>
            <HomeGridItem image={Album.photos[3]} onLoad={onLoadNotification} sizes={sizes} />
            <HomeGridItem image={Album.photos[4]} onLoad={onLoadNotification} sizes={sizes} />
            <HomeGridItem image={Album.photos[5]} onLoad={onLoadNotification} sizes={sizes} />
          </div>
          <div className='home-gallery-grid-column'>
            <HomeGridItem image={Album.photos[6]} onLoad={onLoadNotification} sizes={sizes} />
            <HomeGridItem image={Album.photos[7]} onLoad={onLoadNotification} sizes={sizes} />
            <HomeGridItem image={Album.photos[8]} onLoad={onLoadNotification} sizes={sizes} />
          </div>
        </div>
    </div>
  )
}

export default HomeGallery
