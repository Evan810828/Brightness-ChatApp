import { Avatar } from "@douyinfe/semi-ui";

export default function My() {
    return(
        <div className="py-8">
            <div className="flex">
                <div className="!w-[150px] !h-[150px] !rounded-[75px] !shadow-lg mr-8">
                    <Avatar className="!w-[150px] !h-[150px]" src="https://cdn.trendhunterstatic.com/thumbs/476/akutar.jpeg?auto=webp" />
                </div>
                <div className="w-max">
                    <div className="text-3xl font-semibold mb-4">Akutar Banana</div>
                    <div>
                        <div>
                            <span>Email: ba254@rice.edu</span>
                        </div>
                        <div>
                            <span>Address: Rice University</span>
                        </div>
                        <div>
                            <span>Phone: 123456789</span>
                        </div>
                        <div className="mt-6">
                            <span className="text-slate-500">
                                My name is Riley See. I'm a recent elementary education graduate from Ball State University. 
                                I've been working at a camp for elementary children this summer, 
                                and I'm excited to find my first teaching position for the coming school year. 
                                I have several original lesson plans I created during my teaching internship that I look forward to implementing in my own classroom. 
                                I attended Brookwood Elementary myself and believe I would be a great fit for your second-grade opening. 
                                It would be a joy for me to teach students in the same place that sparked my love of learning.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}