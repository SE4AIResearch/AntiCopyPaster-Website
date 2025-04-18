import {  
    matchState, 
    processStatementDecls, 
    updateScope, 
    liveOut, 
    exactMatch, 
    isType1DuplicateAt,
    type1CloneDetection,
    varRefExpAndOfIdent,
    paramCheckResult,
    canBeParam,
    matchStack,
    isType2DuplicateAt,
    type2CloneDetection,
    buildMethodBody,
    buildMethodText,
    generateMethodCall,
    extractionTask} from "../../../../assets/algorithms/index.ts"


interface algoObject {
    title: string
    description: string
    image: string

}


const algos : algoObject[] = [
    {title: "MatchState", description: "", image: matchState},
    {title: "processStatementDecls", description: "", image: processStatementDecls},
    {title: "updateScope", description: "", image: updateScope},
    {title: "liveOut", description: "", image: liveOut},
    {title: "exactMatch", description: "", image: exactMatch},
    {title: "isType1DuplicateAt", description: "", image: isType1DuplicateAt},
    {title: "Type 1 Clone Detection", description: "", image: type1CloneDetection},
    {title: "variableOfRefExp & variableOfIdent", description: "", image: varRefExpAndOfIdent},
    {title: "ParamCheckResult", description: "", image: paramCheckResult},
    {title: "canBeParam", description: "", image: canBeParam},
    {title: "matchStack", description: "", image: matchStack},
    {title: "isType2DuplicateAt", description: "", image: isType2DuplicateAt},
    {title: "Type 2 Clone Detection", description: "", image: type2CloneDetection},
    {title: "buildMethodBody", description: "", image: buildMethodBody},
    {title: "buildMethodText", description: "", image: buildMethodText},
    {title: "generateMethodCall", description: "", image: generateMethodCall},
    {title: "Extraction Task", description: "", image: extractionTask},












]

const AlgorithmsDocs = () => {
    return <div>
        <h1 className="docs-header">Algorithms</h1>
        {algos.map( (algoObj :algoObject) => {
            return <div key={algoObj.title}>
                <h2 className="mt-10 mb-4 text-[22px] font-semibold">{algoObj.title}:</h2>
                <img src={algoObj.image} alt="matchState" className="w-[75%] h-auto mx-auto"/>
            </div>

        })}

       

    </div>

}

export default AlgorithmsDocs