import { Button, Image, Input } from '@douyinfe/semi-ui';
import { useState } from 'react';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        window.location.href = "/";
    };

    return(
        <div className="min-h-screen flex bg-blue-100 justify-center">
            <div className='flex items-center'>
                <Image src={require('../cover.jpg')} />
            </div>
            <div className='flex flex-col items-center w-[50vw]'>
                <Image className='mt-[15vh] mb-[2vh]' src={require('../logo.png')} />
                <h1 className='text-4xl mb-[6vh]'>
                    Welcome to Brightness!
                </h1>
                <div className="px-8 pt-6 pb-6 bg-white shadow-lg rounded-lg flex flex-col items-center min-w-[400px]">
                    <h2 className="text-2xl mb-8 font-semibold self-center">Sign up for your account</h2>
                    <div className='flex items-center mb-4 w-full'>
                        <span className='mr-2 w-[80px]'>Username: </span>
                        <Input className='!w-[200px]' value={username}></Input>
                    </div>
                    <div className='flex items-center mb-4 w-full'>
                        <span className='mr-2 w-[80px]'>Password: </span>
                        <Input className='!w-[200px]' value={password}></Input>
                    </div>
                    <div className='flex items-center mb-4 w-full'>
                        <span className='mr-2 w-[80px]'>Confirm: </span>
                        <Input className='!w-[200px]' value={confirmPassword}></Input>
                    </div>
                    <div className='mt-6'>
                        <Button type='primary' theme='solid' size='large' className='!text-base !bg-[#006DF0]' onClick={handleSubmit}>
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}