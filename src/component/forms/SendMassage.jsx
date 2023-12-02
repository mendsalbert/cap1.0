import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

function SendMassage() {
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [messages, setMessages] = useState([]); // Store conversation messages here
  const configuration = new Configuration({
    organization: "org-iW0tOES3m75oHB2cx9IxyB8I",
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateContent = async () => {
    if (!userPrompt.trim()) return; // Prevent sending empty messages
    const userMessage = userPrompt;
    setUserPrompt(""); // Clear the input after sending
    setisLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userMessage },
    ]);

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: userMessage,
        temperature: 1.4,
        top_p: 0.7,
        max_tokens: 120,
      });

      const aiResponse = completion.data.choices[0].text;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: aiResponse },
      ]);
    } catch (error) {
      console.error("There was an error generating a response: ", error);
      // Handle error, maybe push an error message to the chat
    }

    setisLoading(false);
  };

  return (
    <div className="lg:absolute bottom-10 pt-20 lg:px-11 px-5 lg:mb-0 mb-5 w-full">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p className="message-content">{message.text}</p>
          </div>
        ))}
      </div>
      <textarea
        id="message"
        name="message"
        className="comment-form message"
        cols={30}
        rows={10}
        placeholder="Type your message..."
        value={userPrompt}
        onChange={(e) => {
          setUserPrompt(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            generateContent();
          }
        }}
        required
      />
      <button
        onClick={generateContent}
        disabled={isLoading}
        className="bg-success-400 rounded-lg flex items-center justify-center px-4 py-2.5 font-semibold text-sm gap-1.5 text-white"
      >
        {isLoading ? "Generating..." : "Send"}
      </button>
    </div>
  );
}

export default SendMassage;
