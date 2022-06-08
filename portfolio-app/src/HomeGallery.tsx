
import HomeGridItem from './HomeGridItem';
import styled from '@emotion/styled'
import LoadingOverlay from './LoadingOverlay';
import useWaitAllImages from "./Hooks/useWaitAllImages";
import useImageGallery from "./Hooks/useImageGallery";

const breakpoints = [480, 768, 1280];

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
)

const Grid = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    position: relative;
    filter: none;
    margin-bottom: 3em;
    min-height: 100vh;
    margin-right: auto;
    margin-left: auto;
    ${mq[2]} {
        width:75%;
    }
    ${mq[1]} {
        width: 100%;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1rem 0 1rem;
    width: calc(100% / 3);
    ${mq[2]} {
        margin: 0 0.75rem 0 0.75rem;
    }
    ${mq[1]} {
        margin: 0 0.5rem 0 0.5rem;
    }
    ${mq[0]} {
        margin: 0 0.25rem 0 0.25rem;
    }
`;

const HomeGallery = () => {
    const imageCount = 9;
    const { isLoading, onLoadNotification } = useWaitAllImages(imageCount);

    useImageGallery();

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
            <Grid className="homegallery">
                <Column>
                    <HomeGridItem imageId="1" onLoad={onLoadNotification} />
                    <HomeGridItem imageId="2" onLoad={onLoadNotification} />
                    <HomeGridItem imageId="3" onLoad={onLoadNotification} />
                </Column>
                <Column>
                    <HomeGridItem imageId="4" onLoad={onLoadNotification} />
                    <HomeGridItem imageId="5" onLoad={onLoadNotification} vertical />
                    <HomeGridItem imageId="6" onLoad={onLoadNotification} />
                </Column>
                <Column>
                    <HomeGridItem imageId="7" onLoad={onLoadNotification} />
                    <HomeGridItem imageId="8" onLoad={onLoadNotification} />
                    <HomeGridItem imageId="9" onLoad={onLoadNotification} />
                </Column>
            </Grid>
        </div>

    )
}

export default HomeGallery;