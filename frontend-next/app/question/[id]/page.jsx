"use client";
import auth from "@/app/auth/auth";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import { BiMessageAltCheck } from "react-icons/bi";
import Testareaanswer from "@/app/components/ui/textareaeditor";
import Navbar from "@/app/components/ui/Navbar";
const QuestionPage = ({ params }) => {
    const _id = params.id;
    const [question_, setQuestion_] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchQuestion = async () => {
            const token = window.sessionStorage.getItem("token");
            try {
                const response = await axios.get(`https://zcoder-zac7.onrender.com/api/problem/${_id}`, {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });
                setQuestion_(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestion();
    }, [_id]);

    if (loading) {
        return (<div>Loading...</div>); // Show a loading state while the data is being fetched
    }

    if (error) {
        return (<div>Error: {error.message}</div>); // Show an error message if the request fails
    }

    if (!question_) {
        return (<div>No data found</div>); // Handle the case where no question data is returned
    }
    console.log(question_);
    const { title, question, answers, tag, date,name } = question_.problems;
    const currentTime = new Date();
    const problemTime = new Date(date);
    const timeDifference = Math.abs(currentTime - problemTime);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    let timeAgo = `${daysDifference} days ago`;
    if (daysDifference === 0 && hoursDifference === 0 && minutesDifference < 2) {
        timeAgo = `Just Now`;
    } else if (daysDifference === 0 && hoursDifference === 0) {
        timeAgo = `${minutesDifference} minutes ago`;
    } else if (daysDifference === 0 && minutesDifference > 0) {
        timeAgo = `${hoursDifference} hours ago`;
    }
    const no_of_answers = answers ? answers.length : 0;
    const modifiedAnswers = answers.map((answer) => {
        const answerTime = new Date(answer.date);
        const timeDifference = Math.abs(currentTime - answerTime);
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let timeAgo_ = `${daysDifference} days ago`;
        if (daysDifference === 0 && hoursDifference === 0 && minutesDifference < 2) {
            timeAgo_ = `Just Now`;
        } else if (daysDifference === 0 && hoursDifference === 0) {
            timeAgo_ = `${minutesDifference} minutes ago`;
        } else if (daysDifference === 0 && minutesDifference > 0) {
            timeAgo_ = `${hoursDifference} hours ago`;
        }
        return {
            ...answer,
            timeAgo_
        };
    });

    // Update the answers with modifiedAnswers
    const updatedAnswers = modifiedAnswers.map((answer, index) => (
        <div key={index} className="answer mt-4">
            <div className="des flex gap-2 text-center mt-auto">
                <div className="answer__username font-medium text-sm dark:text-white text-black capitalize">{answer.name}</div>
                <div className="answer__time text-2 text-gray-600 dark:text-white flex text-center align-middle ">{answer.timeAgo_}</div>
            </div>
            <div className="answer__text mt-2 text-sm dark:text-white font-light" style={{ whiteSpace: 'pre-wrap' }}>{answer.answer}</div>
            <hr className="h-px my-5 mx-12 bg-gray-200 border-0 dark:bg-gray-700 "></hr>
        </div>
    ));
    return (
        <React.Fragment>
        <Navbar />
        <div className="dark:bg-black bg-gray-100 dark:text-white w-screen py-4 h-full text-black">
            <div className=" mx-14 h-auto">
            <div className="username font-medium text-sm dark:text-white text-black mt-8 capitalize">{name}</div>
            <h5 className="title text-2xl font-semibold mt-1">{title}</h5>
            <div className="flex item-center mt-1">
                <div className="askedtime flex align-center">
                    <FiClock className="text-gray-600 text-sm" />
                    <div className="time text-2 font-medium ml-1">- asked {timeAgo}</div>
                </div>
                <div className="answerblock flex ml-4 align-center">
                    <BiMessageAltCheck className="text-gray-600 text-sm" />
                    <div className="answerno text-2 font-light ml-1 flex"> {no_of_answers} answers</div>
                </div>
            </div>
            <div className="tags mt-2">
            {tag.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-500 text-2 font-medium me-2 px-3.5 py-1.5 rounded dark:bg-blue-900 dark:text-blue-300 uppercase">{tag}</span>
            ))}
            </div>
            <div className="question max-md mt-10 text-sm">{question}</div>
            <div className="answers">
                {no_of_answers === 0 && <div className="noanswer text-sm mt-4 font-semibold text-orange-300">No answers yet!</div>}
                {no_of_answers > 0 && (
                    <div className="answers mt-4">
                        <div className="text-sm font-normal text-yellow-500 mt-3">{no_of_answers} Answers</div>
                        {updatedAnswers}
                    </div>
                )}
                <div className="answereditor mt-6">
                    <div className="text-sm font-medium mt-4">Write your answer here</div>
                    <Testareaanswer _id={_id}/>
                </div>
            </div>
            </div>
        </div>

        </React.Fragment>
        
    );
}

export default auth(QuestionPage);
