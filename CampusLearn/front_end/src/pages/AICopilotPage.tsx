import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { GoogleGenAI, Chat } from "@google/genai";
import { marked } from "marked";

// ======================================================================
// 💡 PLACEHOLDER COMPONENTS:
// REMOVE these definitions (Lines 11-20) IF you use your original imports
// ======================================================================
const Layout: React.FC<{ variant: string; children: React.ReactNode }> = ({
  children,
}) => (
  <div className={`min-h-screen p-4 md:p-8 bg-gray-900 font-sans`}>
    {children}
  </div>
);
const BackButton: React.FC<{ label: string }> = ({ label }) => (
  <button className="text-white text-sm hover:text-purple-300 transition-colors py-2 px-3 rounded-lg border border-purple-700 bg-purple-800/50">
    {"< Dashboard"}
  </button>
);
const CopilotHeaderBanner: React.FC = () => (
  <div className="bg-purple-600 p-4 rounded-xl text-white mb-6 text-center shadow-lg">
    <p className="font-extrabold text-2xl">CampusLearn AI Copilot (Bravo)</p>
    <p className="text-sm mt-1">
      Ready to assist with platform info and academic queries.
    </p>
  </div>
);
// ======================================================================

// ----------------------------------------------------------------------
// 💡 CONFIGURATION: SYSTEM INSTRUCTION AND API KEY
// ----------------------------------------------------------------------

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `You are Bravo, a friendly and helpful AI assistant for CampusLearn. CampusLearn is an innovative tutor-led learning platform for Belgium Campus students, providing academic support for BCom, BIT, and Diploma modules.

Your primary goal is to assist students by providing information about the CampusLearn platform and answering their academic queries based on the syllabus.

**Platform Information:**

* **Overview:** CampusLearn connects students with Peer Tutors for flexible academic support.
* **Student Accounts:** Requires a @belgiumcampus.ac.za email. Features: manage profile, create help topics, track interactions.
* **Tutor & Topic Management:** Tutors create topics. Students get alerts for new topics. Only registered tutors can answer questions. Tutors can upload resources (videos, PDFs, audio).
* **Public Forum:** Anonymous forum for all students. Admin moderated.
* **Private Messaging:** Students who create a help topic are matched with a tutor for a private chat.
* **Communication:** The platform uses email, SMS, or WhatsApp for notifications.

**Your Behavior:**

* Be friendly, encouraging, and professional.
* If a student asks a question you can't answer from the syllabus or platform info, you MUST state that you need to escalate the matter to a human tutor. Do not invent answers.
* Always be helpful and guide the student on how to use the CampusLearn platform effectively.`;
// ----------------------------------------------------------------------

interface Message {
  id: number;
  author: "You" | "AI Copilot";
  content: string;
  isUser: boolean;
  isStreaming: boolean;
}

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.isUser;

  const renderMarkdown = (text: string) => {
    try {
      // Note: If the 'marked' library is not installed, this will fail.
      // It safely converts Markdown to HTML.
      return marked.parse(text);
    } catch (e) {
      return `<p>${text}</p>`;
    }
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}>
      <div
        className={`my-1 p-4 rounded-xl max-w-[85%] sm:max-w-2xl shadow-lg transition-all duration-300 ${
          isUser
            ? "bg-purple-700 text-white rounded-tr-none"
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        }`}
      >
        <p
          className={`font-bold text-sm mb-1 ${
            isUser ? "text-purple-200" : "text-purple-600"
          }`}
        >
          {message.author}
        </p>
        {message.isStreaming && message.content === "" ? (
          <div className="flex items-center gap-2">
            <FaSpinner className="animate-spin text-lg" />
            <span className="italic text-sm">Thinking...</span>
          </div>
        ) : (
          <div
            className="prose prose-sm max-w-none break-words"
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(message.content),
            }}
          />
        )}
      </div>
    </div>
  );
};

const AICopilotPage: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!API_KEY) {
      console.error("Gemini API Key is missing. Check your .env.local file.");
      setMessages([
        {
          id: 0,
          author: "AI Copilot",
          content:
            "⚠️ **Error:** API key missing or not loaded. Did you set `VITE_GEMINI_API_KEY` in `.env.local` and restart the server?",
          isUser: false,
          isStreaming: false,
        },
      ]);
      return;
    }

    try {
      // This is the part that connects to the Google API
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      chatRef.current = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      setMessages([
        {
          id: 1,
          author: "AI Copilot",
          content:
            "Hello! I am **Bravo**, your friendly CampusLearn assistant. How can I help you today?",
          isUser: false,
          isStreaming: false,
        },
      ]);
    } catch (e) {
      console.error(
        "Failed to initialize Gemini AI. Check dependencies and API Key.",
        e
      );
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage || !chatRef.current || isLoading) return;

    setInput("");
    setIsLoading(true);

    const newUserMessage: Message = {
      id: Date.now(),
      author: "You",
      content: userMessage,
      isUser: true,
      isStreaming: false,
    };

    const tempModelId = Date.now() + 1;
    const tempModelMessage: Message = {
      id: tempModelId,
      author: "AI Copilot",
      content: "",
      isUser: false,
      isStreaming: true,
    };

    setMessages((prev) => [...prev, newUserMessage, tempModelMessage]);

    try {
      // This sends the message and starts the streaming response
      const responseStream = await chatRef.current.sendMessageStream({
        message: userMessage,
      });

      let fullResponse = "";

      for await (const chunk of responseStream) {
        fullResponse += chunk.text;
        // Update the state to show the streaming text
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempModelId
              ? { ...msg, content: fullResponse, isStreaming: false }
              : msg
          )
        );
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempModelId
            ? { ...msg, content: fullResponse, isStreaming: false }
            : msg
        )
      );
    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage =
        "Sorry, the AI experienced a connection error. Please check your API key, your network connection, and the console for details.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempModelId
            ? { ...msg, content: errorMessage, isStreaming: false }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEscalate = () => {
    console.log("Redirecting to Private Messaging for Tutor Escalation.");
    // This is a placeholder navigation path
    navigate("/messages/compose");
  };

  return (
    <Layout variant="dark">
      <div className="flex justify-between items-center mb-6">
        <BackButton label="< Dashboard" />
        <button
          onClick={handleEscalate}
          className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors shadow-lg disabled:opacity-50"
          disabled={isLoading}
        >
          <FaExclamationTriangle className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase">
            Escalate to Tutor
          </span>
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
        AI Copilot
      </h1>

      <CopilotHeaderBanner />

      {/* --- Conversation Area --- */}
      <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50 h-[75vh] flex flex-col">
        {/* Message Display Area */}
        <div
          id="chat-container"
          className="flex-grow overflow-y-auto space-y-4 pr-2"
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input/Reply Box */}
        <form onSubmit={handleSubmit} className="mt-4 flex-shrink-0">
          <div className="flex items-center p-2 rounded-xl bg-gray-800 bg-opacity-70">
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-3 rounded-l-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors"
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`px-6 py-3 rounded-lg text-white font-semibold transition-opacity flex items-center justify-center gap-2 ${
                isLoading
                  ? "bg-gray-500 opacity-70 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#FF00FF] to-[#8A2BE2] hover:opacity-90"
              }`}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Send"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AICopilotPage;
