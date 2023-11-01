import { IconMute, IconVolume2, IconCopyAdd,IconUserAdd } from '@douyinfe/semi-icons';
import { Avatar, Icon, Toast } from "@douyinfe/semi-ui";
import { useEffect, useState } from 'react';
import { docCookies } from '../../components/header/cookie';
import { avatarLinks } from '../../components/avatar';

export default function Users(params) {
    const [friendList, setFriendList] = useState([]);
    const {displayMute, displayAdd,username} = params;
    const [userList, setuserList] = useState([]);
    const base = "https://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com"

    const getUserList = () => {
        fetch(base+`/users/usersAll/${username}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setuserList(data.users);
            }
        });
    }

    const getFriendList = () => {
        fetch(base+`/user/friends/${docCookies.getItem("username")}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setFriendList(data.usernames);
            }
        });
    }

   
    useEffect(() => { 
        getFriendList();
        getUserList();
    }, []);

    const addFriend = () => {
        fetch(base+`/user/friends/invite`, {method:"POST",
            body: JSON.stringify({
                username: username,
                senderUsername: docCookies.getItem("username")
              })
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                if(data.result === "success"){
                    Toast.success("Friend request sent!");
                }
            }
        });
    }

    return(
        <div className="py-6">
            <div className="pb-3 text-2xl font-bold">Common Interest/School Users</div>
            <div className="divide-y min-h-[100px]">
                {userList&&userList.map((item, i) => (
                    <div key={i} className="flex items-center justify-between my-2 py-2">
                        <div className="flex items-center">
                            <div className="!w-[40px] !h-[40px] !rounded-[20px] !shadow-lg mr-4 flex">
                                <img className="!w-[40px] !h-[40px] !rounded-[20px] cursor-pointer" src={avatarLinks[item.avatar]} onClick={()=>{window.location.href=`/profile/${item.username}`}} />
                            </div>
                            <div className={`w-[12px] h-[12px] rounded-[6px] ${item.active? 'bg-green-500':'bg-yellow-500'} relative right-6 top-4`} />
                            <div className="text-lg relative right-2">{item.username}</div>
                        </div>
                        <div className='w-max flex justify-between'>
                            {displayAdd&&<IconCopyAdd className='text-blue-400 cursor-pointer hover:scale-125 ml-4' size='large' />}
                        </div>
                        {friendList.indexOf(item.username) === -1 ? 
                        <div className="w-full flex justify-end pt-6">
                            <div className="flex items-center cursor-pointer hover:bg-blue-500 rounded px-3 py-2 hover:!text-white" onClick={addFriend}>
                                <IconUserAdd className="!text-2xl mr-3" type="plus-circle" />
                                Add Friend
                            </div>
                        </div>:null
                        }
                    </div>
                    
                ))
                }
                {(userList.length === 0) && <div className="text-center text-gray-400 text-xl relative top-[40px]">No Other users yet.</div>}
            </div>
        </div>
    );
}