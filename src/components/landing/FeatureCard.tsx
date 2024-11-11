export const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <div className="bg-gray-600 p-4 rounded-xl">
        <h2 className="text-[20px] text-white font-bold">{title}</h2>
        <p className="mt-2 text-white">{description}</p>
      </div>
    </>
  );
};
