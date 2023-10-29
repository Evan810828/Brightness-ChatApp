import My from "./my/My";
import Friends from "./friends/Friend";
import Inbox from "./inbox/Inbox";
import Other from "./other/Other";
import { useEffect, useState } from "react";
import { IconUserAdd } from "@douyinfe/semi-icons";
import { docCookies } from "../components/header/cookie";

export default function Profile(params) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        setUsername(window.location.pathname.split('/')[2]);
    }, []);

    return(
        <div className='w-full min-h-screen h-max px-36 py-20 flex flex-col items-center'>
            <div className="bg-white rounded-xl shadow-xl w-full px-16 mb-8">
                {username ===  docCookies.getItem("username") ? 
                    <My /> : 
                    <Other />
                }
            </div>
            {username ===  docCookies.getItem("username")?
                <div className="w-full">
                    <div className="bg-white rounded-lg shadow-xl w-full px-16 mb-8">
                        <Friends />
                    </div>
                    <div className="bg-white rounded-lg shadow-xl w-full px-16">
                        <Inbox />
                    </div>
                </div>
                : 
                <div className="w-full flex justify-center">
                    <div className="flex items-center cursor-pointer hover:bg-blue-500 rounded px-3 py-2 hover:!text-white hover:shadow-lg hover:scale-[1.1]">
                        <IconUserAdd className="!text-2xl mr-3" type="plus-circle" />
                        Add Friend
                    </div>
                </div>
            }
        </div>
    )
}