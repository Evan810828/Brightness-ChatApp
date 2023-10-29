import { Avatar } from "@douyinfe/semi-ui";
import { useState } from "react";

const messages = [
    {
        type: 'invitation',
        receiver: 'John Doe',
        time: '3 hours ago',
        content: 'Invites you to join group 2.',
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj_UkBWZBjd-K5TxEQuPAUd6Gj7BKFBsR49A&usqp=CAU"
    },
    {
        type: 'invitation',
        receiver: 'Danniel Wang',
        time: '4 hours ago',
        content: 'Invites you to be friends.',
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-3H6IHZNPQv3QBicSDtkTtsErOzQj1NrZNw&usqp=CAU"
    },
    {
        type: 'response',
        receiver: 'Frank Ran',
        time: '1 day ago',
        content: 'Accepted your invitation to group 1.',
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXM5VoIfvhRC2p7byLim5MD2WNIYW949cEIg&usqp=CAU"
    },
    {
        type: 'response',
        receiver: 'Frank Ran',
        time: '1 day ago',
        content: 'Declined your invitation to group 3.',
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wvt48MJrdhdoESZm1YX_N9ext4H4IxE0uA&usqp=CAU"
    },
    {
        type: 'report',
        receiver: 'Feifei Li',
        time: '3 weeks ago',
        content: 'Reported Prof. Mack for giving him a bad grade.',
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuFzAIR675Zc4LuhA3P2bVCgE6zKcgJIu50Q&usqp=CAU"
    },
]

export default function Inbox() {
    const [invitations, setInvitations] = useState([]);

    const getMessages = () => {
        
    }


    const getOperation = (message) => {
        switch(message.type) {
            case "invitation":
                return <div className="flex h-full items-center w-36 justify-between">
                    <button className="bg-blue-400 text-white px-2 py-1 rounded-sm text-sm mt-2">Accept</button>
                    <button className="bg-red-400 text-white px-2 py-1 rounded-sm text-sm mt-2">Decline</button>
                </div>
            case "response":
                return null
            case "report":
                return <button className="bg-green-500 text-white px-2 py-1 rounded-sm text-sm mt-2">Done</button>
        }
    }

    return(
        <div className="py-6">
            <div className="pb-3 text-2xl font-bold">Nofitications</div>
            <div className="divide-y">
                {messages.map((item, i) => (
                    <div key={i} className="my-2 py-2 flex justify-between w-full">
                        <div>
                            <div className="flex items-center">
                                <Avatar size="small" src={item.avatar} shape="circle" />
                                <div className="ml-2">{item.receiver}</div>
                            </div>
                            <div className="ml-10">
                                <div className="text-sm text-gray-400">{item.time}</div>
                                <div className="text-sm">{item.content}</div>
                            </div>
                        </div>
                        <div>
                            {getOperation(item)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}