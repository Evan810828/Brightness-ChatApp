import { Image } from "@douyinfe/semi-ui";
import {IconCopyAdd} from '@douyinfe/semi-icons';

const data = [
    {
        id: 1,
        group_name: 'Group 1',
        group_avatar: '../chatBackground.jpg',
        number_of_members: 5,
        status: 0,
    },
    {
        id: 2,
        group_name: 'Group 2',
        group_avatar: '../chatBackground.jpg',
        number_of_members: 5,
        status: 0,
    },{
        id: 3,
        group_name: 'Group 3',
        group_avatar: '../chatBackground.jpg',
        number_of_members: 5,
        status: 1,
    },{
        id: 4,
        group_name: 'Group 4',
        group_avatar: '../chatBackground.jpg',
        number_of_members: 5,
        status: 1,
    },{
        id: 5,
        group_name: 'Group 5',
        group_avatar: '../chatBackground.jpg',
        number_of_members: 5,
        status: 1,
    },{
        id: 6,
        group_name: 'Group 6',
        group_avatar: '../chatBackground.jpg',
        number_of_members: 5,
        status: 1,
    },{
        id: 7,
        group_name: 'Group 7',
        group_avatar: '../chatBackground.jpg',
        number_of_members: 5,
        status: 1,
    },{
        id: 8,
        group_name: 'Group 8',
        group_avatar: '../chatBackground.jpg',
        number_of_members: 5,
        status: 1,
    },{
        id: 9,
        group_name: 'Group 9',
        group_avatar: '../chatBackground.jpg',
        number_of_members: 5,
        status: 1,
    },
]

export default function Social() {
    return(
        <div className="ml-[60px] px-36 py-16 w-full min-h-screen">
            <div className="text-3xl font-bold">Find Others</div>
            <div className="grid grid-cols-4 gap-8 mt-8 w-full">
                {data.map((item, i) => (
                    <div className="bg-white rounded-xl shadow-xl w-[250px] h-[240px] hover:scale-[1.1]">
                        <Image className="w-full h-[70%]" src={require('../chatBackground.jpg')} />
                        <div className="px-4 py-1 flex w-full justify-between">
                            <div>
                                <div>{item.group_name}</div>
                                <div className="font-light text-sm">{item.number_of_members} members</div>
                            </div>
                            <div>
                                {item.status === 0 ? 
                                    <IconCopyAdd className="text-[#006DF0A1] !text-2xl cursor-pointer hover:scale-[1.1]" /> : 
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