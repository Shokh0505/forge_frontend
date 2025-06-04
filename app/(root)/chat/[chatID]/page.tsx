"use client";

import useNavigation from "@/store/navigation";
import getToken from "./_service/getToken";
import getMessages from "./_service/getMessages";
import {
    inboxPeopleChatInterface,
    MessageDataAPI,
    MessagesInterface,
} from "@/interfaces/interfaces";

import Profile from "@/components/ui/profile";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import { Input } from "@/components/ui/input";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import cookie from "cookie";
import useInboxPeople from "../../inbox/_hooks/inboxPeople";
import getUsername from "./_service/getUsername";

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
    const loadingMoreRef = useRef(false);

    const [chatMessage, setChatMessage] = useState("");
    const [messages, setMessages] = useState<MessagesInterface[]>([]);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const [token, setToken] = useState("");
    const [isTokenReady, setIsTokenReady] = useState(false);
    const [chat, setChat] = useState<inboxPeopleChatInterface | undefined>(
        undefined
    );
    const [username, setUsername] = useState<string | null>(null);
    const [profile_photo, setProfilePhoto] = useState<string | null>(null);
    const { inboxPeople, loading } = useInboxPeople();

    useEffect(() => {
        if (!loading) {
            const foundChat = inboxPeople.find(
                (item: inboxPeopleChatInterface) => item.user.id == partnerID
            );
            if (foundChat) {
                setUsername(foundChat.user.username);
                if (foundChat.user.profile_photo)
                    setProfilePhoto(foundChat.user.profile_photo);
            }
            setChat(foundChat);
        }
    }, [loading, inboxPeople, partnerID]);

    useEffect(() => {
        const getUsernameData = async () => {
            if (!loading && !chat) {
                const data = await getUsername(partnerID as string);
                const { username, profile_photo } = data;
                setUsername(username);
                setProfilePhoto(profile_photo);
            }
        };
        getUsernameData();
    }, [loading, chat, partnerID]);

    const { setNavigation } = useNavigation();

    const fetchMessages = async (pageNumber: number) => {
        if (!hasMoreMessages) return;

        const container = messageContainerRef.current;
        if (!container) return;

        loadingMoreRef.current = true;
        prevScrollHeight.current = container.scrollHeight;
        prevScrollTop.current = container.scrollTop;

        let data = null;

        if (typeof partnerID === "string") {
            data = await getMessages(pageNumber, partnerID);
        }

        if (!data || data.data === null) return;
        const reversed = data.data.reverse();
        setHasMoreMessages(data.next);

        const newMessages = reversed.map((obj: MessageDataAPI) => ({
            person: obj.sender.id == partnerID ? "partner" : "user",
            message: obj.message,
            sentAt: obj.sent_at,
        }));

        setMessages((prevMessages) => [...newMessages, ...prevMessages]);
        paginatorRef.current = paginatorRef.current + 1;

        // For future dev:
        // if the chat becomes really heavy, switch to animation frame for updating the ui
        setTimeout(() => {
            loadingMoreRef.current = false;
        }, 1000);
    };

    // Just getting the token
    useEffect(() => {
        const getOrSetToken = async () => {
            const cookies = cookie.parse(document.cookie || "");
            const tokenCookie = cookies.authToken;

            if (tokenCookie) {
                setToken(tokenCookie);
                setIsTokenReady(true);
                return;
            }

            const finalToken = await getToken();
            if (!finalToken) return;

            setToken(finalToken);
            setIsTokenReady(true);

            document.cookie = `authToken=${finalToken}; path=/;`;
        };

        getOrSetToken();

        return () => {
            document.cookie = "authToken=; path=/;";
        };
    }, []);

    // Establish web socket
    // In production, make guardrails if web socket connection is lost
    // in some interval, i would ping the server to see if it is still open, so you know it is not sleeping
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
        const container = messageContainerRef.current;
        if (!container) return;

        if (loadingMoreRef.current) {
            const newScrollHeight = container.scrollHeight;
            container.scrollTop =
                newScrollHeight -
                prevScrollHeight.current +
                prevScrollTop.current;
        } else {
            scrollToBottom();
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
        router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}inbox/`);
    }

    return (
        <div className="flex items-center justify-center lg:px-12 xl:px-24">
            <div className="bg_secondary px-2 lg:px-12 pt-8  w-full  rounded-xl h-[78vh] flex justify-between items-center flex-col">
                <div className="w-full shrink-0">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center justify-start">
                            <div className="w-14 h-14">
                                {chat ? (
                                    <Profile
                                        profile_photo={
                                            profile_photo ? profile_photo : ""
                                        }
                                    />
                                ) : (
                                    <Profile />
                                )}
                            </div>
                            <div className="ml-4">
                                {username ? username : "Username loading..."}
                            </div>
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
                    className="w-full flex-1 overflow-y-auto px-2 pb-2"
                    ref={messageContainerRef}
                >
                    <div ref={messageTopRef}></div>
                    {!loading && messages.length === 0 && (
                        <div className="w-full flex items-center justify-center h-full">
                            No messages here yet
                        </div>
                    )}
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
                <div className="shrink-0 mb-4 w-full relative">
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
