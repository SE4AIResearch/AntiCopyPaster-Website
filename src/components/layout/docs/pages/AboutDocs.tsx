export const AboutDocs = () => {
  return (
    <div className="flex flex-col">
      <h1 className="docs-header">About</h1>
      <p className="mt-2">
        This research on Extract Method Refactoring, along with the
        implementation of the code duplicates refactoring extraction tool was
        performed by the faculty and students of Stevens Institute of Technology
        and Rochester Institute of Technology in collaboration with JetBrains
        Research.
      </p>
      <h2 className="mt-4 text-[22px] font-semibold">
        Extract Method Research
      </h2>
      <p>
        Provided below are supplements to the original research on extract
        method refactoring that was performed using AntiCopyPaster.
      </p>
      <div className="mt-2">
        <h3 className="docs-sub-header">Experiment Data:</h3>
        <p>
          The data collected for our experiments has been made available on our
          website. The dataset also includes details on the project's and
          metrics. Also made available are the Convolutional Neural Network
          (CNN) used in our study's precision and recall experiment.
        </p>
        <h3 className="docs-sub-header">Code Metrics:</h3>
        <p>
          The goal of selecting metrics is to identify patterns in their values
          to allow distinguishing between the two classes of fragments. In
          total, we selected 78 metrics that can be divided into four main
          categories: Keywords, Design Size, Complexity, and Coupling. The list
          of metrics is available here [to be replaced with the web page that
          will be linked to the advanced setting].
        </p>
        <h3 className="docs-sub-header">Tool Correctness:</h3>
        <p>
          AntiCopyPaster is able to correctly extract code duplicates with a
          precision score of 82% and a recall score of 82% with an average
          F-score of 82%.
        </p>
      </div>
    </div>
  );
};
