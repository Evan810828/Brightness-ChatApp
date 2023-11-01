import { Avatar, Button, Icon, Input, TextArea } from "@douyinfe/semi-ui";
import { IconEdit } from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import { avatarLinks } from "../../components/avatar";

export default function My(params) {
    const [userData, setUserData] = useState(null);
    const [edit, setEdit] = useState(false);
    const [age, setAge] = useState(0);
    const [school, setSchool] = useState('');
    const [interests, setInterests] = useState("");
    const [description, setDescription] = useState("");

    const username = params.username;
    const base = "https://dg76-comp504-chat-api-0a154efee1fc.herokuapp.com"

    const getUserInfo = () => {
        fetch(base+`/user/${username}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setUserData(data);
            }
        });
    }

    const updateUserInfo = () => {
        fetch(base+`/user/setInfo`, {method:"POST",body: JSON.stringify({
            userName: username,
            newSchool: school,
            newInterests: interests.replace(/\s/g, '').split(','),
            newDescription: description
          })
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setUserData(data);
                getUserInfo();
            }
        });
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return(
        <div className="py-8">
            {userData && <div className="flex">
                <div className="!w-[150px] !h-[150px] !rounded-[75px] !shadow-lg mr-8">
                    <Avatar className="!w-[150px] !h-[150px]" src={avatarLinks[userData.avatar]} />
                </div>
                <div className="w-full">
                    <div className="flex w-full justify-between items-center">
                        <div className="text-3xl font-semibold mb-4">{userData.username}</div>
                        {!edit?<IconEdit className="ml-2 text-slate-500 cursor-pointer" onClick={()=>{setEdit(true)}} />:
                        <div>
                            <Button className="ml-2" theme="solid" onClick={()=>{setEdit(false);updateUserInfo()}}>Save</Button>
                            <Button className="ml-2" type="danger" onClick={()=>{setEdit(false)}}>Cancel</Button>
                        </div>
                        }
                    </div>
                    <div>
                        <div className="flex items-center">
                            <span>Age: {userData.age}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="flex items-center">School: {edit?<Input className="ml-2" defaultValue={userData.school} value={school} onChange={(value, e)=>{setSchool(value)}} />:userData.school}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="flex items-center">Interests: {edit?<Input className="ml-2 mt-2" defaultValue={userData.interests} value={interests} onChange={(value, e)=>{setInterests(value)}} />:userData.interests.map(
                                item=>{
                                    // replace the " with nothing and add comma if it is not the last item
                                    if (userData.interests.indexOf(item) !== userData.interests.length - 1) {
                                        return item.replace(/"/g, '') + ", ";
                                    }
                                    return item.replace(/"/g, '')
                                }
                            )}</span>
                        </div>
                        <div>
                            <span className="my-2 text-red-500">Your messages have been detected as hate speech for <span className="font-bold text-xl">{userData.hateSpeechCounter}</span> time. You will be banned when it reaches 10.</span>
                        </div>
                        <div className="mt-4">
                            <span className="text-slate-500">
                            {edit?
                            <div>
                                Description
                                <TextArea className="mt-2 " value={description} onChange={(value, e)=>{setDescription(value)}} />
                            </div>
                            :userData.description}
                            </span>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}