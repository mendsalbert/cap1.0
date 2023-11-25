import ChatBoxLeftBar from "@/component/message/ChatBoxLeftBar";
import AllMessageRes from "@/component/message/AllMessageRes";
import Conversions from "@/component/message/Conversions";

function Inbox() {
  return (
    <>
      <ChatBoxLeftBar />
      <AllMessageRes />
      <Conversions />
    </>
  );
}

export default Inbox;
