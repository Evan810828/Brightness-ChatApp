import {Avatar} from '@douyinfe/semi-ui';

export default function ChatList(params) {
    const data = [
        {
            id: "Mark",
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj_UkBWZBjd-K5TxEQuPAUd6Gj7BKFBsR49A&usqp=CAU',
            message: "Dummy Chat 2",
            time: "Yesterday"
        },
        {
            id: "Anna",
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-3H6IHZNPQv3QBicSDtkTtsErOzQj1NrZNw&usqp=CAU',
            message: "Great meeting today!",
            time: "2 days ago"
        },
        {
            id: "Design Team",
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn5pFYFPURn4Xq6_gbN-zlp_yTeGYS5M2_fw&usqp=CAU',
            message: "New designs uploaded",
            time: "1 hour ago"
        },
        {
            id: "Lucy",
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXM5VoIfvhRC2p7byLim5MD2WNIYW949cEIg&usqp=CAU',
            message: "Lunch tomorrow?",
            time: "5 minutes ago"
        },
        {
            id: "Product Managers",
            avatar: 'https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp',
            message: "Updated the product roadmap",
            time: "3 days ago"
        },
        {
            id: "Sophie",
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wvt48MJrdhdoESZm1YX_N9ext4H4IxE0uA&usqp=CAU',
            message: "Let's reschedule our call",
            time: "4 days ago"
        },
        {
            id: "Marketing Team",
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFJ4AbbN5qroIYS-w7tGMlMK7ZvXeaKnuNRw&usqp=CAU',
            message: "Campaign results attached",
            time: "Yesterday"
        },
        {
            id: "Isabella",
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK2sdSvFkSyfHsmwmhC4uAYymBGFYTsY4i4A&usqp=CAU',
            message: "Feedback on designs?",
            time: "Yesterday"
        },
        {
            id: "Developers",
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0_QPt__Da9AIiAsMlwkeY_0GHYLUNCMMOMw&usqp=CAU',
            message: "Code review scheduled for 3PM",
            time: "2 hours ago"
        },
        {
            id: "Emma",
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuFzAIR675Zc4LuhA3P2bVCgE6zKcgJIu50Q&usqp=CAU',
            message: "Updated the team docs",
            time: "2 hours ago"
        },
        {
            id: "QA Team",
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn5pFYFPURn4Xq6_gbN-zlp_yTeGYS5M2_fw&usqp=CAU',
            message: "Found new bugs in the release",
            time: "1 day ago"
        }
    ];
    

    return(
        <div className="w-[32%]">
            <div className=' text-2xl font-semibold ml-5 mt-3'>Chats</div>
            <div className='w-full bg-white rounded-xl shadow-xl w-full my-2 mx-3 py-2 px-2'>
                <div className='h-[89vh] overflow-scroll'>
                    {data.map((item) => (
                        <div className='hover:bg-slate-200 rounded-lg px-3 py-2 flex justify-between cursor-pointer mb-2' onClick={()=>console.log("Clicked")} >
                            <div className='flex w-full'>
                                <Avatar className='' src={item.avatar} />
                                <div className='w-[80%] flex flex-col ml-2'>
                                    <div className='flex w-full items-center justify-between'>
                                        <div>{item.id.length>16?item.id.slice(0,16) + '...':item.id}</div>
                                        <div className='text-sm text-slate-500 font-light'>{item.time}</div>
                                    </div>
                                    <span className='text-sm font-light text-slate-500'>{item.message}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}