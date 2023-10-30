import { useEffect, useState } from "react";
import { docCookies } from "../components/header/cookie";
import ChatList from "./chatList/ChatList";
import ChatRoom from "./chatRoom/ChatRoom";


export default function ChatIndex(params) {
    const username = docCookies.getItem("username");

    const [chatList, setChatList] = useState(undefined);

    const getChatList = () => {
        fetch(`/list/chatrooms/${username}`, {method: "GET"}).then(res => {
            if(res.status === 200){
                return res.json();
            }
        }).then(data => {
            if (data) {
                setChatList(data.rooms);
            }
        });
    }

    useEffect(() => {
        getChatList();
    }, []);

    useEffect(() => {
        if (chatList && window.location.pathname === "/") {
            window.location.href = `${chatList[0].roomName}`
        }
    }, [chatList]);

    return(
        <div className="pl-[60px] flex flex-row w-full h-screen fixed z-[-1]" >
            <ChatList chatList={chatList}/>
            <ChatRoom/>
        </div>
    )
}