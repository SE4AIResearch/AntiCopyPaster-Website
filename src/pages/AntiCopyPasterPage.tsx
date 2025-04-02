import  extractionExample from '../assets/anitCopyPaster-example.png';
import pipeline from '../assets/antiCopyPaster-pipeline.png'
import cnnArchitecture from '../assets/antiCopyPaster-cnn-architecture.png'
import modelMetrics from '../assets/antiCopyPaster-model-metrics.png'
import settings from "../assets/antiCopyPaster-settings.png"
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
    const refactorLauncherRef = useRef<HTMLDivElement>(null);
    const customDetectionRef = useRef<HTMLDivElement>(null);

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
                refactorLauncherRef.current &&
                customDetectionRef.current
            ) {
                const antiCopyPasterRefTop = antiCopyPasterRef.current.getBoundingClientRect().top;
                const dupDetectCodeAnalysisRefTop = dupDetectCodeAnalysisRef.current.getBoundingClientRect().top;
                const methodExtractionRefTop = methodExtractionRef.current.getBoundingClientRect().top;
                const howExtractionWorksRefTop = howExtractionWorksRef.current.getBoundingClientRect().top;
                const extractionModelRefTop = extractionModelRef.current.getBoundingClientRect().top;
                const modelEvaluationRefTop = modelEvaluationRef.current.getBoundingClientRect().top;
                const refactorLauncherRefTop = refactorLauncherRef.current.getBoundingClientRect().top;
                const customDetectionRefTop = customDetectionRef.current.getBoundingClientRect().top;

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
                else if (customDetectionRefTop >= 0 && customDetectionRefTop < window.innerHeight / 2) {
                    setActiveSection("customDetection");
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

                    <h1 ref={howExtractionWorksRef} className="page-header">How does Extraction Work in AntiCopyPaster?</h1>

                    <p className=" mt-[35px] mb-[20px]">AntiCopyPaster uses a deep learning binary classification model to determine which methods need to be extracted. The model is trained on a dataset of 18,942 code fragments mined from 13 Apache projects. Duplicate code fragments are parsed using the <strong>Duplicate Detector</strong> and sent to the <strong>Code Analyzer</strong> to generate corresponding syntactic and semantic models. These models are then used to compute a set of 78 comprehensive structural and semantic metrics, which have been used in various studies recommending Extract Method refactoring. These metrics are fed into the <strong>Method Extractor</strong>, and if its classifier confirms the need for refactoring, the <strong>Refactoring Launcher</strong> is triggered.</p>

                    <div className="mb-[35px]">
                        <img className="shadow-sm" alt="AntiCopyPaster Pipeline" src={pipeline}/>
                        <p className="ml-2">Fig. 2. The pipeline of AntiCopyPaster. Top: training the model, bottom: using the plugin.</p>
                    </div>

                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>

                    <h1 ref={dupDetectCodeAnalysisRef} className="page-header mb-5">Duplicate Detector and Code Analyzer:</h1>

                    
                    <p>AntiCopyPaster's <strong>Duplicate Detector</strong> uses a bag-of-words token-based clone detection method. It takes a code fragment as input and parses all methods inside the same file into token representations. Then, it compares the input and current methods, considering both exact matches and fragments with minor modifications.. </p>
                    <br/>
                    <p>If similarity is detected, we implement a delay from the detection time in case the developer intends to significantly modify the pasted code. The code fragment is then placed into a queue and checked to ensure that it is both valid Java code and a correct syntactic statement by attempting to build a Program Structure Interface (PSI) tree of the fragment. If it passes the two checks, and is still flagged as a duplicate after the delay period, the code fragment is passed to <strong>Code Analyzer</strong>, where it calculates a metric vector consiting of 78 well-defined metrics for determining an extraction recommendation. This metric vector is used as input for the <strong>Method Extractor</strong>.</p>
                    
                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>

                    
                    <h1 ref={methodExtractionRef} className="page-sub-header mb-[35px]">Method Extractor:</h1>

                    <p className=" mt-[35px] mb-[35px]">The Method Extractor takes the metric vector as input, and feeds it to the pre-trained model in order to make the binary decision of whether this code fragment is similar to the ones that have been previously refactored in real projects. If the classifier confirms the refactoring, then <strong>Refactoring Launcher</strong> is called.</p>

                    
                    
                    <h2 ref={extractionModelRef} className="text-2xl font-bold">Developing the Binary Classification Model:</h2>

                    <p className=" mt-[35px] mb-[35px]">First, a training dataset consisting of 9,471 code fragments was mined from the 13 mature, well-defined projects from Apache Software Foundations. RefactoringMiner v2.0 was used to identify methods that underwent Extract Method refactorings, serving as positive examples. For negative examples, methods eligible for Extract Method refactoring were first identified. These methods were then ranked based on a scoring formula inspired by Haas and Hummel, using the bottom 95%, methods considered less likely to be extracted. A set of 78 extensively used metrics from previous studies was defined to identify patterns in the samples, and the binary classification model, based on a Convolutional Neural Network (CNN), was trained using these metrics as inputs to distinguish whether duplicate code is likely to be extracted or not.</p>
                    <div className="mb-[35px]">
                        <img className="shadow-sm" alt="AntiCopyPaster CNN Architecture" src={cnnArchitecture}/>
                        <p className="ml-2">Fig. 3. The architecture of the proposed CNN model.</p>
                    </div>

                    <h2 ref={modelEvaluationRef} className="text-2xl font-bold">Evaluation of Proposed Model:</h2>

                    <p className="mt-[35px] mb-[35px]">We compared performance with 4 other ML classifiers: Random forest (RF), support vector machine (SVM), Naive Bayes (NB), and Logistic Regression (LR), since performances were competitive in similar binary classification problems. Using out-of-sample bootstrap validation, for balance between bias and variance in comparison to single-repetition holdout validation, we found these results: </p>

                    <div className="mb-[35px] mx-[50px]">
                        <img className="shadow-sm" alt="AntiCopyPaster Model Metrics" src={modelMetrics}/>
                        <p className="ml-2">Fig. 4. The performance of different classifiers and CNN PCA plots between the positive (yellow) and negative (purple) classes for both
                        training and testing data.</p>
                    </div>

                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>

                    <h1 ref={refactorLauncherRef} className="page-sub-header mb-[35px]">Refactoring Launcher:</h1>
                    <p className="mt-[35px] mb-[35px]">The Refactoring Launcher first checks if a pasted code fragment can be extracted into separate method without compilation errors. If so, it sends a notification to user in the IDE, informing them of a extraction recommendation. If user chooses to view the recommendation, <strong>Refactoring Launcher</strong> passes the duplicate fragment to the IDE’s built-in extract method api as an input and initiates a preview window, where the user can accept the extraction as is, rename the new extract method, or cancel the entire process.</p>
                   
                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>

                    <h1 ref={customDetectionRef} className="page-sub-header">Customizing Detection Rules:</h1>
                    <p className="mt-[35px] mb-[35px]">In AntiCopyPaster 2.0+, we give users the ability to define what characteristics of duplicate code that they want to be refactored.</p>
                    
                    <h2 className="text-2xl font-bold mb-[35px]">Settings Page:</h2>
                    <div className="mb-[35px] mx-[100px]">
                        <img className="shadow-sm" alt="AntiCopyPaster Settings" src={settings}/>
                        <p className="ml-2">Fig. 5. AntiCopyPaster Settings Page.</p>
                    </div>
                    <p>Users can choose how many instances of duplicate code are required to trigger a notification, and the delay time between detection and notification. Additionally, users can choose between heuristic recommendations or deep learning model recommendations.</p>
                    <br/>
                    <p>For heuristic recommendations, users can measure and compare 4 metrics for detection:</p>
                    <ul className="list-disc pl-5  mb-[50px]">
                        <li>Keywords: how many keywords the segment should contain</li>
                        <li>Coupling: how many references made outside of this class</li>
                        <li>Complexity: how sensitive recommendation is to complexity</li>
                        <li>Size: how large the code segment is</li>
                    </ul>

                    <h2 className="text-2xl font-bold mb-[35px]">Advanced Settings Page:</h2>
                    <p>Can customize each of the 4 metrics:</p>
                    <ul className="list-disc pl-5  mb-[200px]">
                        <li>Keywords: choose between total keyword count and keyword density, and choose specific keywords</li>
                        <li>Coupling: choose between total coupling and coupling density, and choose between total, field, or method connectivity</li>
                        <li>Complexity: choose between total area of segment, area density, declaration area, or method declaration depth density</li>
                        <li>Size: choose between number of lines, number of symbols, density of symbols, and between size of segment and size of method declarations</li>
                    </ul>
                    <div className="flex w-[80%] mx-auto">
                        <div className="w-1/2">
                            <p>Interested and want to learn more?</p>
                            <p>See our publications <Link className="text-blue-600" to="/publications">here</Link>.</p>
                            <br/>
                            <p>Questions or concerns?</p>
                            <p>Feel free to contact us <button onClick={()=>{setContactModalActive(true)}}><span className="text-blue-600">here</span></button>.</p>
                        </div>
                        <div className="w-1/2 flex items-end ">
                            <div className="flex justify-between items-center w-[80%] h-[55%] border border-1 border-black rounded-md p-5">
                                <div>
                                    <p className="text-gray-500">Next up:</p>
                                    <p>AntiCopyPaster Docs</p>
                                </div>
                                <Link to="/docs/getting-started"><FaArrowRight /></Link>

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
                    <button onClick={()=>scrollToRef(howExtractionWorksRef)}> 
                        <p className={activeSection === "howExtractionWorks" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>How does Extraction Work in AntiCopyPaster?</p>
                    </button>
                    <button onClick={()=>scrollToRef(dupDetectCodeAnalysisRef)}> 
                        <p className={activeSection === "dupDetectCodeAnalysis" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>Duplicate Detector and Code Analyzer</p>
                    </button>
                    <button onClick={()=>scrollToRef(methodExtractionRef)}> 
                        <p className={activeSection === "methodExtraction" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>Method Extractor</p>
                    </button>
                    
                    <button onClick={()=>scrollToRef(extractionModelRef)}> 
                        <p className={activeSection === "extractionModel" ? "text-left mb-1 ml-5 text-blue-600": "text-left mb-1 ml-5"}>Developing the Binary Classification Model</p>
                    </button>
                    <button onClick={()=>scrollToRef(modelEvaluationRef)}> 
                        <p className={activeSection === "modelEvaluation" ? "text-left mb-1 ml-5 text-blue-600": "text-left mb-1 ml-5"}>Evaluation of Proposed Model</p>
                    </button>
                    <button onClick={()=>scrollToRef(refactorLauncherRef)}> 
                        <p className={activeSection === "refactorLauncher" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>Refactor Launcher</p>
                    </button>
                    <button onClick={()=>scrollToRef(customDetectionRef)}> 
                        <p className={activeSection === "customDetection" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>Customizing Detection Rules</p>
                    </button>
                    </div>
                </div>
            </div>
    </>);
}