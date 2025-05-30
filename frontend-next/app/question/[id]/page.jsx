"use client"
import auth from "@/app/auth/auth";
import axios from "axios"
import { useEffect, useState } from "react"
// import { CiClock2 } from "react-icons/ci";
import { useRouter } from "next/navigation";

const questionPage = (context) => {
    const _id = context.params.id;
    console.log(context.params.id);
    const [question_, setquestion_] = useState(null);
    useEffect(async () => {
        const token = window.localStorage.getItem("token");
        try {
            const response = await axios.get(`http://localhost:5050/api/problem/${_id}`, {
                headers: {
                    'Authorization': `${token}`,
                },
            });
            setquestion_(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);
    let title, question, answers, platfrom, tag, date;
    if (question_) {
        ({ title, question, answers, platfrom, tag, date } = question_);
    }
    // console.log(title)
    // const currentTime = new Date();
    // const problemTime = new Date(date);
    // const timeDifference = Math.abs(currentTime - problemTime);
    // const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    // let timeAgo = `${daysDifference} days ago`;
    // if (daysDifference == 0 && hoursDifference == 0 && minutesDifference < 2) {
    //     timeAgo = `Just Now`;
    // }
    // else if (daysDifference == 0 && hoursDifference == 0) {
    //     timeAgo = `${minutesDifference} minutes ago`;
    // } else if (daysDifference == 0 && minutesDifference > 0) {
    //     timeAgo = `${hoursDifference} hours ago`;
    // }
    // const no_of_answers = answers.length;
    return (
        <>
            <div className="username font-medium text-sm dark:text-white text-black">Shivam Gupta</div>
            <h5 className="title text-xl ">Two Sum Problem</h5>
            <div className="flex item-center mt-1">
                {/* <div className="time_icon"><CiClock2 /></div> */}
                <div className="time text-sm font-light mx-1">- asked 1 minute ago</div>
                <div className="answerno font-light">7 answers</div>
            </div>
        </>
    )
}
export default auth(questionPage);