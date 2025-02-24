"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Square } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Object3D } from "three";

interface BotModelProps {
  isSpeaking: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

const BotModel: React.FC<BotModelProps> = ({ isSpeaking }) => {
  const { scene } = useGLTF("/models/chatbot_v011.glb");
  const botRef = useRef<Object3D | null>(null);
  const [scale, setScale] = useState<number>(1.5);
  const rotationSpeed = 5;

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 480) {
          setScale(20);
        } else if (width < 768) {
          setScale(20.2);
        } else if (width < 1024) {
          setScale(20.4);
        } else {
          setScale(20.6);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state) => {
    if (botRef.current) {
      const time = state.clock.getElapsedTime();
      botRef.current.rotation.y = Math.sin(time * rotationSpeed) * 0.3;
      botRef.current.position.y = isSpeaking ? Math.sin(Date.now() * 0.005) * 0.015 : 0;
    }
  });

  return (
    <primitive ref={botRef} object={scene} position={[0, -1, -3]} scale={scale} />
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const synth = useRef<SpeechSynthesis | null>(null);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synth.current = window.speechSynthesis;

      const updateVoice = () => {
        const voices = synth.current?.getVoices() || [];
        const britishVoice = voices.find((v) => v.lang.includes("en-GB")) || voices[0];
        setVoice(britishVoice || null);
      };

      synth.current.onvoiceschanged = updateVoice;
      updateVoice();

      return () => {
        if (synth.current) {
          synth.current.onvoiceschanged = null;
        }
      };
    }
  }, []);

  const faqItems: FAQItem[] = [
    { question: "What is Ceylon Mine?", answer: "Ceylon Mine is an advanced digital platform modernizing mining in Sri Lanka." },
    { question: "How does Ceylon Mine improve mining?", answer: "By utilizing AI, blockchain, and real-time monitoring for efficiency and compliance." },
    { question: "Who can use Ceylon Mine?", answer: "Mining companies, regulators, and independent miners looking for transparency." },
    { question: "Is Ceylon Mine environmentally friendly?", answer: "Yes, it includes sustainability features to minimize environmental impact." },
    { question: "How does Ceylon Mine enhance transparency?", answer: "With blockchain tracking, ensuring full mining activity transparency." },
    { question: "What security measures are used?", answer: "Encryption, decentralized storage, and AI-powered anomaly detection." },
    { question: "Can small miners benefit?", answer: "Yes! It offers scalable solutions for all mining operations." },
    { question: "Does it support legal compliance?", answer: "Yes, with automated checks and regulatory reporting tools." },
    { question: "What future features are planned?", answer: "AI-powered analytics, automated mapping, and regulatory integration." }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(faqItems.length / itemsPerPage);
  const displayedItems = faqItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSpeech = (answer: string, index: number) => {
    if (!synth.current) return;

    synth.current.cancel();
    setOpenIndex(openIndex === index ? null : index);

    const utterance = new SpeechSynthesisUtterance(answer);
    if (voice) utterance.voice = voice;
    utterance.rate = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    synth.current.speak(utterance);
  };

  const stopSpeech = () => {
    synth.current?.cancel();
    setIsSpeaking(false);
  };

  return (
    <div id="faq" className="min-h-screen w-full bg-black flex flex-col">
      <div className="w-full h-[40vh] md:h-[50vh] relative bg-black">
        <Canvas className="w-full h-full">
          <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} />
          <ambientLight intensity={1.2} />
          <directionalLight position={[2, 5, 6]} intensity={1.2} />
          <BotModel isSpeaking={isSpeaking} />
        </Canvas>
      </div>

      <div className="flex-1 w-full bg-black px-4 py-6 md:px-8 md:py-8">
        <div className="max-w-4xl mx-auto bg-black/90 p-4 md:p-8 rounded-3xl shadow-xl border border-gray-800">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-white">
            Ceylon Mine <span className="text-yellow-500/80">FAQ</span>
          </h2>

          <div className="space-y-4">
            {displayedItems.map((item, index) => (
              <div key={index} className="border border-gray-800 rounded-lg bg-black shadow-lg">
                <button
                  onClick={() => handleSpeech(item.answer, index)}
                  className="w-full p-3 md:p-4 flex items-center justify-between text-left hover:bg-yellow-800/30 text-white"
                >
                  <h3 className="text-sm md:text-lg font-semibold pr-4">{item.question}</h3>
                  <ChevronDown className={`flex-shrink-0 w-5 h-5 text-yellow-500/70 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40" : "max-h-0"}`}>
                  <p className="p-3 md:p-4 text-sm md:text-base text-gray-300">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {isSpeaking && (
            <button
              onClick={stopSpeech}
              className="mt-6 mx-auto px-6 py-3 bg-red-600 text-white font-bold rounded-lg flex items-center gap-2 hover:bg-red-700"
            >
              <Square size={20} /> Stop Talking
            </button>
          )}

          <div className="flex justify-center items-center mt-6 space-x-4 text-white">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 bg-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-700">
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm md:text-lg font-semibold">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 bg-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-700">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;



