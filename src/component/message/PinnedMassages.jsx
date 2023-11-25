import PinnedMassage from "./PinnedMassage";
import { pinnedMessages } from "../../data/message";

function PinnedMessages() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-health-recognition"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
            <path d="M4 16v2a2 2 0 0 0 2 2h2" />
            <path d="M16 4h2a2 2 0 0 1 2 2v2" />
            <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
            <path d="M8.603 9.61a2.04 2.04 0 0 1 2.912 0l.485 .39l.5 -.396a2.035 2.035 0 0 1 2.897 .007a2.104 2.104 0 0 1 0 2.949l-3.397 3.44l-3.397 -3.44a2.104 2.104 0 0 1 0 -2.95z" />
          </svg>

          <span className="text-base text-bgray-700 dark:text-white font-medium">
            Health Assistance
          </span>
        </div>
        <div>
          <button aria-label="none">
            <svg
              className="stroke-darkblack-400 dark:stroke-gray-50"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99984 12.1761C9.07936 12.1761 8.33317 11.4311 8.33317 10.5121C8.33317 9.59312 9.07936 8.84814 9.99984 8.84814C10.9203 8.84814 11.6665 9.59312 11.6665 10.5121C11.6665 11.4311 10.9203 12.1761 9.99984 12.1761Z"
                strokeWidth="1.5"
              />
              <path
                d="M16.6665 12.1761C15.746 12.1761 14.9998 11.4311 14.9998 10.5121C14.9998 9.59312 15.746 8.84814 16.6665 8.84814C17.587 8.84814 18.3332 9.59312 18.3332 10.5121C18.3332 11.4311 17.587 12.1761 16.6665 12.1761Z"
                strokeWidth="1.5"
              />
              <path
                d="M3.33317 12.1761C2.4127 12.1761 1.6665 11.4311 1.6665 10.5121C1.6665 9.59312 2.4127 8.84814 3.33317 8.84814C4.25365 8.84814 4.99984 9.59312 4.99984 10.5121C4.99984 11.4311 4.25365 12.1761 3.33317 12.1761Z"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <ul className="pt-2 divide-y divide-bgray-300 dark:divide-darkblack-400">
        {pinnedMessages?.map((pinned) => (
          <PinnedMassage key={pinned.id} pinnedMassage={pinned} />
        ))}
      </ul>
    </div>
  );
}

export default PinnedMessages;
