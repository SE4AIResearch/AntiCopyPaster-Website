import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


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
export const ExtractMethodPage = () => {
    
    return (
           <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-3/4 p-10 pt-20">
                    <h1 className="page-header">Extract Method for Code Refactoring</h1>
                    <p className="page-lg-text mb-14">The Extract Method refactoring lets you take a code fragment that can be grouped, move it into a separated method, and replace the old code with a call to the method.</p>
                    <h2 className="page-sub-header my-2">Some of its main benefits include:</h2>
                    <ul className="list-disc pl-5 text-xl mb-14">
                        <li>Improve code quality</li>
                        <li>Extraction of reusable methods and eliminate code duplication</li>
                        <li>Wrapping older method signatures</li>
                        <li>Decomposition of long or complex code structures</li>
                        <li>Support of code testability</li>
                    </ul>
                    <p className="text-xl">Method extraction is one of the main refactorings that were defined when the study of refactoring was established, as it is a common response to the need of keeping methods concise and modular, and reducing the spread of shared responsibilities. The wide variety of usage scenarios shows why method extraction is considered the Swiss Army knife of refactoring operations.</p>
                    
                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>
                    <h2 className="page-sub-header">An Example of Extract Method Refactoring:</h2>
                    <p className="text-xl my-[35px]">Consider this getNext() method with two overloads:</p>
                    <div className="w-[100%] sm:w-[80%] mx-auto border border-1 shadow-lg rounded-lg object-contain">
                        <SyntaxHighlighter 
                            language="java" 
                            style={docco}
                            className="p-4 rounded-md bg-gray-900 text-white text-sm sm:text-base"

                            >
                            {getNextBeforeRefactor}
                        </SyntaxHighlighter>
                    </div>
                    <p className="text-xl my-[35px]">After refactoring using Extract Method:</p>
                    <div className="w-[100%] sm:w-[80%] mx-auto border border-1 shadow-lg rounded-lg object-scale-down">
                        <SyntaxHighlighter 
                            language="java" 
                            style={docco}
                            className="p-4 rounded-md bg-gray-900 text-white text-sm sm:text-base"    
                        >
                            {getNextAfterRefactor}
                        </SyntaxHighlighter>
                    </div>
                    <p className="text-xl my-[75px]">In this example, the two getNext methods have different parameter data types, but similar method signatures. After running Extract Method, the similar method signatures are extracted into a single, newly generated method, genericGetNext, which abstracts the parameter type, and then is called within each of the two getNext methods. </p>
                    <hr className="border-t-2 border-gray-300 mt-[100px] mb-[75px] w-[65%] mx-auto"/>

                    <p className="text-xl mt-[75px] mb-[100px] italic">Extract Method refactoring is often difficult to apply in practice due to the low-level code changes it requires. Additionally, existing methods primarily focus on automating the refactoring process rather than recommending opportunities to apply it. As a result, various research projects have aimed to bridge this gap by developing techniques to identify and recommend refactoring opportunities.</p>
                   
                    <h1 className="page-header">Systematic Literature Review on Current Extract Method Refactoring Research</h1>
                    <p className="page-lg-text">We conducted the study, Behind the Intent of Extract Method Refactoring: A Systematic Literature Review, to gain more insight on historical and current research and advancements surrounding Extract Method code refactoring. This systematic literature review captures meaningful statistics from 83 primary studies, focusing on 3 main Extract Method categories: <strong>Code Clones</strong>, <strong>Long Methods</strong>, and <strong>Separation of Concerns</strong>.</p>

                </div>

                <div className="w-1/4 h-[100vh] sticky top-0 bg-slate-200 p-4 hidden sm:block">
                    <p>On this page</p>
                </div>
            </div>
    );
}