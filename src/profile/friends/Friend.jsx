import { IconMute, IconVolume2, IconCopyAdd } from '@douyinfe/semi-icons';
import { useEffect, useState } from 'react';
import { docCookies } from '../../components/header/cookie';
import { avatarLinks } from '../../components/avatar';

export default function Friends(params) {
    const [friendList, setFriendList] = useState([]);
    const {displayMute, displayAdd} = params;
    const base = "https://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com"

    const getFriendList = () => {
        fetch(base+`/user/friendsAll/${docCookies.getItem("username")}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setFriendList(data.friends);
            }
        });
    }

    useEffect(() => { 
        getFriendList();
    }, []);


    return(
        <div className="py-6">
            <div className="pb-3 text-2xl font-bold">My Friends</div>
            <div className="divide-y min-h-[100px]">
                {friendList&&friendList.map((item, i) => (
                    <div key={i} className="flex items-center justify-between my-2 py-2">
                        <div className="flex items-center">
                            <div className="!w-[40px] !h-[40px] !rounded-[20px] !shadow-lg mr-4 flex">
                                <img className="!w-[40px] !h-[40px] !rounded-[20px] cursor-pointer" src={avatarLinks[item.avatar]} onClick={()=>{window.location.href=`/profile/${item.username}`}} />
                            </div>
                            <div className={`w-[12px] h-[12px] rounded-[6px] ${item.active? 'bg-green-500':'bg-yellow-500'} relative right-6 top-4`} />
                            <div className="text-lg relative right-2">{item.username}</div>
                        </div>
                        <div className='w-max flex justify-between'>
                            {/* {displayMute&&(item.muted? 
                            <IconMute className='text-gray-400 cursor-pointer hover:scale-125' size='large' />: 
                            <IconVolume2 className='text-blue-400 cursor-pointer hover:scale-125' size='large' />
                            )} */}
                            {displayAdd&&<IconCopyAdd className='text-blue-400 cursor-pointer hover:scale-125 ml-4' size='large' />}
                        </div>
                    </div>
                ))
                }
                {(friendList.length === 0) && <div className="text-center text-gray-400 text-xl relative top-[40px]">No friends yet.</div>}
            </div>
        </div>
    );
}