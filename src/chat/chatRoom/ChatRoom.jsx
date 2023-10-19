import { Avatar, Image, Input } from '@douyinfe/semi-ui';
import { IconEmoji, IconLikeThumb, IconDislikeThumb, IconEdit } from '@douyinfe/semi-icons';
import React, { useState } from 'react';
import Admin from './admin';

let data = [
    {
        id: "Akutar Banana",
        avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
        message: "Hey, did you attend Prof. Mack's lecture today?",
        time: "Yesterday",
        yours: true,
        reactList: [],
    },
    {
        id: "Mark",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj_UkBWZBjd-K5TxEQuPAUd6Gj7BKFBsR49A&usqp=CAU',
        message: "Not today, unfortunately. Had a meeting.",
        time: "Yesterday",
        yours: false,
        reactList: [],
    },
    {
        id: "Anna",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-3H6IHZNPQv3QBicSDtkTtsErOzQj1NrZNw&usqp=CAU',
        message: "You guys missed out. It was really interesting!",
        time: "Yesterday",
        yours: false,
        reactList: [],
    },
    {
        id: "Akutar Banana",
        avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
        message: <p>Don't worry, I got the link for the recording! 
            <a className='hover:underline text-blue-500 cursor-pointer hover:underline-offset-2 ml-1' href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
                https://www.youtube.com/watch?v=dQw4w9WgXcQ
            </a></p>,
        time: "Yesterday",
        yours: true,
        reactList: [],
    },
    {
        id: "Mark",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj_UkBWZBjd-K5TxEQuPAUd6Gj7BKFBsR49A&usqp=CAU',
        message: "Bummer. Could you share the notes?",
        time: "Yesterday",
        yours: false,
        reactList: [],
    },
    {
        id: "Lucy",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXM5VoIfvhRC2p7byLim5MD2WNIYW949cEIg&usqp=CAU',
        message: "I have the notes. I'll share them with you both.",
        time: "Yesterday",
        yours: false,
        reactList: [],
    },
    {
        id: "Mark",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj_UkBWZBjd-K5TxEQuPAUd6Gj7BKFBsR49A&usqp=CAU',
        message: "Thanks, Lucy!",
        time: "Yesterday",
        yours: false,
        reactList: [],
    },
    {
        id: "Sophie",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wvt48MJrdhdoESZm1YX_N9ext4H4IxE0uA&usqp=CAU',
        message: "Anyone attending the rock concert tonight?",
        time: "Yesterday",
        yours: false,
        reactList: [],
    },
    {
        id: "Isabella",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK2sdSvFkSyfHsmwmhC4uAYymBGFYTsY4i4A&usqp=CAU',
        message: "I am! Excited for it.",
        time: "Yesterday",
        yours: false,
        reactList: [],
    },
    {
        id: "Akutar Banana",
        avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
        message: "Count me in too!",
        time: "Yesterday",
        yours: true,
        reactList: [],
    },
    {
        id: "Emma",
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuFzAIR675Zc4LuhA3P2bVCgE6zKcgJIu50Q&usqp=CAU',
        message: "I wish I could, but I have a prior commitment.",
        time: "Yesterday",
        yours: false,
        reactList: [],
    },
    {
        id: "Akutar Banana",
        avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
        message: "No worries, Emma. Next time!",
        time: "Yesterday",
        yours: true,
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

    const change = () => {
        setVisible(!visible);
    };

    const changeContextShow = (i, value) => {
        document.getElementById(i).style.display = value;
    }

    const editMessage = (i) => {
        setInputValue(data[i].message);
        document.getElementById(i+"m").classList.add("!bg-blue-300");
        setMode("edit");
        setEditIndex(i);
    }

    const onEdit = () => {
        let temp = chatData;
        temp[editIndex].message = inputValue;
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

    return (
        <div  className="flex flex-row w-full h-[100%] pl-3">
            <div className="w-full h-[100%] pl-3">
                <div className='flex flex-col w-full bg-white w-full'>
                    <div className='flex items-center h-[9vh] border justify-between'>
                        <div className='w-max text-xl mx-5 flex items-center'>
                            <Image className="w-[40px] h-[40px] !rounded-[25px] mr-4 border-[1px]" src={require('../../chatBackground.jpg')} />
                            <div>COMP504 Family</div>
                        </div>
                        <div className="h-full text-2xl mx-5 mt-3 cursor-pointer hover:text-slate-500 hover:scale-[1.2]" onClick={change}>...</div>
                        {visible ? null : <Admin />}
                    </div>
                    <div className='flex flex-col h-screen bg-chat'>
                        <div className='h-[84vh] overflow-y-auto py-2 bg-[#F1F1F1]'>
                            <div className='flex w-full justify-center mt-2'>
                                <div className='bg-slate-300 text-white w-max px-2 rounded-lg text-sm'>11:20</div>
                            </div>
                            {data.map((item, i) => {
                                return !item.yours ?
                                (
                                    <div key={i} className='px-12 py-4 flex w-full items-start' onMouseOver={()=>{changeContextShow(i, "block")}} onMouseOut={()=>{changeContextShow(i, "none")}}>
                                        <div className='flex'>
                                            <Avatar src={item.avatar} onClick={()=>window.location.href=`/profile/${item.id}`}  />
                                            <div className='ml-2'>
                                                <div className='ml-1 text-sm mb-1'>{item.id}</div>
                                                <div className='bg-white px-3 pt-1 pb-2 rounded-lg text-sm font-light'>{item.message}</div>
                                                {chatData[i].reactList.length > 0 ? 
                                                    <div className='px-2 py-2 bg-slate-100 text-sm w-max'>
                                                        <div className='flex '>
                                                            <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl mr-3'/> 
                                                            <Avatar className='!w-[1.5rem] !h-[1.5rem]' src="https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp" />
                                                        </div>
                                                    </div> 
                                                : null}
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
                                            <div className='mr-2 w-max items-edn'>
                                                <div className='ml-1 text-sm mb-1 text-right'>{item.id}</div>
                                                <div id={i+"m"} className='bg-white px-3 pt-1 pb-2 rounded-lg text-sm font-light w-max'>{item.message}</div>
                                                {chatData[i].reactList.length > 0 ? 
                                                    <div className='px-2 py-2 bg-slate-100 text-sm w-max'>
                                                        <div className='flex '>
                                                            <IconLikeThumb className='!text-red-400 hover:scale-[1.2] cursor-pointer !text-xl mr-3' /> 
                                                            <Avatar className='!w-[1.5rem] !h-[1.5rem]' src="https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp" />
                                                        </div>
                                                    </div> 
                                                : null}
                                            </div>
                                            <Avatar src={item.avatar} onClick={()=>console.log("Clicked")}  />
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
                                    onClick={()=>{if (mode === "message") {} else onEdit()}}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}