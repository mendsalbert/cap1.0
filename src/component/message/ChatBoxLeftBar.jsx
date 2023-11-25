import SidebarHeader from "./SidebarHeader";
// import PinnedMessages from "./PinnedMessages";
// PinnedMessages
import AllMessages from "./AllMessages";
import PinnedMessages from "./PinnedMassages";

function ChatBoxLeftBar() {
  return (
    <aside className="h-full 2xl:col-span-3 xl:col-span-4 lg:col-span-5 bg-white dark:bg-darkblack-600 border border-bgray-200 dark:border-darkblack-400 pr-7 pl-12 pt-6 pb-10 hidden lg:block">
      <SidebarHeader />
      <div className="pt-6">
        {/* Pinned Message  */}
        <PinnedMessages />
        {/* All Message  */}

        <AllMessages />
      </div>
    </aside>
  );
}

export default ChatBoxLeftBar;
