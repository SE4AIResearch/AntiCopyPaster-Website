import  extractionExample from '../assets/anitCopyPaster-example.png';
import pipeline from '../assets/antiCopyPaster-pipeline.png'
import cnnArchitecture from '../assets/antiCopyPaster-cnn-architecture.png'
import modelMetrics from '../assets/antiCopyPaster-model-metrics.png'
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { FaRegFileAlt } from "react-icons/fa";
import { FaAngleDoubleUp } from "react-icons/fa";
import { useRef, type RefObject, useState, useEffect} from 'react';
import ContactModal from '../components/ContactModal.tsx';
export const AntiCopyPasterPage = () => {

    const antiCopyPasterRef = useRef<HTMLDivElement>(null);
    const dupDetectCodeAnalysisRef = useRef<HTMLDivElement>(null);
    const methodExtractionRef = useRef<HTMLDivElement>(null);
    const howExtractionWorksRef = useRef<HTMLDivElement>(null);
    const extractionModelRef = useRef<HTMLDivElement>(null);
    const modelEvaluationRef = useRef<HTMLDivElement>(null);
    const refactorLauncherRef = useRef<HTMLDListElement>(null);

    const scrollToRef = (ref: RefObject<HTMLElement>) => {
        ref?.current?.scrollIntoView({ behavior: "smooth" });
    }

    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [contactModalActive, setContactModalActive] = useState(false);

    useEffect(()=>{
        const handleScroll = () => {
            if (antiCopyPasterRef.current && 
                dupDetectCodeAnalysisRef.current &&
                methodExtractionRef.current &&
                howExtractionWorksRef.current &&
                extractionModelRef.current &&
                modelEvaluationRef.current &&
                refactorLauncherRef.current
            ) {
                const antiCopyPasterRefTop = antiCopyPasterRef.current.getBoundingClientRect().top;
                const dupDetectCodeAnalysisRefTop = dupDetectCodeAnalysisRef.current.getBoundingClientRect().top;
                const methodExtractionRefTop = methodExtractionRef.current.getBoundingClientRect().top;
                const howExtractionWorksRefTop = howExtractionWorksRef.current.getBoundingClientRect().top;
                const extractionModelRefTop = extractionModelRef.current.getBoundingClientRect().top;
                const modelEvaluationRefTop = modelEvaluationRef.current.getBoundingClientRect().top;
                const refactorLauncherRefTop = refactorLauncherRef.current.getBoundingClientRect().top;

                if (antiCopyPasterRefTop >= 0 && antiCopyPasterRefTop < window.innerHeight / 2) {
                  setActiveSection("antiCopyPaster");
                } 
                else if (dupDetectCodeAnalysisRefTop >= 0 && dupDetectCodeAnalysisRefTop < window.innerHeight / 2) {
                    setActiveSection("dupDetectCodeAnalysis");
                } 
                else if (methodExtractionRefTop >= 0 && methodExtractionRefTop < window.innerHeight / 2) {
                  setActiveSection("methodExtraction");
                } 
                else if (howExtractionWorksRefTop >= 0 && howExtractionWorksRefTop < window.innerHeight / 2) {
                    setActiveSection("howExtractionWorks");
                } 
                else if (extractionModelRefTop >= 0 && extractionModelRefTop < window.innerHeight / 2) {
                setActiveSection("extractionModel");
                } 
                else if (modelEvaluationRefTop >= 0 && modelEvaluationRefTop < window.innerHeight / 2) {
                    setActiveSection("modelEvaluation");
                } 
                else if (refactorLauncherRefTop >= 0 && refactorLauncherRefTop < window.innerHeight / 2) {
                    setActiveSection("refactorLauncher");
                } 
              }
        }

        window.addEventListener("scroll", handleScroll);
        handleScroll(); 
        return () => window.removeEventListener("scroll", handleScroll);
    }, 
    [])

    return (<>
        <ContactModal contactModalActive={contactModalActive} setContactModalActive={setContactModalActive}/>

           <div className="flex flex-col sm:flex-row">
            
                <div className="w-full sm:w-3/4 p-10 pt-20">
                    <h1 ref={antiCopyPasterRef} className="page-header mb-5">What is AntiCopyPaster?</h1>
                    <p className="mb-[50px]">AntiCopyPaster is a plugin for Intellij IDEA which tracks the pasting of code fragments inside the IDE and suggests the appropriate Extract Method refactoring to combat the propagation of duplicates.</p>
                    
                    <h2 className="page-sub-header mb-5">Why Use AntiCopyPaster?</h2>
                    <p className="mb-[50px]">What makes AnitCopyPaster stand out is its direct integration with the users workflow, where it proactively recommends refactorings during development. It uses Just-In-Time refactoring rather than more typical, exhaustive methods, which review the entire code base for recommendation and is a posterior action that is only triggered upon the request of the developer.</p>
                    
                    <h2 className="page-sub-header mb-5">An Example of Extract Method refactoring with AntiCopyPaster:</h2>
                    <div>
                        <img className="shadow-sm" alt="AntiCopyPaster Extraction Example" src={extractionExample}/>
                        <p className="ml-2">Fig. 1. Extract Method refactoring opportunity.</p>
                    </div>
                    
                    <p className="my-[50px]">First, the developer updates settings to define characteristics of code fragments that they want to refactor (1, 1.1, 1.2). When developer copies and pastes code into the file (3, 4), and the tool detects a fragment worth extracting, it will give a notification (4). The user can then preview and edit the extraction, and either accept it or cancel it (5 - 7). This page will provide more detail behind each step in the following sections.</p>

                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>

                    <h1 ref={dupDetectCodeAnalysisRef} className="page-header mb-5">Duplicate Detection and Code Analysis:</h1>

                    <p>AntiCopyPaster uses a bag-of-words token-based clone detection. It takes a code fragment as input, and parses all methods inside the same file into token representations. Then, it compares the input and current methods, taking into account exact matches and fragments with minor changes between them. </p>
                    <br/>
                    <p>If similarity is detected, we implement a delay from detection time, incase user plans to significantly alter pasted code. The code fragment is placed into a queue, and is checked that is it java code, and that it constitutes a correct syntactic statement, by attempting to build a PIS tree of the fragment. If passes checks and still flagged as a duplicate after delay, code is passed to Code Analyzer, where it calculated the metric vector used for model input.</p>
                    
                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>

                    
                    <h1 ref={methodExtractionRef} className="page-sub-header mb-[35px]">Method Extraction:</h1>

                    <h2 ref={howExtractionWorksRef} className="text-2xl font-bold">How does Extraction Work in AntiCopyPaster?</h2>

                    <p className=" mt-[35px] mb-[20px]">AntiCopyPaster uses a deep learning binary classification model to decide what methods need to be extracted, trained on a dataset of 18,942 code fragments mined from 13 apache projects. Duplicate code fragments are parsed using IDEs program structure interface, to generate corresponding syntactic and semantic model. This model is then used to calculate  a set of 78 comprehensive structural and semantic metrics, used in various studies recommending Extract Method refactoring. These metrics are inputted to a binary classifier model, and if classifier confirm refactoring, the Refactoring Launcher is called.</p>

                    <div className="mb-[35px]">
                        <img className="shadow-sm" alt="AntiCopyPaster Pipeline" src={pipeline}/>
                        <p className="ml-2">Fig. 2. The pipeline of AntiCopyPaster. Top: training the model, bottom: using the plugin.</p>
                    </div>
                    
                    <h2 ref={extractionModelRef} className="text-2xl font-bold">Developing the Binary Classification Model:</h2>

                    <p className=" mt-[35px] mb-[35px]">First, a training dataset consisting of 9,471 code fragments was mined from 13 mature well-defined projects from Apache Software Foundations.  RefactoringMiner v2.0 was used on these projects to identify methods underwent extract method refactorings for positive examples.For negative examples first identify methods that were eligible for extract method, and then rank based on scoring formula inspired by Haas and Hummel, using bottom 95% for those that are less likely to be extracted. Used 78 extensively used metrics from previous studies to identify patterns in samples, and trained a binary classification model following a CNN model, taking these metrics as inputs to distinguish between whether duplicate code will or will not be extracted.</p>
                    <div className="mb-[35px]">
                        <img className="shadow-sm" alt="AntiCopyPaster CNN Architecture" src={cnnArchitecture}/>
                        <p className="ml-2">Fig. 3. The architecture of the proposed CNN model.</p>
                    </div>

                    <h2 ref={modelEvaluationRef} className="text-2xl font-bold">Evaluation of Proposed Model:</h2>

                    <p className="mt-[35px] mb-[35px]">We compared performance with 4 other ML classifiers: Random forest (RF), support vector machine (SVM), Naive Bayes (NB), and Logistic Regression (LR), since performances were competitive in similar binary classification problems. Using out-of-sample bootstrap validation, for balance between bias and variance in comparison to single-repetition holdout validation: </p>

                    <div className="mb-[35px] mx-[50px]">
                        <img className="shadow-sm" alt="AntiCopyPaster Model Metrics" src={modelMetrics}/>
                        <p className="ml-2">Fig. 4. The performance of different classifiers and CNN PCA plots between the positive (yellow) and negative (purple) classes for both
                        training and testing data.</p>
                    </div>

                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>

                    <h1 ref={refactorLauncherRef} className="page-sub-header mb-[35px]">Refactoring Launcher:</h1>

                    <p className="mt-[35px] mb-[35px]">The Refactoring Launcher first checks if pasted code fragment can be extracted into separate method without compilation errors. If so, send a notification to user in IDE, informing them of a extraction recommendation. If user views recommendation, Refactoring Launcher passes duplicate fragment as an input into IDE’s built-int extract method api and initiates preview window, where the user can accept as is, rename the new extract method, or cancel process</p>

                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>

                    <div className="flex w-[80%] mx-auto">
                        <div className="w-1/2">
                            <p>Interested and want to learn more?</p>
                            <p>Read the full literature review <a className="text-blue-600" href="https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10381511" target="_blank">here</a>.</p>
                            <p>See our other publications <Link className="text-blue-600" to="/publications">here</Link>.</p>
                            <br/>
                            <p>Questions or concerns?</p>
                            <p>Feel free to contact us <button onClick={()=>{setContactModalActive(true)}}><span className="text-blue-600">here</span></button>.</p>
                        </div>
                        <div className="w-1/2 flex items-end ">
                            <div className="flex justify-between items-center w-[80%] h-[55%] border border-1 border-black rounded-md p-5">
                                <div>
                                    <p className="text-gray-500">Next up:</p>
                                    <p>AntiCopyPaster</p>
                                </div>
                                <Link to="/anticopypaster"><FaArrowRight /></Link>

                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="w-1/4 h-[100vh] sticky top-0 bg-slate-200 py-4 px-10 hidden sm:block">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                        <FaRegFileAlt />
                        <p className="ml-2 font-bold">On this page</p>
                        </div>
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <FaAngleDoubleUp />
                        </button>
                    </div>
                    <div className="flex flex-col">
                    <button onClick={()=>scrollToRef(antiCopyPasterRef)}> 
                        <p className={activeSection === "antiCopyPaster" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>What is AntiCopyPaster?</p>
                    </button>
                    <button onClick={()=>scrollToRef(dupDetectCodeAnalysisRef)}> 
                        <p className={activeSection === "dupDetectCodeAnalysis" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>Duplicate Detection and Code Analysis</p>
                    </button>
                    <button onClick={()=>scrollToRef(methodExtractionRef)}> 
                        <p className={activeSection === "methodExtraction" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>Method Extraction</p>
                    </button>
                    <button onClick={()=>scrollToRef(howExtractionWorksRef)}> 
                        <p className={activeSection === "howExtractionWorks" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>How does Extraction Work in AntiCopyPaster?</p>
                    </button>
                    <button onClick={()=>scrollToRef(extractionModelRef)}> 
                        <p className={activeSection === "extractionModel" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>Developing the Binary Classification Model</p>
                    </button>
                    <button onClick={()=>scrollToRef(modelEvaluationRef)}> 
                        <p className={activeSection === "modelEvaluation" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>Evaluation of Proposed Model</p>
                    </button>
                    <button onClick={()=>scrollToRef(refactorLauncherRef)}> 
                        <p className={activeSection === "refactorLauncher" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>Refactor Launcher</p>
                    </button>
                    </div>
                </div>
            </div>
    </>);
}