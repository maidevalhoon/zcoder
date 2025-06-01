"use client"
import { useEffect, useState } from "react";
import axios from "axios";

const Testareaanswer = ({_id}) => {
    console.log(_id)
    const [addAnswer, setAddAnswer] = useState({
        user_id: "",
        name: "",
        answer: "",
    });
    useEffect(() => {
    const userdetails=async()=>{
        const token = window.sessionStorage.getItem("token");
        try {
            const res = await axios.get("https://zcoder-zac7.onrender.com/api/getAuth", {
                headers: {
                    'Authorization': `${token}`,
                },
            });
            console.log(res.data);
            setAddAnswer({...addAnswer,user_id:res.data._id,name:res.data.name});
        } catch (err) {
            console.log(err);
        }
    }
    userdetails();
},[addAnswer]);
    const handleanswer = async () => {
        const token = window.sessionStorage.getItem("token");
        try {
            if(addAnswer.answer===""){
                alert("Please enter the answer first");
                return;
            }
            const res = await axios.post(`https://zcoder-zac7.onrender.com/api/problem/${_id}/answer`, addAnswer, {
                headers: {
                    'Authorization': `${token}`,
                },
            });
            console.log(res.data);
            setAddAnswer("");
            // window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <form className="answerbox my-5">
                <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="comment" className="sr-only">Your answer</label>
                        <textarea id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 h-56" placeholder="Write a answer..." required onChange={(e)=>setAddAnswer({...addAnswer,answer:e.target.value})}></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" onClick={handleanswer}>
                            Post Answer
                        </button>
                    </div>
                </div>
            </form>

        </>
    )
}
export default Testareaanswer;