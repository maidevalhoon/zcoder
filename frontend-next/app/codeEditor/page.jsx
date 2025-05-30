"use client";

import React, { useState, useEffect } from 'react'
import LanguagesDropdown from '../components/LanguagesDropdown'
import ThemeDropdown from '../components/ThemeDropdown'
import CodeEditorWindow from '../components/CodeEditorWindow'
import OutputWindow from '../components/OutputWindow'
import OutputDetails from '../components/OutputDetails'
import CustomInput from '../components/CustomInput'
import Navbar from '../components/ui/Navbar';
import axios from "axios";


import { defineTheme } from "../lib/defineTheme";
import { languageOptions } from "../constants/languageOptions";


const defaultCode = "console.log('Hello World');";


const EditorPage = () => {
    const [language, setLanguage] = useState(languageOptions[0]);
    const [theme, setTheme] = useState("cobalt");
    const [code, setCode] = useState(defaultCode)
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);


    const onSelectChange = (sl) => {
        // console.log("selected Option...", sl);
        setLanguage(sl);
    };

    const onChange = (action, data) => {
        if (action === "code") {
            setCode(data);
        }
    };
    function handleThemeChange(th) {
        const theme = th;

        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);
        } else {
            defineTheme(theme.value).then((_) => setTheme(theme));
        }
        // console.log("theme...", theme);
    }
    const handleCompile = () => {
        // console.log(process.env.NEXT_PUBLIC_RAPID_API_URL);
        setProcessing(true);
        const formData = {
            language_id: language.id,
            // encode source code in base64
            source_code: btoa(code),
            stdin: btoa(customInput),
        };
        const options = {
            method: "POST",
            url: process.env.NEXT_PUBLIC_RAPID_API_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
                'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
                'Content-Type': 'application/json'
            },
            data: formData,
        };

        axios
            .request(options)
            .then(function (response) {
                // console.log("res.data", response.data);
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                // get error status
                let status = err.response ? err.response.status:err;
                console.log("status", status);
                if (status === 429) {
                    console.log("too many requests", status);

                    showErrorToast(
                        `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
                        10000
                    );
                }
                setProcessing(false);
                console.log("catch block...", error);
            });
    };

    const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
                'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST
            }
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                // console.log("response.data", response.data);
                return;
            }
        } catch (err) {
            console.log("err", err);
            setProcessing(false);
        }
    };

    useEffect(() => {
        defineTheme("oceanic-next").then((_) =>
            setTheme({ value: "oceanic-next", label: "Oceanic Next" })
        );
    }, []);


    return (
        <React.Fragment>
        <Navbar/>
        <div className='h-fit'>
        <div className="flex md:flex-row flex-col items-center">
            <div className="px-4 py-2">
                <LanguagesDropdown
                    onSelectChange={onSelectChange}
                    language={language}
                />
            </div>
            <div className="px-4 py-2">
                <ThemeDropdown
                    handleThemeChange={handleThemeChange}
                    theme={theme}
                />
            </div>
        </div>
        <div className="flex md:flex-row flex-col space-x-4 items-start px-4 py-4">
            <div className="flex flex-col w-full md:h-full justify-start items-end">
                <CodeEditorWindow
                    code={code}
                    onChange={onChange}
                    language={language?.value}
                    theme={theme?.value}
                />
            </div>

            <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
                <OutputWindow
                    outputDetails={outputDetails}
                />
                <div className="flex flex-col items-end">
                    <CustomInput
                        customInput={customInput}
                        setCustomInput={setCustomInput}
                    />
                    <button
                        onClick={handleCompile}
                        disabled={!code}
                        className={
                            "backFill mt-5 border-2 border-black z-10 rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow hover:text-white transition duration-500 bg-white flex-shrink-0"
                            // !code ? "opacity-50" : ""
                        }
                    >
                        {processing ? "Processing..." : "Compile and Execute"}
                    </button>
                </div>
                {outputDetails &&
                    <OutputDetails
                        outputDetails={outputDetails}
                    />}
            </div>
        </div>
    </div>
        </React.Fragment>
        
    )
}

export default EditorPage