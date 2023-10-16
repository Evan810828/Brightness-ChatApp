import { IconMail, IconDelete } from '@douyinfe/semi-icons';

const friendList = [
    {
        name: "John",
        avatar: "https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp",
        status: "online",
    },
    {
        name: "John",
        avatar: "https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp",
        status: "online",
    },
    {
        name: "John",
        avatar: "https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp",
        status: "offline",
    },
    {
        name: "John",
        avatar: "https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp",
        status: "online",
    },
    {
        name: "John",
        avatar: "https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp",
        status: "offline",
    },

]

export default function Friends() {
    return(
        <div className="py-6">
            <div className="divide-y">
            <div className="pb-3 text-2xl font-bold">My Friends</div>
                {friendList.map((item, i) => (
                    <div key={i} className="flex items-center justify-between my-2 py-2">
                        <div className="flex items-center">
                            <div className="!w-[40px] !h-[40px] !rounded-[20px] !shadow-lg mr-4 flex">
                                <img className="!w-[40px] !h-[40px] !rounded-[20px]" src={item.avatar} />
                            </div>
                            <div className={`w-[12px] h-[12px] rounded-[6px] ${item.status === 'online'? 'bg-green-500':'bg-yellow-500'} relative right-6 top-4`} />
                            <div className="text-lg relative right-2">{item.name}</div>
                        </div>
                        <div className='w-16 flex justify-between'>
                            <IconMail className='text-[#78B9EB] cursor-pointer hover:scale-125' size='large' />
                            <IconDelete className='text-red-400 cursor-pointer hover:scale-125' size='large' />
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    );
}