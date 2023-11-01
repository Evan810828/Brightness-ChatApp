import { Avatar } from '@douyinfe/semi-ui';
import { docCookies } from '../../components/header/cookie';
import { useEffect, useState } from 'react';
import { formatTimestamp } from '../../components/timeFomatter';


export default function ChatList(params) {
    const chatList = params.chatList;      

    return(
        <div className="w-[32%]">
            <div className=' text-2xl font-semibold ml-5 mt-3'>Chats</div>
            <div className='w-full bg-white rounded-xl shadow-xl w-full my-2 mx-3 py-2 px-2'>
                <div className='h-[89vh] overflow-scroll'>
                    {chatList&& chatList.map((item) => {
                        return (
                        <div key={item.id} className={`hover:bg-slate-200 rounded-lg px-3 py-2 flex justify-between cursor-pointer mb-2 ${item.roomName === window.location.pathname.slice(1)?'bg-slate-200':''}`}
                            onClick={()=>{window.location.href=`${item.roomName}`}} >
                            <div className='flex w-full'>
                                <Avatar className='' src={require('../../chatBackground.jpg')} />
                                <div className='w-[80%] flex flex-col ml-2'>
                                    <div className='flex w-full items-center justify-between'>
                                        <div>{item.roomName>16?item.slice(0,16) + '...':item.roomName}</div>
                                        <div className='text-sm text-slate-500 font-light'>{item.latestMessage?formatTimestamp(item.latestMessage.timestamp):null}</div>
                                    </div>
                                    <span className='text-sm font-light text-slate-500'>
                                        <span>{item.latestMessage?item.latestMessage.senderName+":":null}</span>
                                        <span className='ml-1'>{item.latestMessage?item.latestMessage.content:null}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </div>
    )
}