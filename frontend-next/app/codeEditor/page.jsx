"use client";

import React,{useState , useEffect} from 'react'
import LanguagesDropdown from '../components/LanguagesDropdown'
import ThemeDropdown from '../components/ThemeDropdown'
import CodeEditorWindow from '../components/CodeEditorWindow'
import OutputWindow from '../components/OutputWindow'
import OutputDetails from '../components/OutputDetails'
import CustomInput from '../components/CustomInput'


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
        } else {
            console.log('action not defined');
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
    useEffect(() => {
        defineTheme("oceanic-next").then((_) =>
            setTheme({ value: "oceanic-next", label: "Oceanic Next" })
        );
    }, []);


    return (
        <>
            <div className="flex flex-row">
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
            <div className="flex flex-row space-x-4 items-start px-4 py-4">
                <div className="flex flex-col w-full h-full justify-start items-end">
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
                            // onClick={handleCompile}
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
        </>
    )
}

export default EditorPage