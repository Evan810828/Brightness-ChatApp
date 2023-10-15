import {Avatar} from '@douyinfe/semi-ui';

export default function ChatList(params) {
    const data = [
        {
            id: "User 1",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Chat 2",
            time: "Yesterday"
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Chat 2",
            time: "Yesterday"
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Chat 2",
            time: "Yesterday"
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Chat 2",
            time: "Yesterday"
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Chat 2",
            time: "Yesterday"
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Chat 2",
            time: "Yesterday"
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Chat 2",
            time: "Yesterday"
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Chat 2",
            time: "Yesterday"
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Chat 2",
            time: "Yesterday"
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Chat 2",
            time: "Yesterday"
        },
        {
            id: "User 2",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Dummy Chat 2",
            time: "Yesterday"
        }
    ];

    return(
        <div className="w-[28%]">
            <div className='text-white text-2xl font-semibold ml-5 mt-3'>Chats</div>
            <div className='w-full bg-white rounded-xl shadow-xl w-full my-2 mx-3 py-2 px-2'>
                <div className='h-[89vh] overflow-scroll'>
                    {data.map((item) => (
                        <div className='hover:bg-slate-200 rounded-lg px-3 py-2 flex justify-between cursor-pointer mb-2' onClick={()=>console.log("Clicked")} >
                            <div className='flex'>
                                <Avatar src={item.avatar} />
                                <div className='flex flex-col ml-2'>
                                    <span>{item.id}</span>
                                    <span className='text-sm font-light text-slate-500'>{item.message}</span>
                                </div>
                            </div>
                            <div className='text-sm text-slate-500 font-light'>
                                {item.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}