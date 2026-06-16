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

const detectionAgentAlgorithm = `Algorithm: Detection Agent

Input:
  project context proj
  file name f
  file source S
  pasted snippet S_snip
  LLM caller L(...)

Output:
  detection result R with status, file, and clones

if S_snip is empty:
    return { status: no_clones, file: f, clones: [] }

(l_s, l_e) = findSnippetLineRange(S, S_snip)

PanelistResults = []

for p in {P1, P2, P3}:
    P_p = buildPanelistDetectionPrompt(p, proj, S, S_snip, f, l_s, l_e)
    raw_p = L(P_p)
    R_p = parseDetectionResult(raw_p, f)
    R_hat_p = normalizeDetectionResult(R_p, f, S, S_snip, l_s, l_e)
    PanelistResults.add(p, raw_p, R_p, R_hat_p)

P_c = buildDetectionCuratorPrompt(f, S, S_snip, l_s, l_e, PanelistResults)
raw_c = L(P_c)
R_c = parseDetectionResult(raw_c, f)

if R_c != null:
    R = normalizeDetectionResult(R_c, f, S, S_snip, l_s, l_e)
else:
    R = mergePanelistResults(PanelistResults, f)

if R == null or R.clones is empty:
    R = PsiFallbackDetect(proj, S, S_snip, f)

if R == null or R.clones is empty:
    return { status: no_clones, file: f, clones: [] }

R.clones = resolveCloneRangesWithPsi(proj, f, S, R.clones)
R.clones = mergeOverlappingCloneGroups(S, R.clones)

R.status = found_clones
R.file = f
return R`;

const refactoringAgentAlgorithm = `Algorithm: Refactoring Agent

Input:
  project context proj
  file name f
  file source S
  selected clone group C
  refactoring RAG guidance RAG_ref
  LLM caller L_ref(...)

Output:
  refactor result RR

if C == null:
    return { status: failed, file: f, newSource: "", message: "clone is null" }

P_base = buildRefactorPrompt(f, S, C, RAG_ref)

PanelistOutcomes = []

for p in {P1, P2, P3}:
    P_p = buildRefactorPanelistPrompt(p, P_base)
    raw_p = L_ref(P_p)

    O_p = parseRefactorCandidate(raw_p, f, S, C)

    PanelistOutcomes.add({
        panelist: p,
        raw: raw_p,
        outcome: O_p
    })

P_c = buildRefactorCuratorPrompt(f, S, C, PanelistOutcomes)
raw_c = L_ref(P_c)

Selection = parseCuratorSelection(raw_c)

if Selection is valid and Selection.selectedPanelist has applicable newSource:
    Best = PanelistOutcomes[Selection.selectedPanelist]
else:
    Best = highestScoringApplicablePanelist(PanelistOutcomes)

if Best == null or Best.outcome.newSource is empty:
    return {
        status: failed,
        file: f,
        newSource: "",
        message: "no applicable refactoring candidate"
    }

return {
    status: refactored,
    file: f,
    newSource: Best.outcome.newSource,
    selectedPanelistId: Best.panelist,
    curatorSummary: Selection.summary,
    curatorFeedback: Selection.feedback,
    curatorMatchedCategories: Selection.matchedCategories,
    message: "refactoring candidate selected"
}`;

const usefulnessCheckerAlgorithm = `Algorithm: Usefulness Checker

Input:
  project context proj
  file name f
  original source S_before
  refactored source S_after
  target clone group C
  target method hints H
  LLM caller L_use(...)

Output:
  usefulness result U

if S_after is empty or S_after == S_before:
    return { status: not_useful, reasons: [INVALID_OR_UNCHANGED_SOURCE] }

if hasSyntaxErrors(proj, f, S_after):
    return { status: unavailable, reasons: [PSI_PARSE_FAILED] }

PanelistResults = []

for p in {P1, P2, P3}:
    P_p = buildUsefulnessPanelistPrompt(p, f, S_before, S_after, C, H)
    raw_p = L_use(P_p)
    R_p = parseUsefulnessResult(raw_p)
    PanelistResults.add(p, raw_p, R_p)

P_c = buildUsefulnessCuratorPrompt(
          f, S_before, S_after, C, H, PanelistResults
      )

raw_c = L_use(P_c)
U_llm = parseUsefulnessResult(raw_c)

if U_llm == null:
    U_llm = mergePanelistUsefulnessResults(PanelistResults)

if U_llm.status == useful:
    return U_llm

BeforePsi = parseJavaFile(proj, f, S_before)
AfterPsi = parseJavaFile(proj, f, S_after)

if BeforePsi == null or AfterPsi == null:
    return { status: unavailable, reasons: [PSI_PARSE_FAILED] }

TargetMethods = resolveTargetMethods(BeforePsi, C, H)
AddedMethods = findAddedMethods(BeforePsi, AfterPsi)

if exists helper h in AddedMethods such that
   target clone occurrences are replaced by calls to h:
    return {
        status: useful,
        reasons: [EXTRACT_METHOD_CONFIRMED]
    }

if target clone logic still remains duplicated:
    return {
        status: not_useful,
        reasons: [INCOMPLETE_REFACTORING_DETECTED]
    }

if clone was deleted or replaced without shared extraction:
    return {
        status: not_useful,
        reasons: [DIRECT_CLONE_REMOVAL_DETECTED]
    }

if helper was added but clone bodies were not replaced:
    return {
        status: not_useful,
        reasons: [EXTRACTION_WITHOUT_CLONE_REPLACEMENT_DETECTED]
    }

return {
    status: not_useful,
    reasons: [EXTRACT_METHOD_NOT_FOUND]
}`;

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
    {title: "Detection Agent", description: "", code: detectionAgentAlgorithm},
    {title: "Refactoring Agent", description: "", code: refactoringAgentAlgorithm},
    {title: "Usefulness Checker", description: "", code: usefulnessCheckerAlgorithm},
]

const AlgorithmsDocs = () => {
    return <div>
        <h1 className="docs-header">Algorithms</h1>
        {algos.map( (algoObj :algoObject) => {
            return <div key={algoObj.title}>
                <h2 className="mt-10 mb-4 text-[22px] font-semibold">{algoObj.title}:</h2>
                {algoObj.image && (
                    <img src={algoObj.image} alt={algoObj.title} className="w-[75%] h-auto mx-auto"/>
                )}
                {algoObj.code && (
                    <pre className="w-full max-w-[900px] mx-auto overflow-x-auto rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-900">{algoObj.code}</pre>
                )}
            </div>

        })}

       

    </div>

}

export default AlgorithmsDocs
