import { ClockLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[520px] text-center">
      <ClockLoader size={64} color={"#2563eb"} loading={true} />
    </div>
  );
};

export default Loading;
