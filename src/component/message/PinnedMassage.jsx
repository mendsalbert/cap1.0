import Image from "next/image";
import ProtoTypes from "prop-types";
function PinnedMassage({ pinnedMassage }) {
  const { img, title, massage, time, isOnline, isTyping, status } =
    pinnedMassage;

  return (
    <li className="p-3.5 flex justify-between hover:bg-bgray-100 hover:dark:bg-darkblack-500 hover:rounded-lg transition-all cursor-pointer">
      <div className="flex space-x-3 grow">
        <div>
          <h4 className="text-xl font-bold text-bgray-900 dark:text-white">
            {title}
          </h4>
          <span
            className={`text-sm font-medium ${
              isTyping
                ? "text-success-300"
                : massage === "missed_call"
                ? "text-error-300"
                : " text-bgray-600 dark:text-bgray-50"
            }`}
          >
            {isTyping
              ? title.split(" ")[0] + " is Typing..."
              : massage === "missed_call"
              ? "Missed Call"
              : massage}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        {/* <span className="text-lg font-semibold text-bgray-700 dark:text-bgray-50">
          {time}
        </span> */}
      </div>
    </li>
  );
}

PinnedMassage.propTypes = {
  pinnedMassage: ProtoTypes.object,
};

export default PinnedMassage;
