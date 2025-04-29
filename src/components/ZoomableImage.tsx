import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ZoomableImageProps {
    image: string,
    styles?: string
}

function ZoomableImage({image, styles}: ZoomableImageProps) {
  return (
    <div className={styles ? "".concat(styles) : "w-full h-full"}>
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={5}
        wheel={{ smoothStep: .01 }}
      >
            <TransformComponent>
              <img
                src={image}
                alt="Zoomable Content"
              />
            </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

export default ZoomableImage;
