import HomeGridItem from './HomeGridItem'
import useImageGallery from '../../../Hooks/useImageGallery'
import type { Album } from '../../../../types/SiteMetadata'
import '../Gallery.css'

const sizes = '(max-width:768px) 30vw, (max-width:1280px) 25vw, 15vw'

const HomeGallery = (props: {Album: Album}) => {
  const { Album } = props;
  
  useImageGallery()

  return (
    <div>
        <div className='home-gallery-grid'>
          <div className='home-gallery-grid-column'>
            <HomeGridItem image={Album.photos[0]} sizes={sizes} />
            <HomeGridItem image={Album.photos[1]} sizes={sizes} />
            <HomeGridItem image={Album.photos[2]} sizes={sizes} />
          </div>
          <div className='home-gallery-grid-column'>
            <HomeGridItem image={Album.photos[3]} sizes={sizes} />
            <HomeGridItem image={Album.photos[4]} sizes={sizes} />
            <HomeGridItem image={Album.photos[5]} sizes={sizes} />
          </div>
          <div className='home-gallery-grid-column'>
            <HomeGridItem image={Album.photos[6]} sizes={sizes} />
            <HomeGridItem image={Album.photos[7]} sizes={sizes} />
            <HomeGridItem image={Album.photos[8]} sizes={sizes} />
          </div>
        </div>
    </div>
  )
}

export default HomeGallery
