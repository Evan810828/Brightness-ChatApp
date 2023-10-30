import { Image, Tabs, TabPane, Input, Switch, Modal, Toast, Button } from '@douyinfe/semi-ui';
import { IconEdit, IconCopyAdd, IconVolume2,  } from '@douyinfe/semi-icons';
import { docCookies } from '../../components/header/cookie';
import { useEffect, useState } from 'react';
import Friends from '../../profile/friends/Friend';
import { avatarLinks } from '../../components/avatar';

const membersList = [
    {
        id: "john",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj_UkBWZBjd-K5TxEQuPAUd6Gj7BKFBsR49A&usqp=CAU",
        name: "John",
        joinTime: "2 weeks ago"
    },
    {
        id: "sara",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-3H6IHZNPQv3QBicSDtkTtsErOzQj1NrZNw&usqp=CAU",
        name: "Sara",
        joinTime: "1 month ago"
    },
    {
        id: "will",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn5pFYFPURn4Xq6_gbN-zlp_yTeGYS5M2_fw&usqp=CAU",
        name: "William",
        joinTime: "3 days ago"
    },
    {
        id: "mia",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXM5VoIfvhRC2p7byLim5MD2WNIYW949cEIg&usqp=CAU",
        name: "Mia",
        joinTime: "1 week ago"
    },
    {
        id: "frankran",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wvt48MJrdhdoESZm1YX_N9ext4H4IxE0uA&usqp=CAU",
        name: "Frank Ran",
        joinTime: "5 days ago"
    },
    {
        id: "feifeili",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFJ4AbbN5qroIYS-w7tGMlMK7ZvXeaKnuNRw&usqp=CAU",
        name: "Feifei Li",
        joinTime: "3 weeks ago"
    },
    {
        id: "danniel",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK2sdSvFkSyfHsmwmhC4uAYymBGFYTsY4i4A&usqp=CAU",
        name: "Danniel Wang",
        joinTime: "6 days ago"
    }
];

export default function Admin(params) {
    const [activeKey, setActiveKey] = useState('1');
    const [roomType, setRoomType] = useState('Public');
    const [roomDetails, setRoomDetails] = useState(undefined);
    const [roomMembers, setRoomMembers] = useState([]);
    const [adminStatus, setAdminStatus] = useState(undefined);
    const [inviteModalVisible, setInviteModalVisible] = useState(false);
    const [edit, setEdit] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [newCapacity, setNewCapacity] = useState();

    
    const [friendList, setFriendList] = useState([]);

    const getFriendList = () => {
        fetch(`/user/friends/${docCookies.getItem("username")}`, {method:"GET"}).then(res => {
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
    }, []);

    const getRoomMembers = () => {
        fetch(`/list/chatroom/members/${params.roomDetails.roomName}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setRoomMembers(data.users)
            }
        });
    }

    const getAdminStatus = () => {
        fetch(`/chatroom/admin/${params.roomDetails.roomName}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                if(data.username === docCookies.getItem("username")){
                    setAdminStatus(true);
                    console.log(data.username);
                } else {
                    setAdminStatus(false);
                    console.log(data);
                }
            }
        });
    }

    const inviteFriend = (friendName) => {
        fetch(`/chatroom/invite/${roomDetails.roomName}`, {method:"POST",body: JSON.stringify({
                username: friendName,
                senderUsername: docCookies.getItem("username"),
            })
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                Toast.success("Invitation sent!");
            }
        });
    }

    const setRoomName = () => {
        fetch(`/chatroom/setRoomName`, {method:"POST",body: JSON.stringify({
            roomName: roomDetails.roomName,
            newRoomName: newRoomName
        })}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                Toast.success("Room name updated!");
            }
        });
    }

    const kickUser = (username) => {
        fetch(`/chatroom/leave/${roomDetails.roomName}`, {method:"POST",body: JSON.stringify({
            username: username
        })}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                Toast.success("User kicked!");
                setRoomDetails(params.roomDetails);
                getRoomMembers();
            }
        });
    }

    const blockUser = (username) => {
        fetch(`/chatroom/block`, {method:"POST",body: JSON.stringify({
            senderName: docCookies.getItem("username"),
            receiverName: username,
        })}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                Toast.success("User blocked!");
                setRoomDetails(params.roomDetails);
                getRoomMembers();
            }
        });
    }

    useEffect(() => {
        setRoomDetails(params.roomDetails);
        setNewRoomName(params.roomDetails.roomName)
        getRoomMembers();
        getAdminStatus();
    }, [params]);

    return(
        <div className="py-4 px-1 md:w-[600px] md:h-[500px] fixed bg-white right-8 top-8 z-[100] rounded-xl shadow-xl">
            {roomDetails && roomMembers && <Tabs tabPosition='left' type='line' activeKey={activeKey} defaultActiveKey='1' onChange={(e)=>{setActiveKey(e)}}>
                <TabPane tab="Overview" itemKey='1'>
                    <div className='w-full h-full flex flex-col py-3 px-4'>
                        <Image className="w-[80px] h-[80px] !rounded-[40px] mr-4" src={require('../../chatBackground.jpg')} />
                        <div className='flex items-center mt-4'>
                            <div className='text-xl mr-4'>
                                {!edit?roomDetails.roomName
                                :<Input value={newRoomName} onChange={(value,e)=>{setNewRoomName(value)}} />}
                            </div>
                            {adminStatus&&(!edit?<IconEdit className="ml-2 text-slate-500 cursor-pointer" onClick={()=>{setEdit(true)}} />:
                            <div>
                                <Button className="ml-2" theme="solid" onClick={()=>{setEdit(false);setRoomName()}}>Save</Button>
                                <Button className="ml-2" type="danger" onClick={()=>{setEdit(false)}}>Cancel</Button>
                            </div>
                            )}
                        </div>
                        <div className='text-slate-500 flex w-[70%] mt-4'>
                            <div className='flex flex-row items-center'>
                                <div>Members: {roomMembers.length} / </div>
                                <div>{edit?<Input className='ml-1 !w-12' value={newCapacity} onChange={(value,e)=>{setNewCapacity(value)}} />:roomDetails.capacity}</div>
                            </div>
                        </div>
                        <div className='mt-4 flex'>
                            <div className='font-semibold'>{roomType}</div>
                        </div>
                        {/* <div>
                            <div className='mt-6 flex items-center'>
                                <div className='mr-4'>Description</div>
                                {adminStatus&&<IconEdit className='text-slate-400 cursor-pointer' />}
                            </div>
                            <div className='text-slate-500 text-sm mt-2'>
                                This is a dedicated space for all students, faculty, 
                                and alumni of COMP504 to come together, share, learn, and bond. 
                                Whether you're reminiscing about past projects, discussing the latest tech trends, 
                                seeking guidance on assignments, 
                                or just wanting to catch up with familiar faces, this chat room is the place to be.
                            </div>
                        </div> */}
                    </div>
                </TabPane>
                <TabPane tab="Members" itemKey='2'>
                    <div className='w-full h-full flex flex-col py-3 px-4'>
                        <div className='text-xl flex font-semibold'>Participants: <div className='ml-2'>({roomMembers.length})</div></div>
                        {/* <Input className='w-[70%] mt-4' placeholder='Search for participants'></Input> */}
                        <div className='mt-6 mb-2 w-[70%] px-2 flex cursor-pointer hover:scale-[1.01]' onClick={()=>{setInviteModalVisible(true)}}>
                            <IconCopyAdd className='!text-2xl mr-3'/>
                            <div>Add Members</div>
                        </div>
                        <div className='mt-4 w-full h-[300px] overflow-y-auto'>
                            {roomMembers&& roomMembers.map((item) => (
                                <div key={item} className='mb-3 flex w-full items-center'>
                                    <div className='flex items-center w-[70%] cursor-pointer' onClick={()=>{window.location.href=`/profile/${item.username}`}}>
                                        <img className="!w-[40px] !h-[40px] !rounded-[20px]" src={avatarLinks[item.avatar]} />
                                        <div className='ml-2'>{item.username}</div>
                                    </div>
                                    {(item.username!==docCookies.getItem('username'))&&<div className='flex items-center w-[30%] justify-between'>
                                        <IconVolume2 className='text-blue-400 cursor-pointer hover:scale-125' size='large' />
                                        {(adminStatus)&&<button className='bg-red-400 text-white px-2 py-1 rounded-lg text-sm' onClick={()=>{kickUser(item.username)}}>Remove</button>}
                                    </div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </TabPane>
            </Tabs>}
            <Modal visible={inviteModalVisible} onCancel={()=>{setInviteModalVisible(false)}} footer={null}>
                <div className="py-6">
                    <div className="pb-3 text-2xl font-bold">My Friends</div>
                    <div className="divide-y min-h-[100px]">
                        {friendList&&friendList.map((item, i) => (
                            <div key={i} className="flex items-center justify-between my-2 py-2 hover:bg-slate-100 rounded-lg px-4">
                                <div className="flex items-center">
                                    <div className="!w-[40px] !h-[40px] !rounded-[20px] !shadow-lg mr-4 flex">
                                        <img className="!w-[40px] !h-[40px] !rounded-[20px] cursor-pointer" src={avatarLinks[item.avatar]} onClick={()=>{window.location.href=`/profile/${item}`}} />
                                    </div>
                                    <div className={`w-[12px] h-[12px] rounded-[6px] ${item.status === 'online'? 'bg-green-500':'bg-yellow-500'} relative right-6 top-4`} />
                                    <div className="text-lg relative right-2">{item}</div>
                                </div>
                                <div className='w-max flex justify-between'>
                                    <IconCopyAdd onClick={()=>{inviteFriend(item)}} className='text-blue-400 cursor-pointer hover:scale-125 ml-4' size='large' />
                                </div>
                            </div>
                        ))
                        }
                        {(friendList.length === 0) && <div className="text-center text-gray-400 text-xl relative top-[40px]">No friends yet.</div>}
                    </div>
                </div>
            </Modal>
        </div>
    );
}