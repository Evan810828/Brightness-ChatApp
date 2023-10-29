import { IconMute, IconVolume2, IconCopyAdd } from '@douyinfe/semi-icons';
import { useEffect, useState } from 'react';
import { docCookies } from '../../components/header/cookie';

// const friendList = [
//     {
//         name: "John",
//         avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj_UkBWZBjd-K5TxEQuPAUd6Gj7BKFBsR49A&usqp=CAU",
//         status: "online",
//         muted: false,
//     },
//     {
//         name: "Sara",
//         avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-3H6IHZNPQv3QBicSDtkTtsErOzQj1NrZNw&usqp=CAU",
//         status: "online",
//         muted: false,
//     },
//     {
//         name: "William",
//         avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXM5VoIfvhRC2p7byLim5MD2WNIYW949cEIg&usqp=CAU",
//         status: "online",
//         muted: false,
//     },
//     {
//         name: "Mia",
//         avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wvt48MJrdhdoESZm1YX_N9ext4H4IxE0uA&usqp=CAU",
//         status: "offline",
//         muted: false,
//     },
//     {
//         name: "Mark",
//         avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0_QPt__Da9AIiAsMlwkeY_0GHYLUNCMMOMw&usqp=CAU",
//         status: "offline",
//         muted: true,
//     },

// ]

export default function Friends() {
    const [friendList, setFriendList] = useState([]);

    const getFriendList = () => {
        fetch(`/user/friends/${docCookies.getItem("username")}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setFriendList(data.usernames);
                console.log(friendList);
            }
        });
    }

    useEffect(() => { 
        getFriendList();
    }, []);


    return(
        <div className="py-6">
            <div className="divide-y">
            <div className="pb-3 text-2xl font-bold">My Friends</div>
                {friendList.map((item, i) => (
                    <div key={i} className="flex items-center justify-between my-2 py-2">
                        <div className="flex items-center">
                            <div className="!w-[40px] !h-[40px] !rounded-[20px] !shadow-lg mr-4 flex">
                                <img className="!w-[40px] !h-[40px] !rounded-[20px] cursor-pointer" src={item.avatar} onClick={()=>{window.location.href=`/profile/${item}`}} />
                            </div>
                            <div className={`w-[12px] h-[12px] rounded-[6px] ${item.status === 'online'? 'bg-green-500':'bg-yellow-500'} relative right-6 top-4`} />
                            <div className="text-lg relative right-2">{item}</div>
                        </div>
                        <div className='w-16 flex justify-between'>
                            {item.muted? 
                            <IconMute className='text-gray-400 cursor-pointer hover:scale-125' size='large' />: 
                            <IconVolume2 className='text-blue-400 cursor-pointer hover:scale-125' size='large' />
                            }
                            <IconCopyAdd className='text-blue-400 cursor-pointer hover:scale-125' size='large' />
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    );
}