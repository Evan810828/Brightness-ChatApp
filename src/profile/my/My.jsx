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
                            <span>Age: 24</span>
                        </div>
                        <div>
                            <span>School: Rice University</span>
                        </div>
                        <div>
                            <span>Interests: Attending Prof. Mack's Lectures</span>
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