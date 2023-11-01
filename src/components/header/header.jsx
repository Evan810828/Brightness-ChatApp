import { IconUser, IconHome, IconKey, IconUserGroup } from '@douyinfe/semi-icons';
import { Image } from '@douyinfe/semi-ui';
import { docCookies } from './cookie';

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
        url: '/profile/' + docCookies.getItem("username")  // profile plus the username from cookie
    },
    {
        id: 3,
        icon: <IconUserGroup size='extra-large' className='cursor-pointer' />,
        iconSelected: <IconUserGroup size='extra-large' className='cursor-pointer text-white' />,
        url: '/social'
    }
]

export default function Header() {
    const base = "https://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com"

    const logout = () => {
        fetch(base+`/user/setActive`, {method:"POST", body: JSON.stringify({
            username: docCookies.getItem("username"),
            activeStatus: false
          })
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
            }
        });
        docCookies.removeItem("username")
        window.location.href="/login"
    }

    return (
        // header component
        <div className="fixed w-[60px] h-screen bg-[#F1F1F1] flex flex-col items-center">
            <Image className='pb-8 pt-2 w-12' src={require('../../logo.png')} />
            <div className='h-[180px] flex flex-col justify-between'>
                {indexItem.map((item, i) => (
                    <div 
                        key={item.id} 
                        className={`rounded-sm w-[60px] h-[60px] cursor-pointer flex justify-center items-center ${window.location.pathname.split("/")[1] === item.url.split("/")[1] ? 'bg-[#006DF0]' : 'hover:bg-[#006DF032]'}`} 
                        onClick={() => {
                            window.location.href = item.url;
                        }}>
                        {window.location.pathname.split("/")[1] === item.url.split("/")[1] ? item.iconSelected:item.icon}
                    </div>
                ))}
            </div>
            <div className='fixed bottom-4'>
                <IconKey size='extra-large' className='cursor-pointer hover:scale-[1.1]' onClick={logout} />
            </div>
        </div>
    )
}