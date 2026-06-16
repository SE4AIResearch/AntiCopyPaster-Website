import class_only from "./../../../../assets/model/class_only.jpg"
import classes_all from "./../../../../assets/model/classes_all.jpg"
import packageModel from "./../../../../assets/model/package.png"

import ZoomableImage from '../../../ZoomableImage';

const ModelDocs = () => {
    return <div>
        <h1 className="docs-header">Model</h1>

        <h3 className="text-xl">Zoom in to view images:</h3>

        <ZoomableImage image={class_only} styles={"w-full h-full"}/>
        <ZoomableImage image={classes_all}/>
        <ZoomableImage image={packageModel}/>
    </div>
}

export default ModelDocs;
