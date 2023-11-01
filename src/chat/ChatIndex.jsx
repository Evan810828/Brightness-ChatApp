import { useEffect, useState } from "react";
import { docCookies } from "../components/header/cookie";
import ChatList from "./chatList/ChatList";
import ChatRoom from "./chatRoom/ChatRoom";


export default function ChatIndex(params) {
    const username = docCookies.getItem("username");

    const [chatList, setChatList] = useState(undefined);
    const base = "https://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com"

    const getChatList = () => {
        fetch(base+`/list/chatrooms/${username}`, {method: "GET"}).then(res => {
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
        if(chatList!==undefined){
        }

        getChatList();
    }, []);

    useEffect(() => {
        if (chatList && window.location.pathname === "/") {
            if (chatList.length > 0) {
                window.location.href = `/${chatList[0].roomName}`;
            }
        }
    }, [chatList]);

    return(
        <div className="pl-[60px] flex flex-row w-full h-screen fixed z-[-1]" >
            <ChatList chatList={chatList}/>
            {chatList && 
                chatList.length>0 ? <ChatRoom/> : <div className="bg-slate-100 m-4 rounded-lg text-xl relative flex items-center h-full w-full justify-center text-gray-400">You have not joined any room yet!</div>
            }
        </div>
    )
}