import { IconUser, IconHome, IconKey } from '@douyinfe/semi-icons';
import { Image } from '@douyinfe/semi-ui';

const indexItem = [
    {
        id: 1,
        icon: <IconHome size='extra-large' className='cursor-pointer' />,
        iconSelected: <IconHome size='extra-large' className='cursor-pointer text-white' />,
        url: '/'
    },
    {
        id: 2,
        icon: <IconUser size='extra-large' className='cursor-pointer' />,
        iconSelected: <IconUser size='extra-large' className='cursor-pointer text-white' />,
        url: '/profile'
    }
]

export default function Header() {

    return (
        // header component
        <div className="fixed w-[60px] h-screen bg-[#F1F1F1] flex flex-col items-center">
            <Image className='pb-8 pt-2' src={require('../../logo.png')} />
            <div className='h-[120px] flex flex-col justify-between'>
                {indexItem.map((item, i) => (
                    <div 
                        key={item.id} 
                        className={`w-[60px] h-[60px] flex justify-center items-center ${window.location.pathname === item.url ? 'bg-[#006DF0]' : ''}`} 
                        onClick={() => {
                            window.location.href = item.url;
                        }}>
                        {window.location.pathname === item.url ? item.iconSelected:item.icon}
                    </div>
                ))}
            </div>
            <div className='fixed bottom-4'>
                <IconKey size='extra-large' className='cursor-pointer' onClick={()=>{window.location.href="/login"}} />
            </div>
        </div>
    )
}