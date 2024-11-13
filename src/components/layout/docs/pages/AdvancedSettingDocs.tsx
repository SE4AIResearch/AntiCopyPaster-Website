import StatisticalSettingPreview from "../../../../assets/statistical-setting-preview.webp";
import AdvancedSettingPreview from "../../../../assets/advanced-setting-preview.webp";
import ClusteringSettingPreview from "../../../../assets/clustering-setting-preview.webp";

export const AdvancedSettingDocs = () => {
  return (
    <div className="flex flex-col">
      <h1 className="docs-header">Advanced Setting</h1>
      <h2 className="docs-sub-header text-center">Clustering Settings</h2>
      <img
        className="self-center lg:min-w-[600px] w-[100%]"
        alt="advanced-setting-preview"
        src={ClusteringSettingPreview}
      />
      <h2 className="docs-sub-header text-center">Advanced Settings</h2>
      <img
        className="self-center w-[100%] max-w-[750px]"
        alt="advanced-setting-preview"
        src={AdvancedSettingPreview}
      />
      <p className="mt-4 text-md">
        In the advanced settings dialog of the configuration menu of
        AntiCopyPaster, you can customize the makeup of each of the four major
        metrics by which the plugin evaluates whether to extract a copied
        segment of code.
      </p>
      <h2 className="docs-sub-header text-center">
        Statistics Collection Settings
      </h2>
      <img
        className="self-center w-[100%] max-w-[550px]"
        alt="statistical-setting-preview"
        src={StatisticalSettingPreview}
      />
      <p className="text-md mt-4">
        By entering sufficient credentials, and upon startup of the IntelliJ
        IDE, AntiCopyPaster will automatically retrieve and save certain user
        statistics to a remote database.
      </p>
      <h3 className="text-md mt-2 font-bold">Privacy</h3>
      <ul className="list-inside point list-disc">
        <li>No personal information is included in the saved data.</li>
        <li>
          Each project's statistics are identified only by a randomly generated
          project ID that is saved locally. (No saved information links a user
          to any project.)
        </li>
      </ul>
      <h3 className="text-md mt-4 font-bold">What statistics are saved?</h3>
      <ul className="list-inside point list-disc">
        <li>copy events</li>
        <li>paste events</li>
        <li>notification triggers</li>
        <li>accepted refactorings</li>
        <li>rejected refactorings</li>
      </ul>
      <h3 className="text-md mt-4 font-bold">
        Why is this data being collected?
      </h3>
      <p>
        This data allows for AntiCopyPaster's developers to evaluate how the
        plugin is being used and to make it more useful and user-friendly in the
        future.
      </p>
    </div>
  );
};
