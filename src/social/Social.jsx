import { Image, Toast } from "@douyinfe/semi-ui";
import {IconCopyAdd} from '@douyinfe/semi-icons';
import { useEffect, useState } from "react";
import { docCookies } from "../components/header/cookie";

export default function Social() {
    const [roomlist, setRoomlist] = useState([]);
    const [joinedRoomlist, setJoinedRoomlist] = useState([]);

    const username = docCookies.getItem("username");
    const base = "https://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com"

    const getRoomlist = () => {
        fetch(base+"/list/chatrooms", {method: 'GET'}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }
        ).then(data => {
            if (data) {
                setRoomlist(data.rooms);
            }
        });
    }

    const getJoinedRoomlist = () => {
        fetch(base+`/chatrooms/${username}`, {method: 'GET'}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }
        ).then(data => {
            if (data) {
                setJoinedRoomlist(data.roomNames);
            }
        });
    }

    const joinRoom = (roomName) => {
        fetch(base+`/chatroom/join`, {method:"POST",
            body: JSON.stringify({
                roomName: roomName,
                username: username
              })
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                if(data.result === "failed: user is banned from the room") {
                    Toast.error("You are banned from this room!");
                    return;
                } else if(data.result === "failed: user is banned") {
                    Toast.error("You are globally banned!");
                    return;

                }
                Toast.success("Joined!");
                getRoomlist();
                getJoinedRoomlist();
            }
        });
    }


    useEffect(() => {
        getRoomlist();
        getJoinedRoomlist();
    }, []);


    return(
        <div className="ml-[60px] px-36 py-16 w-full min-h-screen">
            <div className="text-3xl font-bold">Find Others</div>
            <div className="grid grid-cols-4 gap-8 mt-8 w-full">
                {roomlist && roomlist.map((item, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-xl w-[250px] h-[240px] hover:scale-[1.1]">
                        <Image className="w-full h-[70%]" src={require('../chatBackground.jpg')} />
                        <div className="px-4 py-1 flex w-full justify-between">
                            <div>
                                <div>{item.roomName}</div>
                                <div className="font-light text-sm">{item.roomSize}/{item.capacity} members</div>
                            </div>
                            <div>
                                {joinedRoomlist.indexOf(item.roomName) === -1 ? 
                                    <IconCopyAdd className="text-[#006DF0A1] !text-2xl cursor-pointer hover:scale-[1.1]" onClick={()=>{joinRoom(item.roomName)}} /> : 
                                    <div className="text-green-500">Joined</div>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}