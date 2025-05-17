"use client";

import Profile from "@/app/components/ui/profile";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageDataAPI, MessagesInterface } from "@/interfaces/interfaces";
import cookie from "cookie";
import { toast } from "sonner";
import useNavigation from "@/store/navigation";

export default function PersonChatIndividual() {
    const params = useParams();
    const partnerID = params.chatID;
    const router = useRouter();

    const socketRef = useRef<WebSocket | null>(null);
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const messageContainerRef = useRef<HTMLDivElement | null>(null);
    const messageTopRef = useRef<HTMLDivElement | null>(null);
    const paginatorRef = useRef(1);
    const prevScrollHeight = useRef(0);
    const prevScrollTop = useRef(0);

    const [chatMessage, setChatMessage] = useState("");
    const [messages, setMessages] = useState<MessagesInterface[]>([]);
    const [paginatorNumber, setPaginatorNumber] = useState(1);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const [token, setToken] = useState("");
    const [isTokenReady, setIsTokenReady] = useState(false);

    const { setNavigation } = useNavigation();

    const fetchMessages = async (pageNumber: number) => {
        if (!hasMoreMessages) return;

        const container = messageContainerRef.current;
        if (!container) return;

        prevScrollHeight.current = container.scrollHeight;
        prevScrollTop.current = container.scrollTop;

        const messagesPromise = await fetch(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/getChatMessages/?page=${pageNumber}`,
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ partnerID: partnerID }),
            }
        );

        if (!messagesPromise.ok) {
            console.log("Promise was not ok. Debug it");
            return;
        }

        const data = await messagesPromise.json();

        if (!data || data.data === null) return;
        const reversed = data.data.reverse();
        setHasMoreMessages(data.next);

        const newMessages = reversed.map((obj: MessageDataAPI) => ({
            person: obj.sender.id == partnerID ? "partner" : "user",
            message: obj.message,
            sentAt: obj.sent_at,
        }));

        setMessages((prevMessages) => [...newMessages, ...prevMessages]);
        setPaginatorNumber((prevNumber) => {
            paginatorRef.current = prevNumber + 1;
            return prevNumber + 1;
        });
    };

    // Just getting the token
    useEffect(() => {
        const getToken = async () => {
            const cookies = cookie.parse(document.cookie || "");
            const tokenCookie = cookies.authToken;

            if (tokenCookie) {
                setToken(tokenCookie);
                setIsTokenReady(true);
                return;
            }

            const token = await fetch(
                `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/getToken`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!token.ok) {
                toast.message("Problem with authentication.");
                return;
            }

            const { token: tokenValue } = await token.json();
            const finalToken = tokenValue.split(/\s+/)[1];

            setToken(finalToken);
            setIsTokenReady(true);

            document.cookie = `authToken=${finalToken}; path=/;`;
        };

        getToken();

        return () => {
            document.cookie = "authToken=; path=/;";
        };
    }, []);

    // Establish web socket
    // In production, make guardrails for if web socket connection is lost
    // in some interval, ping the server to see if it is still open, so you know it is not sleeping
    useEffect(() => {
        if (!partnerID || !token || !isTokenReady) return;

        const ws = new WebSocket(
            `ws://127.0.0.1:8000/ws/chat/${partnerID}/?token=${token}`
        );

        ws.onopen = () => {
            console.log("Web socket connected");
        };

        ws.onclose = () => {
            console.log("Web socket has been closed");
        };

        ws.onerror = (error) => {
            console.log(error);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const sender = data.from == partnerID ? "partner" : "user";

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    person: sender,
                    message: data.message,
                    sentAt: data.sent_at,
                },
            ]);
            scrollToBottom();
        };

        socketRef.current = ws;

        return () => {
            ws.close();
        };
    }, [partnerID, token, isTokenReady]);

    // Handle Fetching first data
    useEffect(() => {
        const fetchData = async () => {
            await fetchMessages(1);
        };
        if (!hasMoreMessages) return;
        fetchData();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries, observerInstance) => {
                if (
                    entries[0].isIntersecting &&
                    hasMoreMessages &&
                    paginatorRef.current != 1
                ) {
                    await fetchMessages(paginatorRef.current);

                    if (!messageTopRef.current) return;

                    if (!hasMoreMessages)
                        observerInstance.unobserve(messageTopRef.current);
                }
            },
            {
                root: messageContainerRef.current,
                threshold: 1.0,
            }
        );

        if (messageTopRef.current) {
            observer.observe(messageTopRef.current);
        }

        return () => {
            if (messageTopRef.current)
                observer.unobserve(messageTopRef.current);
        };
    }, [hasMoreMessages, paginatorRef.current]);

    useEffect(() => {
        if (paginatorNumber === 1) {
            scrollToBottom();
        } else {
            const container = messageContainerRef.current;
            if (!container) return;

            const newScrollHeight = container.scrollHeight;
            container.scrollTop =
                newScrollHeight -
                prevScrollHeight.current +
                prevScrollTop.current;
        }
    }, [messages]);

    function handleSend() {
        if (!chatMessage) return;

        if (
            socketRef.current &&
            socketRef.current.readyState === WebSocket.OPEN
        ) {
            socketRef.current.send(JSON.stringify({ message: chatMessage }));
            setChatMessage("");
        } else {
            console.log("Web Socket is not ready");
        }
    }

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    function handleGoBack() {
        setNavigation("inbox");
        router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`);
    }

    return (
        <div className="flex items-center justify-center">
            <div className="bg_secondary px-8 pt-8 overflow-y-auto w-[50rem] rounded-xl h-[78vh] flex justify-between items-center flex-col">
                <div className="flex-2/8">
                    <div className="flex items-center justify-between w-[45rem]">
                        <div className="flex items-center justify-start">
                            <div className="w-14 h-14">
                                <Profile />
                            </div>
                            <div className="ml-4">Adham Sartorosh.</div>
                        </div>
                        <div>
                            <FaArrowAltCircleLeft
                                className="text-4xl cursor-pointer"
                                onClick={handleGoBack}
                            />
                        </div>
                    </div>
                    <hr className="bg-amber-100 mt-4" />
                </div>
                <div
                    className="w-[45rem] flex-5/8 overflow-y-auto px-2 pb-2"
                    ref={messageContainerRef}
                >
                    <div ref={messageTopRef}></div>
                    {messages.map((message, indx) => (
                        <div
                            key={indx}
                            className={`w-full flex items-center ${
                                message.person === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`bg-gray-700 inline-block relative py-2 px-4 rounded-2xl shadow-2xl my-2 max-w-[70%]
                                ${
                                    message.person === "user"
                                        ? "rounded-br-none"
                                        : "rounded-bl-none"
                                }
                                `}
                            >
                                {message.message}
                            </div>
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>
                <div className="flex-1/8 w-full relative">
                    <Input
                        placeholder="Your message"
                        type="text"
                        className="w-full pr-10 h-12"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSend();
                        }}
                    />
                    <PiTelegramLogoDuotone
                        className="absolute right-3 top-3 text-2xl text-gray-500 cursor-pointer hover:text-white"
                        onClick={handleSend}
                    />
                </div>
            </div>
        </div>
    );
}
