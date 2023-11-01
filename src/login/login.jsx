import { Button, Image, Input, Toast } from '@douyinfe/semi-ui';
import { useEffect, useState } from 'react';
import { docCookies } from '../components/header/cookie';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const base = "https://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com"

    const handleSubmit = () => {
        if (username === '' || password === '') {
            Toast.error("Username or password cannot be empty!");
            return;
        }
        fetch(base+"/login", {
            method: 'POST',
            body: JSON.stringify({
                "username": username,
                "pwd": password
            }),
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                if(data.result === "failed: user does not exist") {
                    Toast.error("Failed to login, check your username and password!");
                    return;
                }
                // store the username as the cookie
                docCookies.setItem("username", username, 999999999999, "/")
                window.location.href = "/";
            }
        });
    };

    document.onkeydown = function (event_e){
        if(window.event){
            event_e = window.event;
        }
        var int_keycode = event_e.charCode || event_e.keyCode;
        if(int_keycode == '13'){
            handleSubmit();
        }
    }

    return (
        <div className="min-h-screen flex bg-blue-100 justify-center">
            <div className='flex items-center'>
                <Image src={require('../cover.jpg')} />
            </div>
            <div className='flex flex-col items-center w-[50vw]'>
                <Image className='mt-[15vh] mb-[2vh]' src={require('../logo.png')} />
                <h1 className='text-4xl mb-[6vh]'>
                    Welcome to Brightness!
                </h1>
                <div className="px-8 pt-6 pb-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
                    <h2 className="text-2xl mb-8 font-semibold self-center">Login in to your account</h2>
                    <div className='flex items-center mb-4 w-full'>
                        <span className='mr-2 w-[80px]'>Username: </span>
                        <Input className='!w-[200px]' value={username} onChange={(value, e)=>{setUsername(value)}}></Input>
                    </div>
                    <div className='flex items-center mb-4'>
                        <span className='mr-2 w-[80px]'>Password: </span>
                        <Input className='!w-[200px]' value={password} onChange={(value, e)=>{setPassword(value)}}></Input>
                    </div>
                    <div className='w-full flex justify-between mt-1'>
                        <a className='text-blue-500 hover:underline cursor-pointer' onClick={()=>{window.location.href = "/signup"}}>Sign up</a>
                    </div>
                    <div className='mt-6'>
                        <Button type='primary' theme='solid' size='large' className='!text-base !bg-[#006DF0]' onClick={handleSubmit}>
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}