"use client";
import { useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import Navbar from '../components/ui/Navbar';
export default function AskForm() {
    const router = useRouter();
    const [tags, setTags] = useState([]);
    const [form, setForm] = useState({
        title: '',
        question: '',
        tags: [],
        ispublic: false,
    });
    const [warnings, setWarnings] = useState({
        title: '',
        question: '',
        tags: ''
    });
   
    const handleTagInput = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            if (tags.length < 5) {
                setTags([...tags, e.target.value]);
                setForm({ ...form, tags: [...tags, e.target.value] });
                e.target.value = '';
            } else {
                alert("You can only add up to 5 tags.");
            }
        }
    };

    const removeTag = (indexToRemove) => {
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(newTags);
        setForm({ ...form, tags: newTags });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasWarnings = false;
        let newWarnings = { title: '', question: '', tags: '' };

        if (form.title === '') {
            newWarnings.title = 'Question title cannot be empty.';
            hasWarnings = true;
        }
        if (form.question.split(' ').length < 10) {
            newWarnings.question = 'Detailed explanation must be at least 10 words.';
            hasWarnings = true;
        }
        if (tags.length === 0) {
            newWarnings.tags = 'You must add at least one tag.';
            hasWarnings = true;
        }
        setWarnings(newWarnings);
        if (hasWarnings) {
            return;
        }

        const token = window.sessionStorage.getItem("token");
        console.log(form);
        try {
            const res = await axios.post('https://zcoder-zac7.onrender.com/api/problem/ask', form, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            if (res.data.success) {
                alert(`${res.data.message}`);
                router.push('/'); // Add your desired redirect path
            } else {
                alert(`${res.data.message}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <Navbar />
        <div className="px-10 py-5 bg-gray-100 dark:bg-black dark:text-white" >
            <div className="heading text-3xl font-bold mb-3 dark:text-white">Ask Question</div>
            <div className="question-title mb-6 mt-5">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Question Title <span className="star text-red-600 text-sm">*</span>
                </label>
                <input
                    type="text"
                    id="default-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <label htmlFor="default-input" className="caution text-violet-400 text-small mt-1">
                    Be specific and imagine you are asking a question to another person.
                </label>
                {warnings.title && <div className="text-red-500 text-xs font-semibold mt-1">{warnings.title}</div>}
            </div>

            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Detailed explanation of your problem <span className="star text-red-600 text-normal">*</span>
            </label>
            <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-72"
                placeholder="Write your thoughts here..."
                onChange={(e) => setForm({ ...form, question: e.target.value })}
            ></textarea>
            {warnings.question && <div className="text-red-500 text-xs font-semibold mt-1">{warnings.question}</div>}

            <div className="tags-input-container my-5">
                <label htmlFor="tags-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Input Tags <span className="star text-red-500 text-sm">*</span>
                </label>
                <input
                    type="text"
                    id="tags-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1"
                    placeholder="Press enter to add tags"
                    onKeyDown={handleTagInput}
                />

                <div className="tags-list">
                    {tags.map((tag, index) => (
                        <div key={index} className="inline-flex items-center bg-blue-100 text-blue-500 text-xs font-medium me-2 px-2.5 py-1.5 rounded dark:bg-blue-900 dark:text-blue-300 uppercase">
                            {tag}
                            <button type="button" className="ml-2 text-red-500" onClick={() => removeTag(index)}>x</button>
                        </div>
                    ))}
                </div>
                {warnings.tags && <div className="text-red-500 text-xs font-semibold mt-1">{warnings.tags}</div>}
            </div>
            <div className="flex mb-4">
                <div className="flex items-center h-5">
                    <input
                        id="helper-checkbox"
                        aria-describedby="helper-checkbox-text"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={form.ispublic}
                        onChange={(e) => setForm({ ...form, ispublic: e.target.checked })}
                    />
                </div>
                <div className="ms-2 text-sm">
                    <label htmlFor="helper-checkbox" className="font-medium text-gray-900 dark:text-gray-300">Public the Question</label>
                    <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500 dark:text-gray-400">Public questions will be shown on the dashboard of other users</p>
                </div>
            </div>
            <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 mt-2" onClick={handleSubmit} >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Ask a question
                </span>
            </button>
        </div>
        </>
    );
}
