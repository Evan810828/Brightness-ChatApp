import ChatList from "./chatList/ChatList";
import ChatRoom from "./chatRoom/ChatRoom";


export default function ChatIndex(params) {
    return(
        <div className="pl-[60px] flex flex-row bg-[#006DF0] w-full h-screen fixed z-[-1]" >
            <ChatList />
            <ChatRoom/>
        </div>
    )
}