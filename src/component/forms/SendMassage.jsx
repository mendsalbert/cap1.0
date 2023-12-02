"use client";
import { useState } from "react";
import Quill from "./Quill";
import { Configuration, OpenAIApi } from "openai";

function SendMassage() {
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [res, setRes] = useState("");
  const configuration = new Configuration({
    organization: "org-iW0tOES3m75oHB2cx9IxyB8I",
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateContent = async () => {
    setisLoading(true);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${userPrompt}`,
      temperature: 1.4,
      top_p: 0.7,
      max_tokens: 120,
    });
    setRes(completion.data.choices[0].text);
    setisLoading(false);
    return completion.data.choices[0]?.text;
  };

  const [text, setText] = useState({ text: "" });
  const toolbarOptions = [];

  const handleChange = (value) => {
    setText({ text: value });
  };

  return (
    <div className="lg:absolute bottom-10 lg:px-11 px-5 lg:mb-0 mb-5 w-full">
      <div className="">
        <textarea
          id="message"
          name="message"
          className="comment-form message"
          cols={30}
          rows={10}
          value={userPrompt}
          onChange={(e) => {
            setUserPrompt(e.target.value);
          }}
          data-val="\S"
          data-val-msg="* Please, type a message."
          data-val-msg-id="textareaMessage"
          required=""
          //   defaultValue={userInfo[0]?.data?.bio}
        />
        <span className="input_error-message" id="textareaMessage" />
      </div>

      {res && (
        <p
          htmlFor="name"
          className="tw-mb-8 tw-ring-2 tw-rounded-2xl tw-ring-gray-400 tw-p-3"
        >
          {res && res}{" "}
        </p>
      )}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => {
            //   console.log(process.env.OPEN_AI_KEY);
            generateContent();
            //   onUpdateUserDataHandler();
          }}
          aria-label="none"
          name="button"
          className="bg-success-400 rounded-lg flex items-center justify-center px-4 py-2.5 font-semibold text-sm gap-1.5 text-white"
        >
          {isLoading ? (
            <div className="tw-flex  tw-flex-row tw-items-center  tw-space-x-2">
              <div
                class="tw-inline-block tw-mr-2 tw-h-6 tw-w-6 tw-animate-spin tw-rounded-full tw-border-4 tw-border-solid tw-border-current tw-border-r-transparent tw-align-[-0.125em] tw-motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span class="tw-!absolute tw!-m-px tw!h-px tw!w-px tw!overflow-hidden tw!whitespace-nowrap tw!border-0 tw!p-0 tw![clip:rect(0,0,0,0)]"></span>
              </div>
              Generating...
            </div>
          ) : (
            <div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0586 7.09154L7.92522 3.52487C3.13355 1.12487 1.16689 3.09153 3.56689 7.8832L4.29189 9.3332C4.50022 9.7582 4.50022 10.2499 4.29189 10.6749L3.56689 12.1165C1.16689 16.9082 3.12522 18.8749 7.92522 16.4749L15.0586 12.9082C18.2586 11.3082 18.2586 8.69153 15.0586 7.09154ZM12.3669 10.6249H7.86689C7.52522 10.6249 7.24189 10.3415 7.24189 9.99987C7.24189 9.6582 7.52522 9.37487 7.86689 9.37487H12.3669C12.7086 9.37487 12.9919 9.6582 12.9919 9.99987C12.9919 10.3415 12.7086 10.6249 12.3669 10.6249Z"
                  fill="white"
                />
              </svg>
              <span>Send</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default SendMassage;
