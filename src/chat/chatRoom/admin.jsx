import { Image, Tabs, TabPane, Input } from '@douyinfe/semi-ui';
import { IconEdit, IconCopyAdd, IconVolume2 } from '@douyinfe/semi-icons';
import { useState } from 'react';

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

    return(
        <div className="py-4 px-1 md:w-[600px] md:h-[500px] fixed bg-white right-8 top-8 z-[100] rounded-xl shadow-xl">
            <Tabs tabPosition='left' type='line' activeKey={activeKey} defaultActiveKey='1' onChange={(e)=>{setActiveKey(e)}}>
                <TabPane tab="Overview" itemKey='1'>
                    <div className='w-full h-full flex flex-col py-3 px-4'>
                        <Image className="w-[80px] h-[80px] !rounded-[40px] mr-4" src={require('../../chatBackground.jpg')} />
                        <div className='flex items-center mt-4'>
                            <div className='text-xl mr-4'>COMP504 Family</div>
                            <IconEdit className='text-slate-400 cursor-pointer' />
                        </div>
                        <div className='text-slate-500 flex flex-col w-[70%] justify-start mt-4'>
                            <div className=''>Members: 14</div>
                            <div className='text-sm mt-2'>Created at 01 Jan 2023 GMT</div>
                        </div>
                        <div>
                            <div className='mt-6 flex items-center'>
                                <div className='mr-4'>Description</div>
                                <IconEdit className='text-slate-400 cursor-pointer' />
                            </div>
                            <div className='text-slate-500 text-sm mt-2'>
                                This is a dedicated space for all students, faculty, 
                                and alumni of COMP504 to come together, share, learn, and bond. 
                                Whether you're reminiscing about past projects, discussing the latest tech trends, 
                                seeking guidance on assignments, 
                                or just wanting to catch up with familiar faces, this chat room is the place to be.
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Members" itemKey='2'>
                    <div className='w-full h-full flex flex-col py-3 px-4'>
                        <div className='text-xl flex font-semibold'>Participants: <div className='ml-2'>(14)</div></div>
                        <Input className='w-[70%] mt-4' placeholder='Search for participants'></Input>
                        <div className='mt-6 w-[70%] px-2 flex cursor-pointer hover:scale-[1.01]'>
                            <IconCopyAdd className='!text-2xl mr-3'/>
                            <div>Add Members</div>
                        </div>
                        <div className='mt-4 h-[300px] overflow-y-auto'>
                            {membersList.map((item) => (
                                <div key={item.id} className='mb-2 flex w-full items-center'>
                                    <div className='flex items-center w-[40%]'>
                                        <img className="!w-[40px] !h-[40px] !rounded-[20px]" src={item.avatar} />
                                        <div className='ml-2'>{item.name}</div>
                                    </div>
                                    <div className='text-sm text-gray-400 w-[40%]'>Joined {item.joinTime}</div>
                                    <div className='flex items-center w-[30%] justify-between'>
                                            <IconVolume2 className='text-blue-400 cursor-pointer hover:scale-125' size='large' />
                                            <button className='bg-red-400 text-white px-2 py-1 rounded-lg text-sm mt-2'>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
}