import { Image, Tabs, TabPane, Input, Switch, Modal, Toast, Button } from '@douyinfe/semi-ui';
import { IconEdit, IconCopyAdd, IconVolume2, IconExit, IconMute  } from '@douyinfe/semi-icons';
import { docCookies } from '../../components/header/cookie';
import { useEffect, useState } from 'react';
import { avatarLinks } from '../../components/avatar';

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
    const [reportedUSer, setReportedUSer] = useState([]);
    const [bannedUsers, setBannedUsers] = useState([]);
    const [banReason, setBanReason] = useState('');
    const [banModalVisible, setBanModalVisible] = useState(false);
    const [bannedUser, setBannedUser] = useState(undefined)
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [reportedUser, setReportedUser] = useState(undefined);

    
    const [friendList, setFriendList] = useState([]);
    const base = "https://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com"

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
    }, []);

    const getRoomMembers = () => {
        fetch(base+`/list/chatroom/members/${params.roomDetails.roomName}`, {method:"GET"}).then(res => {
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
        fetch(base+`/chatroom/admin/${params.roomDetails.roomName}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                if(data.username === docCookies.getItem("username")){
                    setAdminStatus(true);
                } else {
                    setAdminStatus(false);
                }
            }
        });
    }

    const inviteFriend = (friendName) => {
        fetch(base+`/chatroom/invite/${roomDetails.roomName}`, {method:"POST",body: JSON.stringify({
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
        fetch(base+`/chatroom/setRoomName`, {method:"POST",body: JSON.stringify({
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
        fetch(base+`/chatroom/leave/${roomDetails.roomName}`, {method:"POST",body: JSON.stringify({
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
        fetch(base+`/chatroom/block`, {method:"POST",body: JSON.stringify({
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
                getBlockList();
            }
        });
    }

    const getBlockList = () => {
        fetch(base+`/user/blockList/${docCookies.getItem('username')}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            setBlockedUsers(data.blockList)
        });
    }

    const unblockUser = (username) => {
        fetch(base+`/chatroom/unblock`, {method:"POST",body: JSON.stringify({
            senderName: docCookies.getItem("username"),
            receiverName: username,
        })}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                Toast.success("User unblocked!");
                setRoomDetails(params.roomDetails);
                getRoomMembers();
                getBlockList();
            }
        });
    }

    const reportUser = (username) => {
        fetch(base+`/chatroom/report`, {method:"POST", body: JSON.stringify({
            username: username,
            senderUsername: docCookies.getItem("username"),
            reason: reportReason,
            roomName: roomDetails.roomName
        })}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            Toast.success("User reported!");
            setReportModalVisible(false);
            getReportedUSers();
        });
    }

    const getReportedUSers = () => {
        fetch(base+`/list/chatroom/reported/${params.roomDetails.roomName}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setReportedUSer(data.reportedUsers);
            }
        });
    }

    const banUser = (username) => {
        fetch(base+`/chatroom/ban`, {method:"POST",body: JSON.stringify({
            username: username,
            senderUsername: docCookies.getItem("username"),
            reason: banReason,
            roomName: roomDetails.roomName
        })}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                Toast.success("User banned!");
                setRoomDetails(params.roomDetails);
                getRoomMembers();
                getBannedUsers();
            }
        });
    }

    const getBannedUsers = () => {
        fetch(base+`/list/chatroom/banned/${params.roomDetails.roomName}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setBannedUsers(data.bannedUsers);
            }
        });
    }

    useEffect(() => {
        setRoomDetails(params.roomDetails);
        setNewRoomName(params.roomDetails.roomName)
        getRoomMembers();
        getAdminStatus();
        getReportedUSers();
        getBannedUsers();
        getBlockList();
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
                                    {(item.username!==docCookies.getItem('username'))?<div className='flex items-center w-[70%] justify-between'>
                                        {blockedUsers?
                                            ((blockedUsers.indexOf(item.username) === -1)?
                                            <IconVolume2 className='text-blue-400 cursor-pointer hover:scale-125' size='large' onClick={()=>{blockUser(item.username)}} />:
                                            <IconMute className='text-slate-400 cursor-pointer hover:scale-125' size='large' onClick={()=>{unblockUser(item.username)}} />):null
                                        }
                                        {(adminStatus)?
                                            (
                                                <div className='flex'>
                                                    <button className='bg-red-400 text-white px-3 py-1 rounded-lg text-sm ml-4' onClick={()=>{
                                                        setBanModalVisible(true);
                                                        setBannedUser(item.username);
                                                    }}>Ban</button>
                                                </div>
                                            )
                                            :
                                            <button className='bg-red-400 text-white px-3 py-1 rounded-lg text-sm' onClick={()=>{setReportedUser(item.username);setReportModalVisible(true)}}>Report</button>
                                        }
                                    </div>:
                                    <div className='flex items-center w-[70%] justify-start'>
                                        <IconExit className='text-red-400 !text-xl cursor-pointer' onClick={()=>{kickUser(docCookies.getItem('username'))}} />
                                    </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Delinquent Users" itemKey='3'>
                    <div>
                        <div className='text-xl font-bold'>Reported Users</div>
                        <div className='p-4'>{reportedUSer&&reportedUSer.map((item, i)=>{
                            return(
                                <div key={item} className='mb-3 flex w-full items-center'>
                                    <div className='flex items-center w-[70%] cursor-pointer' onClick={()=>{window.location.href=`/profile/${item.username}`}}>
                                        <img className="!w-[40px] !h-[40px] !rounded-[20px]" src={avatarLinks[item.avatar]} />
                                        <div className='ml-2'>{item.username}</div>
                                    </div>
                                </div>
                            )
                        })}</div>
                    </div>
                    <div>
                        <div className='text-xl font-bold'>Banned Users</div>
                        <div className='p-4'>{bannedUsers&&bannedUsers.map((item, i)=>{
                            return(
                                <div key={item} className='mb-3 flex w-full items-center'>
                                    <div className='flex items-center w-[70%] cursor-pointer' onClick={()=>{window.location.href=`/profile/${item.username}`}}>
                                        <img className="!w-[40px] !h-[40px] !rounded-[20px]" src={avatarLinks[item.avatar]} />
                                        <div className='ml-2'>{item.username}</div>
                                    </div>
                                </div>
                            )
                        })}</div>
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
            <Modal visible={banModalVisible} onCancel={()=>{setBanModalVisible(false)}} footer={null} header={null}>
                <div className='p-4'>
                    <div>
                        <div className='mb-2'>Please specify your reason here</div>
                        <Input className="w-full" value={banReason} onChange={(value,e)=>{setBanReason(value)}} placeholder={"Ban reason"} />
                    </div>
                    <div className='w-full flex justify-end'>
                        <Button className="mt-4" onClick={()=>{setBanModalVisible(false)}}>Cancel</Button>
                        <Button className="mt-4 ml-2" onClick={()=>{banUser(bannedUser);setBanModalVisible(false)}}>Ban</Button>
                    </div>
                </div>
            </Modal>
            <Modal visible={reportModalVisible} onCancel={()=>{setReportModalVisible(false)}} footer={null} header={null}>
                <div className='p-4'>
                    <div>
                        <div className='mb-2'>Please specify your reason here</div>
                        <Input className="w-full" value={reportReason} onChange={(value,e)=>{setReportReason(value)}} placeholder={"Report reason"} />
                    </div>
                    <div className='w-full flex justify-end'>
                        <Button className="mt-4" onClick={()=>{setReportModalVisible(false)}}>Cancel</Button>
                        <Button className="mt-4 ml-2" onClick={()=>{reportUser(reportedUser);setReportModalVisible(false)}}>Report</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}