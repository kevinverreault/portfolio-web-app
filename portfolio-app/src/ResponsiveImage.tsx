const ResponsiveImage = (props: any) => {

    const imageSet = `${props.imageProperties.image1x}, ${props.imageProperties.image2x}, ${props.imageProperties.image3x}, ${props.imageProperties.image4x}`;

    function handleImageOnLoad() {
        props.onLoad();
    }

    return (
        <img style={props.style} sizes={props.sizes} srcSet={imageSet} src={props.imageProperties.imageMinSize} alt={props.alt} onLoad={handleImageOnLoad.bind(this)} onError={handleImageOnLoad.bind(this)} ></img>
    )
}

export default ResponsiveImage;