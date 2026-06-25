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
    image?: string
    code?: string
}

const detectionAgentAlgorithm = `Input: P, the project context, f, the file name, S, the file source, F, the pasted code fragment, L, the LLM caller
Output: R, the detected clone groups with their source ranges
if F is empty then
    return NoClones(f)
end
(l_s, l_e) ← findSnippetLineRange(S, F)
panelists ← []
foreach p ∈ {P1, P2, P3} do
    Q_p ← buildPanelistPrompt(p, P, f, S, F, l_s, l_e)
    A_p ← L(Q_p)
    D_p ← parseDetection(A_p, f)
    D_p ← normalizeDetection(D_p, f, S, F, l_s, l_e)
    panelists.add(p, A_p, D_p)
end
Q_c ← buildCuratorPrompt(f, S, F, l_s, l_e, panelists)
A_c ← L(Q_c)
D_c ← parseDetection(A_c, f)
if D_c is not null then
    R ← normalizeDetection(D_c, f, S, F, l_s, l_e)
else
    R ← mergePanelists(panelists, f)
end
if R is null or R.clones is empty then
    R ← psiFallbackDetect(P, S, F, f)
end
if R is null or R.clones is empty then
    return NoClones(f)
end
R.clones ← resolveCloneRanges(P, f, S, R.clones)
R.clones ← mergeOverlappingGroups(S, R.clones)
return FoundClones(f, R.clones)`;

const refactoringAgentAlgorithm = `Input: P, the project context, f, the file name, S, the file source, C, the selected clone group, G, the RAG guidance, L, the LLM caller
Output: RR, the selected refactoring candidate
if C is null then
    return Failed(f, "clone is null")
end
Q ← buildRefactorPrompt(f, S, C, G)
candidates ← []
foreach p ∈ {P1, P2, P3} do
    Q_p ← buildRefactorPanelistPrompt(p, Q)
    A_p ← L(Q_p)
    O_p ← parseRefactorCandidate(A_p, f, S, C)
    candidates.add(p, A_p, O_p)
end
Q_c ← buildRefactorCuratorPrompt(f, S, C, candidates)
A_c ← L(Q_c)
selection ← parseCuratorSelection(A_c)
if selection is valid and candidates[selection.panelist] is applicable then
    best ← candidates[selection.panelist]
else
    best ← highestScoringApplicable(candidates)
end
if best is null or best.source is empty then
    return Failed(f, "no applicable refactoring candidate")
end
return Refactored(f, best.source, best.panelist, selection.summary)`;

const usefulnessCheckerAlgorithm = `Input: P, the project context, f, the file name, S_b, the original source, S_a, the refactored source, C, the clone group, H, the target method hints, L, the LLM caller
Output: U, the usefulness decision and its reasons
if S_a is empty or S_a = S_b then
    return NotUseful([INVALID_OR_UNCHANGED_SOURCE])
end
if hasSyntaxErrors(P, f, S_a) then
    return Unavailable([PSI_PARSE_FAILED])
end
panelists ← []
foreach p ∈ {P1, P2, P3} do
    Q_p ← buildUsefulnessPanelistPrompt(p, f, S_b, S_a, C, H)
    A_p ← L(Q_p)
    U_p ← parseUsefulness(A_p)
    panelists.add(p, A_p, U_p)
end
Q_c ← buildUsefulnessCuratorPrompt(f, S_b, S_a, C, H, panelists)
A_c ← L(Q_c)
U ← parseUsefulness(A_c)
if U is null then
    U ← mergePanelists(panelists)
end
if U.status = useful then
    return U
end
B ← parseJavaFile(P, f, S_b)
A ← parseJavaFile(P, f, S_a)
if B is null or A is null then
    return Unavailable([PSI_PARSE_FAILED])
end
T ← resolveTargetMethods(B, C, H)
M ← findAddedMethods(B, A)
if ∃ h ∈ M such that occurrences(C, T) are replaced by calls to h then
    return Useful([EXTRACT_METHOD_CONFIRMED])
end
if duplicateLogicRemains(A, C) then
    return NotUseful([INCOMPLETE_REFACTORING_DETECTED])
end
if cloneRemovedWithoutExtraction(B, A, C) then
    return NotUseful([DIRECT_CLONE_REMOVAL_DETECTED])
end
if helperAddedWithoutCloneReplacement(A, C) then
    return NotUseful([EXTRACTION_WITHOUT_CLONE_REPLACEMENT_DETECTED])
end
return NotUseful([EXTRACT_METHOD_NOT_FOUND])`;

const crossFileDetectionAgentAlgorithm = `Input: P, the project context, F, the selected files, A, the pasted snippet anchor, L, the LLM caller
Output: R, the detected cross-file clone groups
if |F| < 2 then
    return NoClones(F)
end
S ← readCrossFileSources(P, F)
if |S| < 2 then
    return NoClones(F)
end
anchors ← resolvePastedSnippetAnchors(S, A)
if A is not empty and anchors is empty then
    return NoClones(F)
end
panelists ← []
foreach p ∈ {P1, P2, P3} do
    Q_p ← buildCrossFileDetectionPanelistPrompt(p, S, A)
    A_p ← L(Q_p)
    D_p ← parseCrossFileDetection(A_p, S, A)
    D_p ← verifyOccurrences(D_p, S)
    panelists.add(p, A_p, D_p)
end
Q_c ← buildCrossFileDetectionCuratorPrompt(S, A, panelists)
A_c ← L(Q_c)
D_c ← parseCrossFileDetection(A_c, S, A)
if D_c is not null then
    R ← D_c
else
    R ← mergeCrossFilePanelists(panelists)
end
R.clones ← keepClonesSpanningAtLeastTwoFiles(R.clones)
if A is not empty then
    R.clones ← keepClonesContainingAnchor(R.clones, anchors)
end
if R.clones is empty then
    return NoClones(F)
end
C ← selectBestCrossFileClone(R)
return FoundCrossFileClones(C)`;

const crossFileRefactoringAgentAlgorithm = `Input: P, the project context, S, the selected file sources, C, the selected cross-file clone, B, retry feedback, E, the previous result, L, the LLM caller
Output: RR, the selected cross-file refactoring plan
if C is null or C touches fewer than two files then
    return Failed("no valid cross-file clone")
end
X ← buildCrossFileRefactorContext(P, S, C)
Q ← buildCrossFileRefactorPrompt(P, S, C, B, E, X)
candidates ← []
foreach p ∈ {P1, P2, P3} do
    Q_p ← buildCrossFileRefactorPanelistPrompt(p, Q)
    A_p ← L(Q_p)
    O_p ← parseCrossFileRefactorResult(A_p, P, S, C, X)
    candidates.add(p, A_p, O_p)
end
Q_c ← buildCrossFileRefactorCuratorPrompt(S, C, candidates, X)
A_c ← L(Q_c)
selection ← parseCrossFilePanelistSelection(A_c)
best ← resolveSelectedRefactorPanelist(selection, candidates)
if best is null or best.result is not parsed then
    return Failed("no applicable cross-file refactoring candidate")
end
RR ← best.result
RR.sharedHelper ← normalizeSharedHelperPlan(P, S, C, RR.sharedHelper, X)
RR.files ← applyOccurrenceReplacements(S, C, RR)
if helperMissing(RR) or anyOccurrenceUnreplaced(C, RR) then
    return Failed("shared helper or occurrence replacement is incomplete")
end
return CrossFileRefactored(RR.changedFiles, RR.sharedHelper, best.panelist, selection.summary)`;

const crossFileUsefulnessCheckerAlgorithm = `Input: P, the project context, S, the selected file sources, C, the selected cross-file clone, RR, the refactor result, L, the LLM caller
Output: U, the cross-file usefulness decision and its feedback
if RR is null or RR has no changed files then
    return NotUseful([INVALID_OR_UNCHANGED_SOURCE])
end
B ← buildCrossFileBeforeDiffBundle(S, RR)
A ← buildCrossFileDiffBundle(S, RR)
I ← buildCrossFileUsefulnessInput(S, C, RR, B, A)
panelists ← []
foreach p ∈ {P1, P2, P3} do
    Q_p ← buildUsefulnessPanelistPrompt(p, I)
    A_p ← L(Q_p)
    U_p ← parseUsefulness(A_p)
    panelists.add(p, A_p, U_p)
end
Q_c ← buildUsefulnessCuratorPrompt(I, panelists)
A_c ← L(Q_c)
U ← parseUsefulness(A_c)
if U is null then
    U ← mergePanelists(panelists)
end
if U is not parsed then
    return Unavailable([USEFULNESS_PARSE_FAILED])
end
if U.status = useful then
    return U
end
return NotUseful(U.reasons, U.feedback)`;

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
    {title: "Multi-Agent Algorithms", description: ""},
    {title: "Single File Detection Agent", description: "", code: detectionAgentAlgorithm},
    {title: "Single File Refactoring Agent", description: "", code: refactoringAgentAlgorithm},
    {title: "Single File Usefulness Checker", description: "", code: usefulnessCheckerAlgorithm},
    {title: "Cross File Detection Agent", description: "", code: crossFileDetectionAgentAlgorithm},
    {title: "Cross File Refactoring Agent", description: "", code: crossFileRefactoringAgentAlgorithm},
    {title: "Cross File Usefulness Checker", description: "", code: crossFileUsefulnessCheckerAlgorithm},
]

const renderAlgorithmLine = (line: string, index: number) => {
    if (line.trim() === "") {
        return <span key={index} className="block h-[1.3em]" aria-hidden="true" />
    }

    const headingMatch = line.match(/^(Algorithm|Input|Output):(.*)$/)
    if (headingMatch) {
        return (
            <span key={index} className="block">
                <strong>{headingMatch[1]}:</strong>{headingMatch[2]}
            </span>
        )
    }

    const keywordMatch = line.match(/^(\s*)(if|else|foreach|for|return|end)(\b.*)?$/)
    if (keywordMatch) {
        return (
            <span key={index} className="block">
                <span>{keywordMatch[1]}</span>
                <strong>{keywordMatch[2]}</strong>
                {keywordMatch[3]}
            </span>
        )
    }

    return <span key={index} className="block">{line}</span>
}

const AlgorithmText = ({ code }: { code: string }) => {
    return (
        <div className="algorithm-paper w-full md:w-[75%] mx-auto overflow-x-auto">
            <pre>{code.split("\n").map(renderAlgorithmLine)}</pre>
        </div>
    )
}

const AlgorithmsDocs = () => {
    return <div>
        <h1 className="docs-header">Algorithms</h1>
        {algos.map( (algoObj :algoObject) => {
            if (algoObj.title === "Multi-Agent Algorithms") {
                return <h2 key={algoObj.title} className="mt-14 mb-2 text-center text-3xl font-bold">{algoObj.title}</h2>
            }

            return <div key={algoObj.title}>
                <h2 className="mt-10 mb-4 text-[22px] font-semibold">{algoObj.title}:</h2>
                {algoObj.image && (
                    <img src={algoObj.image} alt={algoObj.title} className="w-full md:w-[75%] h-auto mx-auto"/>
                )}
                {algoObj.code && (
                    <AlgorithmText code={algoObj.code}/>
                )}
            </div>

        })}

       

    </div>

}

export default AlgorithmsDocs
