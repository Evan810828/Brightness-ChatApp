import { Avatar } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { docCookies } from "../../components/header/cookie";

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
    const [roomInvitations, setRoomInvitations] = useState([]);
    const [userInvitations, setUserInvitations] = useState([]);
    const base = "https://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com"

    const getMessages = () => {
        fetch(base+`/invitations/${docCookies.getItem("username")}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setRoomInvitations(data.rooms);
                setUserInvitations(data.users);
            }
        });
    }

    const acceptRoomInvitation = (roomName) => {
        fetch(base+`/chatroom/accept/${roomName}`, {method:"POST", body: JSON.stringify({
            username: docCookies.getItem("username"),
        })}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }
        ).then(data => {
            if (data) {
                getMessages();
            }
        });
    }

    const declineRoomInvitation = (roomName) => {
        fetch(base+`/chatroom/decline/${roomName}`, {method:"POST", body: JSON.stringify({
            username: docCookies.getItem("username"),
        })}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }
        ).then(data => {
            if (data) {
                getMessages();
            }
        });
    }

    const acceptUserInvitation = (username) => {
        fetch(base+`/user/friends/accept`, {method:"POST", body: JSON.stringify({
            username: docCookies.getItem("username"),
            senderUsername: username
          })
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                window.location.reload();
            }
        });
    }

    const declineUserInvitation = (username) => {
        fetch(base+`/user/friends/decline`, {method:"POST", body: JSON.stringify({
            username: docCookies.getItem("username"),
            senderUsername: username
          })
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                getMessages();
            }
        });
    }

    useEffect(() => {
        getMessages();
    }, []);

    return(
        <div className="py-6">
            <div className="pb-3 text-2xl font-bold">Nofitications</div>
            <div className="divide-y min-h-[200px]">
                {roomInvitations&& roomInvitations.map((item, i) => (
                    <div key={i} className="my-2 py-2 flex justify-between w-full">
                        <div>
                            <div className="flex items-center">
                                <Avatar size="small" src={item.avatar} shape="circle" />
                                <div className="ml-2">{item.owner}</div>
                            </div>
                            <div className="ml-10">
                                <div className="text-sm">Invited you to join {item.roomName}</div>
                            </div>
                        </div>
                        <div>
                            <div className="flex h-full items-center w-36 justify-between">
                                <button className="bg-blue-400 text-white px-2 py-1 rounded-sm text-sm mt-2" onClick={()=>{acceptRoomInvitation(item.roomName)}}>Accept</button>
                                <button className="bg-red-400 text-white px-2 py-1 rounded-sm text-sm mt-2" onClick={()=>{declineRoomInvitation(item.roomName)}}>Decline</button>
                            </div>
                        </div>
                    </div>
                ))}
                {userInvitations&& userInvitations.map((item, i) => (
                    <div key={i} className="my-2 py-2 flex justify-between w-full">
                        <div>
                            <div className="flex items-center">
                                <Avatar size="small" src={item.avatar} shape="circle" />
                                <div className="ml-2">{item.username}</div>
                            </div>
                            <div className="ml-10">
                                <div className="text-sm text-gray-400">{item.time}</div>
                                <div className="text-sm">Request to add you as a friend.</div>
                            </div>
                        </div>
                        <div>
                            <div className="flex h-full items-center w-36 justify-between">
                                <button className="bg-blue-400 text-white px-2 py-1 rounded-sm text-sm mt-2" onClick={()=>{acceptUserInvitation(item.username)}}>Accept</button>
                                <button className="bg-red-400 text-white px-2 py-1 rounded-sm text-sm mt-2" onClick={()=>{declineUserInvitation(item.username)}}>Decline</button>
                            </div>
                        </div>
                    </div>
                ))}
                {(roomInvitations.length === 0 && userInvitations.length === 0) && 
                    <div className="text-center text-gray-400 text-xl relative top-[80px]">No notifications.</div>
                }
            </div>
        </div>
    );
}