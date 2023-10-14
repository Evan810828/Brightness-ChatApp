import ChatList from "./chatList/ChatList";
import ChatRoom from "./chatRoom/ChatRoom";


export default function ChatIndex(params) {
    return(
        <div className="flex flex-row">
            <ChatList />
            <ChatRoom />
        </div>
    )
}