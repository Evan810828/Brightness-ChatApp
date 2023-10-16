import { Avatar, Image, TextArea } from '@douyinfe/semi-ui';
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

    return (
        <div  className="flex flex-row w-full h-[100%] pl-3">
            <div className="w-full h-[100%] pl-3">
                <div className='flex flex-col w-full bg-white w-full'>
                    <div className='flex items-center h-[9vh] border justify-between'>
                        <div className='w-max text-xl mx-5 flex items-center'>
                            <Image className="w-[40px] h-[40px] !rounded-[25px] mr-4 border-[1px]" src={require('../../chatBackground.jpg')} />
                            <div>Chatroom Name here</div>
                        </div>
                        <div className="h-full text-2xl mx-5 mt-3 cursor-pointer hover:text-slate-500 hover:scale-[1.1]" onClick={change}>...</div>
                    </div>
                    <div className='flex flex-col h-screen bg-chat'>
                        <div className='h-[83vh] overflow-y-auto py-2 bg-[#F1F1F1]'>
                            {data.map((item) => (
                                !item.yours ?
                                (
                                    <div className='px-12 py-4 flex w-full items-start' >
                                        <div className='flex'>
                                            <Avatar src={item.avatar} onClick={()=>console.log("Clicked")}  />
                                            <div className='ml-2'>
                                                <div className='ml-1 text-sm mb-1'>{item.id}</div>
                                                <div className='bg-white px-3 pt-1 pb-2 rounded-lg text-sm font-light'>{item.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                ) :
                                (
                                    <div className='px-12 py-4 flex w-full justify-end' >
                                        <div className='flex'>
                                            <div className='mr-2'>
                                                <div className='ml-1 text-sm mb-1 text-right'>{item.id}</div>
                                                <div className='bg-white px-3 pt-1 pb-2 rounded-lg text-sm font-light'>{item.message}</div>
                                            </div>
                                            <Avatar src={item.avatar} onClick={()=>console.log("Clicked")}  />
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                        <div className='fixed w-full rounded-sm border h-[8vh] bottom-0'>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}