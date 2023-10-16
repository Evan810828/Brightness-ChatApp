import { List, Avatar, Button, ButtonGroup, SideSheet,TextArea } from '@douyinfe/semi-ui';
import React, { useState } from 'react';

export default function ChatRoom(params) {
    const data = [
        {
            id: "User 1",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Message 1",
            time: "Yesterday",
            yours: true
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Message 1",
            time: "Yesterday",
            yours: false

        },
        {
            id: "User 3",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Message 1",
            time: "Yesterday",
            yours: false
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Message 1",
            time: "Yesterday",
            yours: false
        },
        {
            id: "User 3",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Message 1",
            time: "Yesterday",
            yours: false
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Message 1",
            time: "Yesterday",
            yours: false
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Message 1",
            time: "Yesterday",
            yours: false
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Message 1",
            time: "Yesterday",
            yours: true
        },
        {
            id: "User 1",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Message 1",
            time: "Yesterday",
            yours: true
        },
        {
            id: "User 4",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Message 1",
            time: "Yesterday",
            yours: false
        },
        {
            id: "User 1",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Message 1",
            time: "Yesterday",
            yours: true
        }
    ];

    const [visible, setVisible] = useState(false);
    const change = () => {
        setVisible(!visible);
    };
    const getContainer = () => {
        console.log(document.querySelector('#sidesheet-container'))
        return document.querySelector('#sidesheet-container');
    };
    return (
        <div  className="flex flex-row w-[72%] h-[100%] pl-3">
            <div className="w-[70%] h-[100%] pl-3">
                <div className='flex flex-row '>
                    <div className='w-[50%] text-white text-2xl font-semibold ml-5 mt-3 '>
                        Chatroom Name here
                    </div>
                    <div className="w-[50%] w-[50%] text-white text-2xl font-semibold ml-5 mt-3 text-right" onClick={change}>...</div>
                </div>

                <div className='flex flex-col w-full bg-white rounded-xl shadow-xl w-full my-2 mx-3 py-2 px-2 h-[90.5%]'>
                     <div id='message-display-area' className='flex flex-col overflow-y-auto max-h-[79%] border border-gray-400 '>
                        {data.map((item) => {
                            if(!item.yours){
                                return(
                                    <div className=' rounded-lg px-3 py-2 flex justify-between cursor-pointer mb-2' >
                                        <div className='flex'>
                                            <Avatar src={item.avatar} onClick={()=>console.log("Clicked")}  />
                                            <div className='flex flex-col ml-2'>
                                                <span>{item.id}</span>
                                                <span className='text-sm font-light text-slate-500'>{item.message}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else{
                                return(
                                    <div className=' rounded-lg px-3 py-2 flex justify-end cursor-pointer mb-2'  >
                                        <div className='flex'>
                                            <div className='flex flex-col ml-2'>
                                                <span className='text-right'>{item.id}</span>
                                                <span className='text-sm font-light text-slate-500'>{item.message}</span>
                                            </div>
                                            <Avatar src={item.avatar} onClick={()=>console.log("Clicked")} />
                                        </div>
                                    </div>
                                )
                            }
                            
                            })}

                     </div>
                     <div className='h-[1%]'>

                     </div>
                     <div className='border border-gray-400 h-[20%]'>
                     <TextArea maxCount={100} showClear  className='h-[100%]'/>

                    </div>   
                </div>

                
            </div>
            <div id="sidesheet-container" className="relative top-[5%]  left-[2%] w-[30%] max-h-[90%] bg-[#006DF0]">
                <SideSheet title="滑动侧边栏"   width={380} visible={visible} onCancel={change} getPopupContainer={ getContainer} placement='left'>

                </SideSheet>
            </div>
        </div>

    )
}