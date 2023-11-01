import { Avatar, Image, Input } from '@douyinfe/semi-ui';
import { IconEmoji, IconLikeThumb, IconDislikeThumb, IconEdit,IconCheckboxTick,IconDelete } from '@douyinfe/semi-icons';
import { docCookies } from '../../components/header/cookie';
import React, { useEffect, useState,useRef  } from 'react';
import Admin from './admin';
import { avatarLinks } from "../../components/avatar";
import { replaceURLs } from "../../components/linkFomatter";
import EmojiPanel from '../../components/emoji';
import { formatTimestamp } from '../../components/timeFomatter';

export default function ChatRoom(params) {
    const [timer, setTimer] = useState(0);
    const [chatData, setChatData] = useState([]);
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
    const [adminStatus, setAdminStatus] = useState(false);
    const [emojiPanel, setEmojiPanel] = useState(false);
    const [userData, setUserData] = useState(null);

    const connection = useRef(null)
    const scrollRef = useRef(null);
    const base = "https://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com"

    const scrollToBottom = () => {
        const el = scrollRef.current;
        if (el) {
        el.scrollTop = el.scrollHeight;
        }
    };
    const getUserInfo = () => {
        fetch(base+`/user/${username}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setUserData(data);
            }
        });
    }
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
    const deleteMessage = (i) => {
        fetch(base+`/chatroom/message/${roomName}_${chatData[i].msgID}`, {method:"DELETE"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
            }
        });
        const newItems = chatData.filter((_, index) => index !== i);
        setChatData(newItems);
        
    }
    const onEdit = () => {
        let temp = chatData;
        temp[editIndex].content = inputValue;
        setChatData(temp);
        fetch(base+`/chatroom/message/${temp[editIndex].msgID}`, {method:"POST", body: JSON.stringify({
            roomName: roomName,
            message: inputValue
          })
        })
        document.getElementById(editIndex+"m").classList.remove("!bg-blue-300");
        setInputValue("");
        setMode("message");
    }

    const onLike = (i) => {
        let temp = chatData;
        let obj = {username:username,avatar:userData.avatar}
        let bol = true;
        for(const like of temp[i].likes){
            if(like.username === obj.username && like.avatar === obj.avatar){
                bol = false;
            }
        }
        if(bol){
            temp[i].likes.push({username:username,avatar:userData.avatar});
            setChatData(temp);
        }
        fetch(base+`/chatroom/message/reaction/${temp[i].msgID}`, {method:"POST", body: JSON.stringify({
            username: username,
            roomName: roomName,
            reactionType: "like"
          })
        })
        setTimer(timer+1);
    }

    const getRoomDetails = () => {
        fetch(base+`/chatroom/details/${roomName}`, {method:"GET"}).then(res => {
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
        fetch(base+`/list/chatroom/message/${roomName}/${username}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setChatData(data.messages)
            }
        });
    }

    let sendMessage = () => {
        connection.current.send(inputValue)
        fetch(base+`/chatroom/message`, {method:"POST", body: JSON.stringify({
            username: username,
            roomName: roomName,
            message: inputValue
          })
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        setInputValue("");
    }

    const updateChat = (messageObject) => {

        if(messageObject&&messageObject.senderName === username){
            messageObject.check = true;
        }
       if(messageObject){
           setChatData([
               ...chatData,
               messageObject
           ])
       }
    }
    
    const createSocketConnection = () => {
        const ws = new WebSocket("wss://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com/chatapp?roomName="+roomName+"&username="+username);
        ws.onopen = (event) => {
            connection.current = ws
        };
        ws.onmessage =  (event) => {
            const json = JSON.parse(event.data);
            
            setLastMessage(json)
        };
        ws.onclose = (event) => {
            createSocketConnection()
        }
    }
    
    const getAdminStatus = () => {
        if(roomDetails){
            fetch(base+`/chatroom/admin/${roomDetails.roomName}`, {method:"GET"}).then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then(data => {
                if (data) {
                    if(data.username === docCookies.getItem("username")){
                        setAdminStatus(true);
                    } else {
                        setAdminStatus(false);
                    }
                }
            });
        }
    }

    const handleEmojiClick = (emoji) => {
        setInputValue(inputValue=>(inputValue + emoji))
        setEmojiPanel(false)
    }

    useEffect(() => {
        getRoomDetails();
        getChatHistory();
        getUserInfo();
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

    useEffect(() => {
        getAdminStatus();
    }, [roomDetails]);

    
    document.onkeydown = function (event_e){
        if(window.event){
            event_e = window.event;
        }
        var int_keycode = event_e.charCode || event_e.keyCode;
        if(int_keycode == '13'){
            if (mode === "message") {
                sendMessage()
            } else onEdit()
        }
    }

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
                            {/* <div className='flex w-full justify-center mt-2'>
                                <div className='bg-slate-300 text-white w-max px-2 rounded-lg text-sm'>11:20</div>
                            </div> */}
                            {chatData.map((item, i) => {
                                if(item.status === 1){
                                    return (<div className='px-12 py-4 flex w-full justify-center' ><div className='max-w-[700px] bg-gray-300 px-3 pt-1 pb-2 rounded-lg text-sm font-light'>{replaceURLs(item.content)}</div></div>)

                                }
                                else if(item.status === 0){
                                    return item.senderName !== username ?
                                    (
                                        <div key={i} className='px-12 py-4 flex w-full items-start' onMouseOver={()=>{changeContextShow(i, "block")}} onMouseOut={()=>{changeContextShow(i, "none")}}>
                                            <div className='flex'>
                                                <Avatar src={avatarLinks[item.avatar]} onClick={()=>window.location.href=`/profile/${item.senderName}`}/>
                                                <div className='ml-2'>
                                                    <div className='flex '>
                                                        <div className='ml-1 text-sm mb-1'>{item.senderName}</div>
                                                        <div className='ml-3 text-slate-400 text-sm'>{formatTimestamp(item.timestamp)}</div>
                                                    </div>
                                                    <div className='max-w-[400px] w-max bg-white px-3 pt-1 pb-2 rounded-lg text-sm font-light'>{replaceURLs(item.content)}</div>
                                                    {chatData[i].likes && chatData[i].likes.length > 0 ? 
                                                        <div className='px-2 py-2 bg-slate-100 text-sm w-max'>
                                                            <div className='flex justify-between'>
                                                                <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl mr-3'/> 
                                                                {chatData[i].likes.map((item1,i1) => {
                                                                    return <Avatar className='!w-[1.5rem] !h-[1.5rem]' src={avatarLinks[item1.avatar]} />
                                                                })}
                                                            </div>
                                                        </div> 
                                                    : null}
                                                </div>
                                            </div>
                                            <div className='relative h-min bg-white shadow-lg rounded px-2 pt-2 pb-1 left-2 hidden' id={i}>
                                                <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl' onClick={()=>{onLike(i)}} />
                                                {adminStatus&&<IconDelete className='!text-blue-400 hover:scale-[1.2] cursor-pointer !text-xl ml-3' onClick ={()=>{deleteMessage(i)}} />}
                                            </div>
                                        </div>
                                    ) :
                                    (
                                        <div key={i} className='px-12 py-4 flex w-full justify-end' onMouseOver={()=>{changeContextShow(i, "block")}} onMouseOut={()=>{changeContextShow(i, "none")}}>
                                            <div className='relative h-min bg-white shadow-lg rounded px-2 pt-2 pb-1 right-2 hidden' id={i}>
                                                <IconEdit className='hover:scale-[1.2] cursor-pointer !text-xl' onClick={()=>{editMessage(i)}} />
                                                <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl ml-3' onClick={()=>{onLike(i)}} />
                                                {adminStatus&&<IconDelete className='!text-blue-400 hover:scale-[1.2] cursor-pointer !text-xl ml-3' onClick ={()=>{deleteMessage(i)}} />}
                                            </div>
                                            <div className='flex'>
                                                <div className='mr-2 w-max items-edn'>
                                                    <div className='flex '>
                                                        <div className='ml-1 text-slate-400 text-sm'>{formatTimestamp(item.timestamp)}</div>
                                                        <div className='ml-3 text-sm mb-1'>{item.senderName}</div>
                                                    </div>
                                                    <div className='w-full flex justify-end'>
                                                        {item.check ?<div className='flex flex-col flex-col-reverse'>
                                                            <IconCheckboxTick />
                                                        </div> :  null}
                                                        <div id={i+"m"} className='max-w-[300px] bg-white px-3 pt-1 pb-2 rounded-lg text-sm font-light w-max'>{replaceURLs(item.content)}</div>
                                                    </div>
                                                    <div className='w-full flex justify-end'>
                                                        {chatData[i].likes && chatData[i].likes.length > 0 ? 
                                                            <div className='px-2 py-2 bg-slate-100 text-sm w-max'>
                                                                <div className='flex '>
                                                                    <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl mr-3' /> 
                                                                    {chatData[i].likes.map((item1,i1) => {
                                                                        return <Avatar className='!w-[1.5rem] !h-[1.5rem]' src={avatarLinks[item1.avatar]} />
                                                                    })}
                                                                </div>
                                                            </div> 
                                                        : null}
                                                    </div>
                                                </div>
                                                <Avatar src={avatarLinks[item.avatar]} onClick={()=>window.location.href=`/profile/${item.senderName}`}  />
                                            </div>
                                        </div>
                                    )
                                }
                                else{
                                    return item.senderName !== username ?
                                    (
                                        <div key={i} className='px-12 py-4 flex w-full items-start' onMouseOver={()=>{changeContextShow(i, "block")}} onMouseOut={()=>{changeContextShow(i, "none")}}>
                                            <div className='flex'>
                                                <Avatar src={avatarLinks[item.avatar]} onClick={()=>window.location.href=`/profile/${item.senderName}`}/>
                                                <div className='ml-2'>
                                                    <div className='flex '>
                                                        <div className='ml-1 text-sm mb-1'>{item.senderName}</div>
                                                        <div className='ml-3 text-slate-400 text-sm'>{formatTimestamp(item.timestamp)}</div>
                                                    </div>
                                                    <div className='max-w-[300px] bg-white px-3 pt-1 pb-2 rounded-lg text-sm  text-red-500 font-bold'>{replaceURLs(item.content)}</div>
                                                    {chatData[i].likes && chatData[i].likes.length > 0 ? 
                                                        <div className='px-2 py-2 bg-slate-100 text-sm w-max'>
                                                            <div className='flex '>
                                                                <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl mr-3'/> 
                                                                {chatData[i].likes.map((item1,i1) => {
                                                                    return <Avatar className='!w-[1.5rem] !h-[1.5rem]' src={avatarLinks[item1.avatar]} />
                                                                })}
                                                            </div>
                                                        </div> 
                                                    : null}
                                                </div>
                                            </div>
                                            <div className='relative h-min bg-white shadow-lg rounded px-2 pt-2 pb-1 left-2 hidden' id={i}>
                                                <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl mr-3' onClick={()=>{onLike(i)}} />
                                                {adminStatus&&<IconDelete className='!text-blue-400 hover:scale-[1.2] cursor-pointer !text-xl' onClick ={()=>{deleteMessage(i)}} />}
                                            </div>
                                        </div>
                                    ) :
                                    (
                                        <div key={i} className='px-12 py-4 flex w-full justify-end' onMouseOver={()=>{changeContextShow(i, "block")}} onMouseOut={()=>{changeContextShow(i, "none")}}>
                                            <div className='relative h-min bg-white shadow-lg rounded px-2 pt-2 pb-1 right-2 hidden' id={i}>
                                                <IconEdit className='hover:scale-[1.2] cursor-pointer !text-xl' onClick={()=>{editMessage(i)}} />
                                                {adminStatus&&<IconDelete className='!text-blue-400 hover:scale-[1.2] cursor-pointer !text-xl ml-3' onClick ={()=>{deleteMessage(i)}} />}
                                                <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl ml-3' onClick={()=>{onLike(i)}} />
                                            </div>
                                            <div className='flex'>
                                                <div className='mr-2 w-max items-edn'>
                                                    <div className='flex w-full justify-end'>
                                                        <div className='ml-1 text-slate-400 text-sm'>{formatTimestamp(item.timestamp)}</div>
                                                        <div className='ml-3 text-sm mb-1'>{item.senderName}</div>
                                                    </div>
                                                    <div className='w-full flex justify-end'>
                                                        {item.check ?<div className='flex flex-col flex-col-reverse'>
                                                            <IconCheckboxTick />
                                                        </div> :  null}
                                                        <div id={i+"m"} className='max-w-[300px] bg-white px-3 pt-1 pb-2 rounded-lg text-sm  w-max text-red-500 font-bold'>{replaceURLs(item.content)}</div>
                                                    </div>
                                                    <div className='w-full flex justify-end'>
                                                        {chatData[i].likes && chatData[i].likes.length > 0 ? 
                                                            <div className='px-2 py-2 bg-slate-100 text-sm w-max'>
                                                                <div className='flex '>
                                                                    <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl mr-3' /> 
                                                                    {chatData[i].likes.map((item1,i1) => {
                                                                        return <Avatar className='!w-[1.5rem] !h-[1.5rem]' src={avatarLinks[item1.avatar]} />
                                                                    })}
                                                                </div>
                                                            </div> 
                                                        : null}
                                                    </div>
                                                </div>
                                                <Avatar src={avatarLinks[item.avatar]} onClick={()=>window.location.href=`/profile/${item.senderName}`}  />
                                            </div>
                                        </div>
                                    )
                                }
                                
                            })}
                        </div>
                        <div className='fixed w-full rounded-sm border h-[7vh] bottom-0 flex items-center px-6 py-2'>
                            <div className='w-16 h-10 rounded-lg hover:bg-slate-100 h-full flex items-center justify-center mr-2'>
                                {emojiPanel&&
                                    <div className='absolute bottom-12'>
                                        <EmojiPanel handleEmojiClick={handleEmojiClick} />
                                    </div>
                                }
                                <IconEmoji className='text-yellow-300 !text-xl cursor-pointer' onClick={()=>{setEmojiPanel(!emojiPanel)}} />
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