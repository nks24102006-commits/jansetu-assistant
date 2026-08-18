import React, { useState } from "react";
import {
  Shield,
  MessageSquare,
  FileText,
  Activity,
  User,
  Send,
  Search,
  CheckCircle,
  Clock,
  ChevronRight,
} from "lucide-react";

// 👉 PASTE YOUR API KEY BETWEEN THE QUOTES BELOW 👈
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export default function App() {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Namaste! I am JanSetu. I have my beautiful colors back, and I am ready to catch any Google errors. Ask me a question!",
    },
  ]);
  const [input, setInput] = useState("");

  const [trackingId, setTrackingId] = useState("");
  const [trackingStatus, setTrackingStatus] = useState(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");

    if (!GEMINI_API_KEY) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: `Please paste your API key at the top of the code first!`,
          },
        ]);
      }, 1000);
      return;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an AI assistant for Indian citizens named JanSetu. Keep answers brief. User asks: ${userText}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      // 🔴 CATCHES GOOGLE ERRORS 🔴
      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: `🚨 GOOGLE ERROR: ${
              data.error?.message || "Unknown error. Check console."
            }`,
          },
        ]);
        return;
      }

      const aiResponse = data.candidates[0].content.parts[0].text;
      setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `🚨 SYSTEM ERROR: ${error.message}` },
      ]);
    }
  };

  const handleTrackApplication = (e) => {
    e.preventDefault();
    if (trackingId === "AADHAAR123") {
      setTrackingStatus({
        status: "in-progress",
        title: "Aadhaar Update Request",
        steps: [
          {
            name: "Application Submitted",
            date: "Oct 12, 2026",
            completed: true,
          },
          {
            name: "Document Verification",
            date: "Oct 14, 2026",
            completed: true,
          },
          { name: "Biometric Processing", date: "Pending", completed: false },
          { name: "Card Dispatched", date: "Pending", completed: false },
        ],
      });
    } else if (trackingId === "PAN456") {
      setTrackingStatus({
        status: "completed",
        title: "New PAN Card Application",
        steps: [
          {
            name: "Application Submitted",
            date: "Sep 20, 2026",
            completed: true,
          },
          { name: "Payment Confirmed", date: "Sep 20, 2026", completed: true },
          { name: "Processing at NSDL", date: "Sep 25, 2026", completed: true },
          { name: "Card Delivered", date: "Oct 02, 2026", completed: true },
        ],
      });
    } else {
      setTrackingStatus({ status: "not-found" });
    }
  };

  const schemesData = [
    {
      title: "PM-Kisan Samman Nidhi",
      desc: "Direct income support of ₹6,000 per year for farmer families.",
      tags: ["Agriculture", "Financial"],
      link: "https://pmkisan.gov.in/",
    },
    {
      title: "Ayushman Bharat",
      desc: "Health insurance coverage up to ₹5 lakhs per family per year.",
      tags: ["Health", "Insurance"],
      link: "https://pmjay.gov.in/",
    },
    {
      title: "Sukanya Samriddhi Yojana",
      desc: "Savings scheme targeted at the parents of girl children.",
      tags: ["Education", "Savings"],
      link: "https://www.india.gov.in/sukanya-samriddhi-yojna",
    },
    {
      title: "Awas Yojana (Urban)",
      desc: "Housing for all in urban areas.",
      tags: ["Housing", "Urban"],
      link: "https://pmaymis.gov.in/",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col shadow-xl z-10">
        <div className="p-6 flex items-center gap-3 border-b border-blue-800">
          <div className="bg-white p-2 rounded-lg text-blue-900">
            <Shield size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wider">JanSetu</h1>
            <p className="text-xs text-blue-300 font-medium tracking-widest uppercase">
              Community Bridge
            </p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <button
            onClick={() => setActiveTab("chat")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "chat"
                ? "bg-blue-600 shadow-md"
                : "hover:bg-blue-800"
            }`}
          >
            <MessageSquare size={20} />{" "}
            <span className="font-medium">AI Assistant</span>
          </button>
          <button
            onClick={() => setActiveTab("schemes")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "schemes"
                ? "bg-blue-600 shadow-md"
                : "hover:bg-blue-800"
            }`}
          >
            <FileText size={20} />{" "}
            <span className="font-medium">Discover Schemes</span>
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "services"
                ? "bg-blue-600 shadow-md"
                : "hover:bg-blue-800"
            }`}
          >
            <Activity size={20} />{" "}
            <span className="font-medium">Quick Services</span>
          </button>
        </nav>

        <div className="p-4 border-t border-blue-800 bg-blue-950/50">
          <div className="flex items-center gap-3">
            <div className="bg-blue-700 p-2 rounded-full">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm font-medium">Guest User</p>
              <p className="text-xs text-blue-300">Login to save history</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center z-0">
          <h2 className="text-xl font-bold text-gray-700">
            {activeTab === "chat" && "Conversational Search"}
            {activeTab === "schemes" && "Government Schemes Directory"}
            {activeTab === "services" && "Track Services & Applications"}
          </h2>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> System
            Online
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative">
          {/* TAB 1: Chat Assistant */}
          {activeTab === "chat" && (
            <div className="max-w-4xl mx-auto flex flex-col h-full">
              <div className="flex-1 space-y-6 pb-20">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white border border-gray-100 rounded-bl-none text-gray-700"
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-8 left-8 right-8 max-w-4xl mx-auto">
                <form
                  onSubmit={handleSendMessage}
                  className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex items-center"
                >
                  <input
                    type="text"
                    placeholder="Ask a real question..."
                    className="flex-1 bg-transparent border-none px-6 py-2 outline-none text-gray-700"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: Discover Schemes */}
          {activeTab === "schemes" && (
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {schemesData.map((scheme, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-2 mb-4">
                    {scheme.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {scheme.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">{scheme.desc}</p>
                  <a
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-sm transition-all"
                  >
                    Visit Official Website{" "}
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Quick Services */}
          {activeTab === "services" && (
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-2">
                  Track Application Status
                </h2>
                <p className="text-blue-100 mb-6">
                  Enter your reference ID to get real-time tracking updates.
                </p>
                <form onSubmit={handleTrackApplication} className="flex gap-4">
                  <div className="flex-1 bg-white/10 rounded-xl flex items-center px-4 border border-blue-400/30">
                    <Search size={20} className="text-blue-200" />
                    <input
                      type="text"
                      placeholder="Try demo IDs: AADHAAR123 or PAN456"
                      className="w-full bg-transparent border-none text-white placeholder-blue-200 px-4 py-3 outline-none"
                      value={trackingId}
                      onChange={(e) =>
                        setTrackingId(e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-white text-blue-800 font-bold px-8 py-3 rounded-xl hover:bg-gray-50"
                  >
                    Track
                  </button>
                </form>
              </div>

              {trackingStatus && trackingStatus.status !== "not-found" && (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                  <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {trackingStatus.title}
                      </h3>
                      <p className="text-gray-500">Ref ID: {trackingId}</p>
                    </div>
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-bold ${
                        trackingStatus.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {trackingStatus.status === "completed"
                        ? "Completed"
                        : "In Progress"}
                    </span>
                  </div>
                  <div className="space-y-6">
                    {trackingStatus.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="flex flex-col items-center mt-1">
                          {step.completed ? (
                            <CheckCircle size={24} className="text-green-500" />
                          ) : (
                            <Clock size={24} className="text-gray-300" />
                          )}
                          {idx !== trackingStatus.steps.length - 1 && (
                            <div
                              className={`w-0.5 h-10 mt-2 ${
                                step.completed ? "bg-green-500" : "bg-gray-200"
                              }`}
                            ></div>
                          )}
                        </div>
                        <div>
                          <p
                            className={`font-bold ${
                              step.completed ? "text-gray-800" : "text-gray-400"
                            }`}
                          >
                            {step.name}
                          </p>
                          <p className="text-sm text-gray-500">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {trackingStatus && trackingStatus.status === "not-found" && (
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
                  <p className="font-bold">Application Not Found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
