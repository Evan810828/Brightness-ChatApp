import { Avatar, Icon, Toast } from "@douyinfe/semi-ui";
import { IconEdit } from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import { docCookies } from "../../components/header/cookie";
import { IconUserAdd } from "@douyinfe/semi-icons";
import { avatarLinks } from "../../components/avatar";

export default function Other(params) {
    const [userData, setUserData] = useState(null);

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

    const addFriend = () => {
        fetch(base+`/user/friends/invite`, {method:"POST",
            body: JSON.stringify({
                username: username,
                senderUsername: docCookies.getItem("username")
              })
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                if(data.result === "success"){
                    Toast.success("Friend request sent!");
                }
            }
        });
    }

    const [friendList, setFriendList] = useState([]);

    const getFriendList = () => {
        fetch(base+`/user/friends/${docCookies.getItem("username")}`, {method:"GET"}).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setFriendList(data.usernames);
            }
        });
    }

    useEffect(() => {
        getFriendList();
        getUserInfo();
    }, [username]);

    return(
        <div className="py-8">
            {userData && <div className="flex">
                <div className="!w-[150px] !h-[150px] !rounded-[75px] !shadow-lg mr-8">
                    <Avatar className="!w-[150px] !h-[150px]" src={avatarLinks[userData.avatar]} />
                </div>
                <div className="w-max">
                    <div className="flex w-full justify-between items-center">
                        <div className="text-3xl font-semibold mb-4">{username}</div>
                    </div>
                    <div>
                        <div className="flex items-center">
                            <span>Age: {userData.age}</span>
                        </div>
                        <div className="flex items-center">
                            <span>School: {userData.school}</span>
                        </div>
                        <div className="flex items-center">
                            <span>Interests: {userData.interests.map(
                                item=>{
                                    // replace the " with nothing and add comma if it is not the last item
                                    if (userData.interests.indexOf(item) !== userData.interests.length - 1) {
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
            </div>}
            {friendList.indexOf(username) === -1 ? 
            <div className="w-full flex justify-center pt-6">
                <div className="flex items-center cursor-pointer hover:bg-blue-500 rounded px-3 py-2 hover:!text-white hover:shadow-lg hover:scale-[1.1]" onClick={addFriend}>
                    <IconUserAdd className="!text-2xl mr-3" type="plus-circle" />
                    Add Friend
                </div>
            </div>:null
            }
        </div>
    );
}