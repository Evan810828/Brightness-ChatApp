import My from "./my/My";
import Friends from "./friends/Friend";
import Users from "./users/Users";
import Inbox from "./inbox/Inbox";
import Other from "./other/Other";
import { useEffect, useState } from "react";
import { IconUserAdd, IconPlus } from "@douyinfe/semi-icons";
import { docCookies } from "../components/header/cookie";
import { Button, Input, Select, Toast } from "@douyinfe/semi-ui";

export default function Profile(params) {
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [roomType, setRoomType] = useState('public');
    const base = "https://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com"

    const createChatroom = () => {
        if (roomName === '') {
            Toast.error("Room name cannot be empty!");
            return;
        }
        fetch(base+`/chatroom/create`, {method:"POST",
            body: JSON.stringify({
                username: username,
                roomName: roomName,
                roomSize: 10,
                roomType: roomType
              })
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                if(data.result === "success"){
                    Toast.success("Chatroom created!");
                    setRoomName('');
                }
            }
        });
    }

    useEffect(() => {
        setUsername(window.location.pathname.split('/')[2].replace(/%20/g, " "));
    }, []);

    return(
        <div className='w-full min-h-screen h-max px-36 py-20 flex flex-col items-center'>
            <div className="bg-white rounded-xl shadow-xl w-full px-16 mb-8">
                {username ===  docCookies.getItem("username") ? 
                    <My username={username} /> : 
                    <Other username={username} />
                }
            </div>
            {username ===  docCookies.getItem("username")?
                <div className="w-full">
                    <div className="flex justify-center w-full mb-6">
                        <Select className="!border-none" defaultValue='public' value={roomType} onChange={(value)=>{setRoomType(value)}}>
                            <Select.Option value='public'>Public</Select.Option>
                            <Select.Option value='private'>Private</Select.Option>
                        </Select>
                        <Input className="!max-w-[50%]" placeholder="Enter the room name" value={roomName} onChange={(value,e)=>{setRoomName(value)}} suffix={
                            <Button className="" theme="solid" onClick={createChatroom}>
                                Create a Chatroom
                            </Button>
                        }/>
                    </div>
                    <div className="bg-white rounded-lg shadow-xl w-full px-16 mb-8">
                        <Friends displayMute={true} displayAdd={false} />
                    </div>
                    <div className="bg-white rounded-lg shadow-xl w-full px-16 mb-8">
                        <Users displayMute={true} displayAdd={false} username={username}/>
                    </div>
                    <div className="bg-white rounded-lg shadow-xl w-full px-16">
                        <Inbox />
                    </div>
                </div> : null
            }
        </div>
    )
}