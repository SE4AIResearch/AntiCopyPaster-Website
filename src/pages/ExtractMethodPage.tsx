import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import  timeline from '../assets/extractmethod-timeline.webp';
import cloneTypes from '../assets/extractmethod-clone-types.png';
import relationships from '../assets/extractmethod-relationships.webp'
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { FaRegFileAlt } from "react-icons/fa";
import { FaAngleDoubleUp } from "react-icons/fa";
import { useRef, type RefObject, useState, useEffect} from 'react';
import ContactModal from '../components/ContactModal.tsx';
const getNextBeforeRefactor = `
    public Result getNext(Databag db) throws ExecException {
        List<ExpressionOperator> l = new ArrayList<ExpressionOperator>();
        l.add(cond);
        Result r = accumChild(l, dummyBool);

        if (r != null) {
            if (r.returnStatus != POStatus.STATUS_BATCH_OK) {
                return r;
            }
            l.clear();
            l.add(lhs);
            l.add(rhs);
            r.accumChild(1, db);
            return r;
        }
        Result res = cond.getNext(dummyBool);
        if (res.result == null || res.returnStatus != POStatus.STATUS_OK)
            return res;
        Result result = 
            ((Boolean) res.result) == true ? lhs.getNext(db) : rhs.geNext(db);
        illustratorMarkup(null, result.result, ((Boolean) res.result) ? 0: 1);
        return result; 
    }
    
    public Result getNext(DataByteArray ba) throws ExecException {
        List<ExpressionOperator> l = new ArrayList<ExpressionOperator>();
        l.add(cond);
        Result r = accumChild(l, dummyBool);

        if (r != null) {
            if (r.returnStatus != POStatus.STATUS_BATCH_OK) {
                return r;
            }
            l.clear();
            l.add(lhs);
            l.add(rhs);
            r.accumChild(list, ba);
            return r;
        }
        Result res = cond.getNext(dummyBool);
        if (res.result == null || res.returnStatus != POStatus.STATUS_OK)
            return res;
        Result result = 
            ((Boolean) res.result) == true ? lhs.getNext(ba) : rhs.geNext(ba);
        illustratorMarkup(null, result.result, ((Boolean) res.result) ? 0: 1);
        return result; 
    }
    `;

const getNextAfterRefactor = `
    public Result getNext(DataBag db) throws ExecException {
        return genericGetNext(db, DataType.BAG);
    }

    public Result getNext(DataByteArray ba) throws ExecException {
        return genericGetNext(ba, DataType.BYTEARRAY);
    }

    public Result genericGetNext(Object obj, Byte dataType) throws ExecException {
        List<ExpressionOperator> l = new ArrayList<ExpressionOperator>();
        l.add(cond);
        Result r = accumChild(l, dummyBool);

        if (r != null) {
            if (r.returnStatus != POStatus.STATUS_BATCH_OK) {
                return r;
            }
            l.clear();
            l.add(lhs);
            l.add(rhs);
            r.accumChild(list, obj, dataType);
            return r;
        }
        Result res = cond.getNext(dummyBool);
        if (res.result == null || res.returnStatus != POStatus.STATUS_OK) {
            return res;
        }
        Result result = ((Boolean) res.result) == true 
                                            ? lhs.getNext(obj, dataType) 
                                            : rhs.geNext(obj, dataType);
        illustratorMarkup(null, result.result, ((Boolean) res.result) ? 0: 1);
        return result; 
    } 
`;
const longMethodCode = `
    public class OrderService {

        public void processOrders(List<Order> orders) {
            System.out.println("Starting order processing...");

            // Validate orders
            for (Order order : orders) {
                if (order.getItems().isEmpty()) {
                    System.out.println("Invalid order: " + order.getId() + " (No items)");
                    return;
                }
            }

            // Process payments
            for (Order order : orders) {
                PaymentDetails payment = order.getPaymentDetails();
                if (payment.getCardNumber().isEmpty() || payment.getAmount() <= 0) {
                    System.out.println("Payment failed for order: " + order.getId());
                    return;
                }
                System.out.println("Processing payment of $" 
                                    + payment.getAmount() 
                                    + " for order #" + order.getId());
            }

            // Send confirmation emails
            for (Order order : orders) {
                System.out.println("Sending confirmation email to: " + order.getCustomerEmail());
            }

            System.out.println("Order processing completed.");
        }
    }
`;

const longMethodRefactoredCode = `
// Order Validator
public boolean isValidOrder(Order order) {
    if (order.getItems().isEmpty()) {
        System.out.println("Invalid order: " + order.getId() + " (No items)");
        return false;
    }
    return true;
}


// Payment Processor
public boolean processPayment(PaymentDetails payment, int orderId) {
    if (payment.getCardNumber().isEmpty() || payment.getAmount() <= 0) {
        System.out.println("Payment failed for order: " + orderId);
        return false;
    }
    System.out.println("Processing payment of $" 
                                + payment.getAmount() + " for order #" + orderId);
    return true;
}


// Email Confirmation
public void sendConfirmation(String customerEmail, int orderId) {
    System.out.println("Sending confirmation email to: " 
                                + customerEmail + " for order #" + orderId);
}
}
`
export const ExtractMethodPage = () => {
    const extractMethodRef = useRef<HTMLDivElement>(null);
    const slrRef = useRef<HTMLDivElement>(null);
    const codeCloneRef = useRef<HTMLDivElement>(null);
    const longMethodRef = useRef<HTMLDivElement>(null);
    const separationConcernsRef = useRef<HTMLDivElement>(null);
    const codeRef = useRef<HTMLDivElement>(null);

    const scrollToRef = (ref: RefObject<HTMLElement>) => {
        ref?.current?.scrollIntoView({ behavior: "smooth" });
    }

    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [contactModalActive, setContactModalActive] = useState(false);

    useEffect(()=>{
        const handleScroll = () => {
            if (extractMethodRef.current && 
                slrRef.current &&
                codeCloneRef.current &&
                longMethodRef.current &&
                separationConcernsRef.current &&
                codeRef.current
            ) {
                const extractMethodTop = extractMethodRef.current.getBoundingClientRect().top;
                const slrRefTop = slrRef.current.getBoundingClientRect().top;
                const codeCloneRefTop = codeCloneRef.current.getBoundingClientRect().top;
                const longMethodRefTop = longMethodRef.current.getBoundingClientRect().top;
                const separationConcernsRefTop = separationConcernsRef.current.getBoundingClientRect().top;
                const codeRefTop = codeRef.current.getBoundingClientRect().top;


                if (extractMethodTop >= 0 && extractMethodTop < window.innerHeight / 2) {
                  setActiveSection("extractMethod");
                } 
                else if (slrRefTop >= 0 && slrRefTop < window.innerHeight / 2) {
                    setActiveSection("slr");
                } 
                else if (codeCloneRefTop >= 0 && codeCloneRefTop < window.innerHeight / 2) {
                  setActiveSection("codeClone");
                } 
                else if (longMethodRefTop >= 0 && longMethodRefTop < window.innerHeight / 2) {
                    setActiveSection("longMethod");
                } 
                else if (separationConcernsRefTop >= 0 && separationConcernsRefTop < window.innerHeight / 2) {
                setActiveSection("separationConcerns");
                } 
                else if (codeRefTop >= 0 && codeRefTop < window.innerHeight / 2) {
                    setActiveSection("code");
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
                    <h1 ref={extractMethodRef} className="page-header mb-5">Extract Method for Code Refactoring</h1>
                    <p className="mb-5">The Extract Method refactoring lets you take a code fragment that can be grouped, move it into a separated method, and replace the old code with a call to the method.</p>
                    <h2 className="page-sub-header my-2">Some of its main benefits include:</h2>
                    <ul className="list-disc pl-5  mb-14">
                        <li>Improve code quality</li>
                        <li>Extraction of reusable methods and eliminate code duplication</li>
                        <li>Wrapping older method signatures</li>
                        <li>Decomposition of long or complex code structures</li>
                        <li>Support of code testability</li>
                    </ul>
                    <p>Method extraction is one of the main refactorings that were defined when the study of refactoring was established, as it is a common response to the need of keeping methods concise and modular, and reducing the spread of shared responsibilities. The wide variety of usage scenarios shows why method extraction is considered the Swiss Army knife of refactoring operations.</p>
                    
                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>
                    <h2 className="page-sub-header">An Example of Extract Method Refactoring:</h2>
                    <p className=" my-[35px]">Consider this getNext() method with two overloads:</p>
                    <div className="w-[100%] sm:w-[80%] mx-auto border border-1 shadow-lg rounded-lg object-contain">
                        <SyntaxHighlighter 
                            language="java" 
                            style={docco}
                            className="p-4 rounded-md bg-gray-900 text-white text-sm sm:text-base"

                            >
                            {getNextBeforeRefactor}
                        </SyntaxHighlighter>
                    </div>
                    <p className=" my-[35px]">After refactoring using Extract Method:</p>
                    <div className="w-[100%] sm:w-[80%] mx-auto border border-1 shadow-lg rounded-lg object-scale-down">
                        <SyntaxHighlighter 
                            language="java" 
                            style={docco}
                            className="p-4 rounded-md bg-gray-900 text-white text-sm sm:text-base"    
                        >
                            {getNextAfterRefactor}
                        </SyntaxHighlighter>
                    </div>
                    <p className=" my-[75px]">In this example, the two getNext methods have different parameter data types, but similar method signatures. After running Extract Method, the similar method signatures are extracted into a single, newly generated method, genericGetNext, which abstracts the parameter type, and then is called within each of the two getNext methods. </p>
                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>

                    <p className=" mt-[75px] mb-[100px] italic">Extract Method refactoring is often difficult to apply in practice due to the low-level code changes it requires. Additionally, existing methods primarily focus on automating the refactoring process rather than recommending opportunities to apply it. As a result, various research projects have aimed to bridge this gap by developing techniques to identify and recommend refactoring opportunities.</p>
                   
                    <h1 ref={slrRef} className="page-header mb-5">Systematic Literature Review on Current Extract Method Refactoring Research</h1>
                    <p>We conducted the study, Behind the Intent of Extract Method Refactoring: A Systematic Literature Review, to gain more insight on historical and current research and advancements surrounding Extract Method code refactoring. This systematic literature review captures meaningful statistics from 83 primary studies, focusing on 3 main Extract Method categories: <strong>Code Clones</strong>, <strong>Long Methods</strong>, and <strong>Separation of Concerns</strong>.</p>
                    <div className="my-[100px]">
                        <img alt="Extract Method Development Timeline" src={timeline}/>
                        <p>Fig. 1. Timeline of developing Extract Method refactoring tools.</p>
                    </div>

                    <h2 ref={codeCloneRef} className="page-sub-header">Code Clones:</h2>
                    <p className=" mt-[35px] mb-[20px]">Code clones take code fragments and move them to create a new method, while replacing all instances of that fragment with a call to this newly created method. Of the studies used, 38.6% had a focus on code clone methods, and 49% of the extract method refactoring tools are primarily designed for fixing code clones.</p>
                    <p className="">Some notable clone detection tools include: <strong>CloRT</strong>, <strong>Aries</strong>, <strong>CCShaper</strong>, <strong>Wrangler</strong>, <strong>HaRe</strong>, <strong>CeDAR</strong>, <strong>FTMPAT</strong>, and <strong>SPAPE</strong>.</p>

                    <h3 className="text-2xl font-bold mt-[35px]">Clone Types</h3>
                    <p className=" my-[10px]">There are 4 notable, well-defined clone types in the area of Extract Methed Refactoring:</p>
                    <div className="flex flex-col border border-1 border-black rounded-md">
                        <div className="border-b border-1 border-black  p-4">
                            <p className=""><strong>Type 1</strong>: Identical code fragments except for variations in whitespace (Type-1a), comments (Type-1b), and layouts and formatting (Type-1c).</p>
                        </div>
                        <div className="border-b border-1 border-black  p-4">
                            <p className=""><strong>Type 2</strong>: Syntactically identical fragments except for variations in identifiers, literals, types, whitespace, layout and comments. It can involve renaming of identifiers and literals in the first fragment (Type-2a), renaming identifiers in the second fragment (Type-2b), renaming data types and literal values in the third fragment (Type-2c), and replacing some parameters with expressions in the fourth fragment (Type-2d).</p>
                        </div>
                        <div className="border-b border-1 border-black  p-4">
                            <p className=""><strong>Type 3</strong>: Copied fragments with further modifications such as changed, added or removed statements, in addition to variations in identifiers, literals, types, whitespace, layout and comments.</p>
                        </div>
                        <div className="p-4">
                            <p className=""><strong>Type 4</strong>: Two or more code fragments that perform the same computation but are implemented by different syntactic variants. </p>
                        </div>
                    </div>

                    <div className="w-[70%] h-auto mx-auto mt-[100px]">
                        <img alt="Clone Types Diagram" src={cloneTypes}/>
                        <p className="ml-2">Fig. 2. Examples of various clone types [1]</p>
                        <p className="ml-2">[1] Roy, Chanchal K., James R. Cordy, and Rainer Koschke. "Comparison and evaluation of code clone detection techniques and tools: A qualitative approach." Science of Computer Programming 74.7 (2009): 470-495.</p>
                    </div>
                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>

                    <h2 ref={longMethodRef} className="page-sub-header">Long Methods:</h2>
                    <p className=" mt-[35px] mb-[20px]">Long methods are long and complex method that hinders the readability, reusability, and maintainability of the code. 25.6% of the studies focused on identifying extract method opportunities to eliminate long method design effects, through extracting independent and cohesive fragments from long methods as new, short and reusable methods.</p>
                    <p className="">Some notable long method detection tools include: <strong>Tuck</strong>, <strong>JDeodorant</strong>, <strong>AutoMed</strong>, <strong>SEMI</strong>, <strong>LLPM</strong>, <strong>LMR</strong>, <strong>Bandago</strong>, and <strong>TOAD</strong>.</p>
                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>

                    <h2 ref={separationConcernsRef} className="page-sub-header">Separation of Concerns:</h2>
                    <p className=" mt-[35px] mb-[20px]">Separation of concerns refers to the categorization of methods into multiple sub-methods based on behavior to make code less complex and more effectively reusable. 34.9% of the studies used focused on separation of concerns, however there are limitations of the studies due to the absence of context related to the application of refactorings. This makes it unclear as to how developers will identify need to apply refactorings.</p>
                    <p className="">Some notable separation of concerns tools include: <strong>SDAR</strong>, <strong>Xrefactory</strong>, <strong>RefactoringAnnotation</strong>, <strong>JExtract</strong>, <strong>ReAF</strong>, <strong>GEMS</strong>, and <strong>PostponableRefactoring</strong>.</p>
                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>

                    <h2 className="page-sub-header">An Example concerning Long Methods and Separation of Concerns:</h2>
                    <p className=" my-[35px]">Consider this java class, orderService:</p>
                    <div>
                        <SyntaxHighlighter 
                            language="java"  
                            style={docco}
                        >
                            {longMethodCode}
                        </SyntaxHighlighter>
                    </div>
                    <p  className=" my-[35px]">Here, we consider the processOrders() method to be a long method. This method takes on too many responsibilities, is hard to follow, and has limited reusability opportunities. We can refactor this method to better follow best practices using a separations of concerns methodology. We may get something like this:</p>
                    <div>
                        <SyntaxHighlighter 
                            language="java"  
                            style={docco}
                        >
                            {longMethodRefactoredCode}
                        </SyntaxHighlighter>
                    </div>
                    <p  className=" my-[35px]">After refactoring, processOrders() is split into three methods, isValidOrder(), processPayment(), and sendConfirmation(). Each method now has a single responsibility and are individually able to be used in various situations, enhancing reusability.</p>
                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[100px] w-[65%] mx-auto"/>

                    <h1 ref={codeRef} className="page-header mb-[50px]">Code Analysis and Representations in Extract Method Tools</h1>
                    <h2 className="page-sub-header">Code Analysis:</h2>
                    <p className=" my-[10px]">Code analysis refers to the nature of a code can be represented by the design properties of its specification. The 4 main design properties that are considered are:</p>
                    <ul className="list-disc pl-5  mb-[50px]">
                        <li><strong>Textual</strong>: no transformation of source code, used directly in detection process</li>
                        <li><strong>Structural</strong>: transforms code into lexical tokens with compiler-style lexical analysis</li>
                        <li><strong>Syntactic</strong>: use parse to transform source program into parse tree/ AST</li>
                        <li><strong>Semantic</strong>: captures control and data flow of program by utilizing static program analysis</li>
                    </ul>
                
                    <h2 className="page-sub-header">Code Representations:</h2>
                    <p className=" my-[10px]">Code representation refers to the the internal representation of the artifacts to be refactored. We extract comprehensive categories grouping the representation types used to implement the Extract Method refactoring. These studies are based on six main categories:</p>
                    <ul className="list-disc pl-5  mb-[50px]">
                        <li>Source code (31.3%)</li>
                        <li>Abstract Syntax Tree (22.9%)</li>
                        <li>Graphs (18.1%)</li>
                        <li>Metrics (10.8%)</li>
                        <li>Tokens (9.6%)</li>
                        <li>Text (7.2%)</li>
                    </ul>
                
                    <div className="mx-auto mt-[100px] mb-[200px]">
                        <img alt="Extract Method relationships" src={relationships}/>
                        <p className="ml-2">Fig. 3. The relationship among the intent, code analysis, representation, detection, execution, and validation method of the Extract Method refactoring.</p>
                    </div>


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
                    <button onClick={()=>scrollToRef(extractMethodRef)}> 
                        <p className={activeSection === "extractMethod" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>Extract Method for Code Refactoring</p>
                    </button>
                    <button onClick={()=>scrollToRef(slrRef)}> 
                        <p className={activeSection === "slr" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>Systematic literature review on current Extract Method Refactoring research</p>
                    </button>
                    <button onClick={()=>scrollToRef(codeCloneRef)}> 
                        <p className={activeSection === "codeClone" ? "text-left mb-1 ml-5 text-blue-600": "text-left mb-1 ml-5"}>Code Clones</p>
                    </button>
                    <button onClick={()=>scrollToRef(longMethodRef)}> 
                        <p className={activeSection === "longMethod" ? "text-left mb-1 ml-5 text-blue-600": "text-left mb-1 ml-5"}>Long Methods</p>
                    </button>
                    <button onClick={()=>scrollToRef(separationConcernsRef)}> 
                        <p className={activeSection === "separationConcerns" ? "text-left mb-1 ml-5 text-blue-600": "text-left mb-1 ml-5"}>Separation of Concerns</p>
                    </button>
                    <button onClick={()=>scrollToRef(codeRef)}> 
                        <p className={activeSection === "code" ? "text-left mb-1 text-blue-600": "text-left mb-1"}>Code Analysis and Representation</p>
                    </button>
                    </div>
                </div>
            </div>
    </>);
}