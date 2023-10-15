import ChatList from "./chatList/ChatList";
import ChatRoom from "./chatRoom/ChatRoom";


export default function ChatIndex(params) {
    return(
        <div className=" pl-20 flex flex-row " >
            <ChatList />
            <ChatRoom/>
        </div>
    )
}