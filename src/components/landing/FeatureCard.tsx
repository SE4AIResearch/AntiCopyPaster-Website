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
        <h3 className="text-[20px] text-white font-bold">{title}</h3>
        <p className="mt-2 text-white">{description}</p>
      </div>
    </>
  );
};
