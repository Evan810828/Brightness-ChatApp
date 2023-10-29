import { Avatar, Button, Icon } from "@douyinfe/semi-ui";
import { IconEdit } from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";

export default function My(params) {
    const [school, setSchool] = useState('');
    const [age, setAge] = useState('');
    const [interests, setInterests] = useState([]);

    const username = params.username;

    const getUserInfo = () => {
        fetch(`/user/${username}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setSchool(data.school);
                setAge(data.age);
                setInterests(data.interests);
            }
        });
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return(
        <div className="py-8">
            <div className="flex">
                <div className="!w-[150px] !h-[150px] !rounded-[75px] !shadow-lg mr-8">
                    <Avatar className="!w-[150px] !h-[150px]" src="https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp" />
                </div>
                <div className="w-max">
                    <div className="flex w-full justify-between items-center">
                        <div className="text-3xl font-semibold mb-4">{username}</div>
                        <IconEdit className="ml-2 text-slate-500 cursor-pointer" />
                    </div>
                    <div>
                        <div className="flex items-center">
                            <span>Age: {age}</span>
                        </div>
                        <div className="flex items-center">
                            <span>School: {school}</span>
                        </div>
                        <div className="flex items-center">
                            <span>Interests: {interests.map(
                                item=>{
                                    // replace the " with nothing and add comma if it is not the last item
                                    if (interests.indexOf(item) !== interests.length - 1) {
                                        return item.replace(/"/g, '') + ", ";
                                    }
                                    return item.replace(/"/g, '')
                                }
                            )}</span>
                        </div>
                        <div className="mt-6">
                            <span className="text-slate-500">
                            I'm a passionate learner who thrives in the heart of academic discussions. 
                            Being a regular attendee at Prof. Mack's lectures, I find myself constantly enlightened by the intricacies of our world. 
                            Outside of academia, I am an avid rock music enthusiast, with a penchant for exploring both classic and contemporary tracks. 
                            I believe in the power of continued learning and strive to bring a sense of curiosity and exploration to everything I do. 
                            Connect with me to dive into intellectual conversations or to simply jam to some classic rock tunes.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}