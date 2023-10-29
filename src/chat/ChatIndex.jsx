import { docCookies } from "../components/header/cookie";
import ChatList from "./chatList/ChatList";
import ChatRoom from "./chatRoom/ChatRoom";


export default function ChatIndex(params) {
    const username = docCookies.getItem("username");


    return(
        <div className="pl-[60px] flex flex-row w-full h-screen fixed z-[-1]" >
            <ChatList username={username}/>
            <ChatRoom/>
        </div>
    )
}