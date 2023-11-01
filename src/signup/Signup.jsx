import { Button, DatePicker, Image, Input, Toast } from '@douyinfe/semi-ui';
import { useState } from 'react';
import { docCookies } from '../components/header/cookie';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [school, setSchool] = useState('');
    const [interests, setInterests] = useState('');
    const [birthday, setBirthday] = useState('');
    const base = "https://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com"
    const handleSubmit = () => {
        if (username === '' || password === '' || confirmPassword === '' || school === '' || interests === '') {
            Toast.error("Please fill in all the information!");
            return;
        }
        if (password !== confirmPassword) {
            Toast.error("Password and confirm password are not the same!");
            return;
        }
        // remove the whitespaces and split the interests
        const interestsList = interests.replace(/\s/g, '').split(',');
        fetch(base+"/register", {
            method: 'POST',
            body: JSON.stringify({
                "username": username,
                "pwd": password,
                "school": school,
                "birthDate": birthday,
                "interests": interestsList
            }),
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                if(data.result === "failed: user already exists") {
                    Toast.error("Failed to sign up, username already exists!");
                    return;
                }
                // store the username as the cookie
                docCookies.setItem("username", username, 1000, "/")
                window.location.href = "/";
            }
        });
    };

    return(
        <div className="min-h-screen flex bg-blue-100 justify-center">
            <div className='flex items-center'>
                <Image src={require('../cover.jpg')} />
            </div>
            <div className='flex flex-col items-center w-[50vw]'>
                <Image className='mt-[5vh] mb-[1vh] !w-[100px]' src={require('../logo.png')} />
                <h1 className='text-4xl mb-[4vh]'>
                    Welcome to Brightness!
                </h1>
                <div className="px-8 pt-6 pb-5 bg-white shadow-lg rounded-lg flex flex-col items-center min-w-[500px]">
                    <h2 className="text-2xl mb-8 font-semibold self-center">Sign up for your account</h2>
                    <div className='flex items-center mb-4 w-full'>
                        <span className='mr-2 w-[80px]'>Username: </span>
                        <Input className='!w-[300px]' value={username} onChange={(value, e)=>{setUsername(value)}}></Input>
                    </div>
                    <div className='flex items-center mb-4 w-full'>
                        <span className='mr-2 w-[80px]'>Password: </span>
                        <Input className='!w-[300px]' value={password} onChange={(value, e)=>{setPassword(value)}} mode="password"></Input>
                    </div>
                    <div className='flex items-center mb-4 w-full'>
                        <span className='mr-2 w-[80px]'>Confirm: </span>
                        <Input className='!w-[300px]' value={confirmPassword} onChange={(value, e)=>{setConfirmPassword(value)}} mode="password"></Input>
                    </div>
                    <div className='flex items-center mb-4 w-full'>
                        <span className='mr-2 w-[80px]'>Birthday: </span>
                        <DatePicker className='!w-[300px]' type="date" density="compact" value={birthday} onChange={(date, dateStr)=>{setBirthday(dateStr);}}/>
                    </div>
                    <div className='flex items-center mb-4 w-full'>
                        <span className='mr-2 w-[80px]'>School: </span>
                        <Input className='!w-[300px]' value={school} onChange={(value, e)=>{setSchool(value)}}></Input>
                    </div>
                    <div className='flex items-center mb-4 w-full'>
                        <span className='mr-2 w-[80px]'>Interests: </span>
                        <Input className='!w-[300px]' value={interests} placeholder={"user comma to separate your interests"} onChange={(value, e)=>{setInterests(value)}}></Input>
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