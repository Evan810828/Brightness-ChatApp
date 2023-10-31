import { Avatar, Image, Input } from '@douyinfe/semi-ui';
import { IconEmoji, IconLikeThumb, IconDislikeThumb, IconEdit,IconCheckboxTick } from '@douyinfe/semi-icons';
import { docCookies } from '../../components/header/cookie';
import React, { useEffect, useState,useRef  } from 'react';
import Admin from './admin';
import { avatarLinks } from "../../components/avatar";

let data = [
    {
        senderName: "Akutar Banana",
        avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
        message: "Hey, did you attend Prof. Mack's lecture today?",
        time: "Yesterday",
        reactList: [],
    },
    {
        senderName: "Mark",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj_UkBWZBjd-K5TxEQuPAUd6Gj7BKFBsR49A&usqp=CAU',
        content: "Not today, unfortunately. Had a meeting.",
        time: "Yesterday",
        yours: false,
        reactList: [],
    },
    {
        senderName: "Anna",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-3H6IHZNPQv3QBicSDtkTtsErOzQj1NrZNw&usqp=CAU',
        content: "You guys missed out. It was really interesting!",
        time: "Yesterday",
        reactList: [],
    },
    {
        senderName: "Akutar Banana",
        avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
        content: <p>Don't worry, I got the link for the recording! 
            <a className='hover:underline text-blue-500 cursor-pointer hover:underline-offset-2 ml-1' href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
                https://www.youtube.com/watch?v=dQw4w9WgXcQ
            </a></p>,
        time: "Yesterday",
        reactList: [],
    },
    {
        senderName: "Mark",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj_UkBWZBjd-K5TxEQuPAUd6Gj7BKFBsR49A&usqp=CAU',
        content: "Bummer. Could you share the notes?",
        time: "Yesterday",
        reactList: [],
    },
    {
        senderName: "Lucy",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXM5VoIfvhRC2p7byLim5MD2WNIYW949cEIg&usqp=CAU',
        content: "I have the notes. I'll share them with you both.",
        time: "Yesterday",
        yours: false,
        reactList: [],
    },
    {
        senderName: "Mark",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj_UkBWZBjd-K5TxEQuPAUd6Gj7BKFBsR49A&usqp=CAU',
        content: "Thanks, Lucy!",
        time: "Yesterday",
        reactList: [],
    },
    {
        senderName: "Sophie",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wvt48MJrdhdoESZm1YX_N9ext4H4IxE0uA&usqp=CAU',
        content: "Anyone attending the rock concert tonight?",
        time: "Yesterday",
        yours: false,
        reactList: [],
    },
    {
        senderName: "Isabella",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK2sdSvFkSyfHsmwmhC4uAYymBGFYTsY4i4A&usqp=CAU',
        content: "I am! Excited for it.",
        time: "Yesterday",
        reactList: [],
    },
    {
        senderName: "Akutar Banana",
        avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
        content: "Count me in too!",
        time: "Yesterday",
        reactList: [],
    },
    {
        senderName: "Emma",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuFzAIR675Zc4LuhA3P2bVCgE6zKcgJIu50Q&usqp=CAU',
        content: "I wish I could, but I have a prior commitment.",
        time: "Yesterday",
        reactList: [],
    },
    {
        senderName: "Akutar Banana",
        avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
        content: "No worries, Emma. Next time!",
        time: "Yesterday",
        reactList: [],
    }
];

export default function ChatRoom(params) {
    const [timer, setTimer] = useState(0);
    const [chatData, setChatData] = useState(data);
    const [visible, setVisible] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [mode, setMode] = useState("message");
    const [editIndex, setEditIndex] = useState(-1);
    const [roomDetails, setRoomDetails] = useState(undefined);
    const [messageHistory, setMessageHistory] = useState();
    const [messageUpdated,setMessageUpdated] = useState(true);
    const [lastMessage,setLastMessage] = useState();
    const roomName = window.location.pathname.split('/')[1];
    const username = docCookies.getItem("username");
    const connection = useRef(null)
    const scrollRef = useRef(null);

    const scrollToBottom = () => {
        const el = scrollRef.current;
        if (el) {
        el.scrollTop = el.scrollHeight;
        }
    };

    const change = () => {
        setVisible(!visible);
    };

    const changeContextShow = (i, value) => {
        document.getElementById(i).style.display = value;
    }

    const editMessage = (i) => {
        setInputValue(chatData[i].content);
        document.getElementById(i+"m").classList.add("!bg-blue-300");
        setMode("edit");
        setEditIndex(i);
    }

    const onEdit = () => {
        let temp = chatData;
        temp[editIndex].content = inputValue;
        setChatData(temp);
        document.getElementById(editIndex+"m").classList.remove("!bg-blue-300");
        setInputValue("");
        setMode("message");
    }

    const onLike = (i) => {
        let temp = chatData;
        temp[i].reactList.push("like");
        setChatData(temp);
        setTimer(timer+1);
    }

    const getRoomDetails = () => {
        fetch(`/chatroom/details/${roomName}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setRoomDetails(data);
            }
        });
    }

    const getChatHistory = () => {
        fetch(`/list/chatroom/message/${roomName}/${username}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                console.log(data)
                setChatData(data.messages)
                console.log(chatData)
            }
        });
    }

    let sendMessage = () => {
        connection.current.send(inputValue)
        fetch(`/chatroom/message`, {method:"POST", body: JSON.stringify({
            username: username,
            roomName: roomName,
            message: inputValue
          })
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
    }

    const updateChat = (messageObject) => {

        console.log(chatData)
        if(messageObject&&messageObject.senderName === username){
            messageObject.check = true;
        }
       if(messageObject){
           setChatData([
               ...chatData,
               messageObject
           ])
       }
        console.log(chatData)
    }
    
    const createSocketConnection = () => {
        const ws = new WebSocket("wss://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com/chatapp?roomName="+roomName+"&username="+username);
        ws.onopen = (event) => {
            connection.current = ws
            console.log(connection.current)
        };
        ws.onmessage =  (event) => {
            const json = JSON.parse(event.data);
            
            setLastMessage(json)
        };
        ws.onclose = (event) => {
            createSocketConnection()
        }
    }

    useEffect(() => {
        getRoomDetails();
        getChatHistory();
        if(connection.current===null){
            createSocketConnection()
        }
    }, []);
    
    useEffect(()=>{
        updateChat(lastMessage)
    },[lastMessage])

    useEffect(() => {
        scrollToBottom();
    }, [chatData]); 

    return (
        <div  className="flex flex-row w-full h-[100%] pl-3">
            {roomDetails&& <div className="w-full h-[100%] pl-3">
                <div className='flex flex-col w-full bg-white w-full'>
                    <div className='flex items-center h-[9vh] border justify-between'>
                        <div className='w-max text-xl mx-5 flex items-center'>
                            <Image className="w-[40px] h-[40px] !rounded-[25px] mr-4 border-[1px]" src={require('../../chatBackground.jpg')} />
                            <div>{roomDetails.roomName}</div>
                        </div>
                        <div className="h-full text-2xl mx-5 mt-3 cursor-pointer hover:text-slate-500 hover:scale-[1.2]" onClick={change}>...</div>
                        {visible ? null : <Admin roomDetails={roomDetails} />}
                    </div>
                    <div  className='flex flex-col h-screen bg-chat'>
                        <div  ref={scrollRef} className='flex  flex-col h-[84vh] overflow-y-auto py-2 bg-[#F1F1F1]'>
                            <div className='flex w-full justify-center mt-2'>
                                <div className='bg-slate-300 text-white w-max px-2 rounded-lg text-sm'>11:20</div>
                            </div>
                            {chatData.map((item, i) => {
                                return item.senderName !== username ?
                                (
                                    <div key={i} className='px-12 py-4 flex w-full items-start' onMouseOver={()=>{changeContextShow(i, "block")}} onMouseOut={()=>{changeContextShow(i, "none")}}>
                                        <div className='flex'>
                                            <Avatar src={avatarLinks[item.avatar]} onClick={()=>window.location.href=`/profile/${item.senderName}`}/>
                                            <div className='ml-2'>
                                                <div className='ml-1 text-sm mb-1'>{item.senderName}</div>
                                                <div className='bg-white px-3 pt-1 pb-2 rounded-lg text-sm font-light'>{item.content}</div>
                                                {/* {chatData[i].reactList.length > 0 ? 
                                                    <div className='px-2 py-2 bg-slate-100 text-sm w-max'>
                                                        <div className='flex '>
                                                            <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl mr-3'/> 
                                                            <Avatar className='!w-[1.5rem] !h-[1.5rem]' src="https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp" />
                                                        </div>
                                                    </div> 
                                                : null} */}
                                            </div>
                                        </div>
                                        <div className='relative h-min bg-white shadow-lg rounded px-2 pt-2 pb-1 left-2 hidden' id={i}>
                                            <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl mr-3' onClick={()=>{onLike(i)}} />
                                            <IconDislikeThumb className='!text-blue-400 hover:scale-[1.2] cursor-pointer !text-xl' />
                                        </div>
                                    </div>
                                ) :
                                (
                                    <div key={i} className='px-12 py-4 flex w-full justify-end' onMouseOver={()=>{changeContextShow(i, "block")}} onMouseOut={()=>{changeContextShow(i, "none")}}>
                                        <div className='relative h-min bg-white shadow-lg rounded px-2 pt-2 pb-1 right-2 hidden' id={i}>
                                            <IconEdit className='hover:scale-[1.2] cursor-pointer !text-xl mr-3' onClick={()=>{editMessage(i)}} />
                                            <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl mr-3' onClick={()=>{onLike(i)}} />
                                            <IconDislikeThumb className='!text-blue-400 hover:scale-[1.2] cursor-pointer !text-xl' />
                                        </div>
                                        <div className='flex'>
                                            
                                            {item.check ?<div className='flex flex-col flex-col-reverse'>
                                            <IconCheckboxTick />
                                            </div> :  null}
                                            <div className='mr-2 w-max items-edn'>
                                                <div className='ml-1 text-sm mb-1 text-right'>{item.senderName}</div>
                                                <div id={i+"m"} className='bg-white px-3 pt-1 pb-2 rounded-lg text-sm font-light w-max'>{item.content}</div>
                                                {/* {chatData[i].reactList.length > 0 ? 
                                                    <div className='px-2 py-2 bg-slate-100 text-sm w-max'>
                                                        <div className='flex '>
                                                            <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl mr-3' /> 
                                                            <Avatar className='!w-[1.5rem] !h-[1.5rem]' src="https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp" />
                                                        </div>
                                                    </div> 
                                                : null} */}
                                            </div>
                                            <Avatar src={avatarLinks[item.avatar]} onClick={()=>window.location.href=`/profile/${item.senderName}`}  />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='fixed w-full rounded-sm border h-[7vh] bottom-0 flex items-center px-6 py-2'>
                            <div className='w-16 h-10 rounded-lg hover:bg-slate-100 h-full flex items-center justify-center mr-2'>
                                <IconEmoji className='text-yellow-300 !text-xl' />
                            </div>
                            <div>
                                <Input value={inputValue} onChange={(e)=>{setInputValue(e)}} className='md:!w-[60vw]' placeholder='Type a message' onMouseOver={null}></Input>
                            </div>
                            <div>
                                <button 
                                    className='bg-blue-400 text-white px-2 py-1 rounded-sm text-sm ml-2 hover:text-blue-500 hover:bg-white hover:scale-[1.2]'
                                    onClick={()=>{if (mode === "message") {
                                        sendMessage()
                                    } else onEdit()}}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}