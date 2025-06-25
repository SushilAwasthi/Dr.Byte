// import { useRef, useState, useEffect, useLayoutEffect } from "react";
// import {useNavigate} from 'react-router-dom'
// import { motion, AnimatePresence } from "framer-motion";

// import styles from "./Chat.module.css";
// import ChatItem from "../components/chat/ChatItem";
// import {
// 	deleteAllChats,
// 	getAllChats,
// 	postChatRequest,
// } from "../../helpers/api-functions";

// import sendIcon from "/logos/send-icon.png";
// import noMsgBot from "/logos/no-msg2.png";
// import upArrow from "/logos/up-arrow.png";
// import ChatLoading from "../components/chat/ChatLoading";

// import { useAuth } from "../context/context";
// import SpinnerOverlay from "../components/shared/SpinnerOverlay";
// import toast from "react-hot-toast";
// import { Canvas } from "@react-three/fiber";
// import SpaceBackground from "../components/home/SpaceBackground";

// type Message = {
// 	role: "user" | "assistant";
// 	content: string;
// };

// const Chat = () => {
// 	const auth = useAuth();
//     const navigate = useNavigate()

// 	const [isFeedbackMode, setIsFeedbackMode] = useState<boolean>(false);
// 	const [rating, setRating] = useState<number | null>(null);
// 	const [feedbackContent, setFeedbackContent] = useState<string>("");
// 	const [email, setEmail] = useState<string>("");

// 	const [chatMessages, setChatMessages] = useState<Message[]>([]);
// 	const [isLoading, setIsLoading] = useState<boolean>(false);
// 	const [isLoadingChats, setIsLoadingChats] = useState<boolean>(true);
// 	const [deleteChatToggle, setDeleteChatToggle] = useState<boolean>(false);

// 	const inputRef = useRef<HTMLInputElement | null>(null);
// 	const messageContainerRef = useRef<HTMLDivElement | null>(null);

// 	useEffect(() => {
// 		if (messageContainerRef.current) {
// 			messageContainerRef.current.scrollTop =
// 				messageContainerRef.current.scrollHeight;
// 		}
// 	}, [chatMessages]);

// 	useLayoutEffect(() => {
// 		if(auth?.user) {
// 			setEmail(auth.user.email);
// 			console.log(email);
// 		}
// 		const getChats = async () => {
// 			try {
// 				if (auth?.isLoggedIn && auth.user) {
// 					const data = await getAllChats();
// 					setChatMessages([...data.chats]);
// 				}
// 				setIsLoadingChats(false);
// 			} catch (err) {
// 				console.log(err);
// 				setIsLoadingChats(false);
// 			}
// 		};
// 		getChats();
// 	}, [auth]);

//     useEffect(() => {
//         if(!auth?.user){
//             return navigate("/login")
//         }
//     } , [auth])

// 	const sendMsgHandler = async () => {
// 		const content = inputRef.current?.value as string;

// 		if (inputRef.current) inputRef.current.value = "";

// 		const newMessage: Message = { role: "user", content };
// 		setChatMessages((prev) => [...prev, newMessage]);

// 		// send request to backend
// 		setIsLoading(true);
// 		const chatData = await postChatRequest(content);
// 		setChatMessages([...chatData.chats]);
// 		setIsLoading(false);
// 	};

// 	const deleteChatsToggle = () => {
// 		setDeleteChatToggle((prevState) => !prevState);
// 	};

// 	const clearChatsHandler = async () => {
// 		try {
// 			toast.loading("Deleting Messages ...", { id: "delete-msgs" });
// 			const data = await deleteAllChats();
// 			setChatMessages(data.chats);
// 			setDeleteChatToggle(false);
// 			toast.success("Deleted Messages Successfully", { id: "delete-msgs" });
// 		} catch (error: any) {
// 			toast.error(error.message, { id: "delete-msgs" });
// 		}
// 	};

// 	const submitFeedbackHandler = async () => {
		
// 		// Validate rating
// 		if (rating === null || rating < 1 || rating > 5) {
// 			alert("Please select a valid rating.");
// 			return;
// 		}
	
// 		// Validate feedback content (assuming feedbackContent is a non-empty string)
// 		if (!feedbackContent.trim()) {
// 			alert("Feedback content cannot be empty.");
// 			return;
// 		}
	
// 		const feedback = {
// 		  message: feedbackContent,
// 		};
	
// 		try {
		
			
// 		  const response = await fetch('http://localhost:5000/chat', {
// 			method: 'POST',
// 			headers: {
// 			  'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(feedback),
// 		  });
	
// 		  if (!response.ok) {
// 			throw new Error("Failed to submit feedback.");
// 		  }
	
// 		  const result = await response.json();
// 		  console.log(result);
	
// 		  // Reset feedback state
// 		  setIsFeedbackMode(false);
// 		  setFeedbackContent('');
// 		  setRating(null);
// 		  toast.success("Feedback submitted successfully!");
	
// 		  const sendFeedback = {
// 			comment: feedbackContent,
// 			sentiment: result.label_name,
// 			rating: rating,
// 			email: email
// 		  }
	
// 		  // Second fetch to store detailed feedback
// 		  const feedbackResponse = await fetch('http://localhost:5001/api/feedback/new', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(sendFeedback),
// 		});
	
// 		if (!feedbackResponse.ok) {
// 			throw new Error("Failed to submit detailed feedback.");
// 		}
	
// 		const feedbackResult = await feedbackResponse.json();
// 		console.log("Detailed feedback submitted successfully:", feedbackResult);
	
// 		} catch (error) {
// 		  console.error('Error submitting feedback:', error);
// 		  toast.error("Failed to submit feedback. Please try again later.");
// 		}
// 	  };

// 	  const handleStarClick = (selectedRating: number) => {
// 		setRating(selectedRating);
// 	  };

// 	  const renderStars = () => {
// 		const totalStars = 5;
// 		let stars = [];
	
// 		for (let i = 1; i <= totalStars; i++) {
// 		  stars.push(
// 			<span
// 			  key={i}
// 			  className={i <= (rating || 0) ? styles.starFilled : styles.star}
// 			  onClick={() => handleStarClick(i)}
// 			>
// 			  ★
// 			</span>
// 		  );
// 		}
	
// 		return stars;
// 	  };

// 	const variants = {
// 		animate: {
// 			y: [0, -10, 0, -10, 0],
// 			transition: {
// 				type: "spring",
// 				y: { repeat: Infinity, duration: 4, stiffness: 100, damping: 5 },
// 			},
// 		},
// 	};

// 	const logo = {
// 		animate: {
// 			y: [0, -5, 0, -5, 0],
// 			transition: {
// 				type: "spring",
// 				y: {
// 					repeat: Infinity,
// 					duration: 4,
// 					stiffness: 100,
// 					damping: 5,
// 				},
// 			},
// 		},
// 		animateReverse: {
// 			transform: "rotate(180deg)",
// 			y: "-4",
// 			transition: {
// 				duration: 0.5,
// 			},
// 		},
// 		initialBtn: {
// 			y: "4",
// 			opacity: 0,
// 		},
// 		animateBtn: {
// 			y: 0,
// 			opacity: 1,
// 			transition: {
// 				duration: 0.5,
// 			},
// 		},
// 		exitBtn: {
// 			y: "-20",
// 			opacity: 0,
// 			transition: {
// 				duration: 0.5,
// 			},
// 		},
// 	};

// 	const placeHolder = (
// 		<div className={styles.no_msgs}>
			
// 			<h3>COVID QUERY</h3>
// 			<motion.div
// 				className={styles.no_msg_logo}
// 				variants={variants}
// 				animate='animate'>
// 				<img alt='no msg bot' src={noMsgBot}></img>
// 			</motion.div>
// 			<p>
// 				It's quiet in here! Be the first to break the silence and send a message
// 				to get the conversation going.
// 			</p>
// 			<p>Click <span className="text-xl font-semibold">End Chat</span> to give feedback and ratings.</p>
// 		</div>
// 	);

// 	const chats = chatMessages.map((chat) => (
// 		<ChatItem //@ts-ignore
// 			key={`${chat.content}${Math.random()}`} //@ts-ignore
// 			content={chat.content} //@ts-ignore
// 			role={chat.role}
// 		/>
// 	));

// 	const endChatHandler = () => {
// 		setIsFeedbackMode(true);
// 	  };


// 	return (
// 		<div className={styles.parent}>
// 			<div className="absolute top-0 left-0 w-full h-full">
// 					<Canvas>
// 						<ambientLight intensity={0.5} />
// 						<pointLight position={[10, 10, 10]} />
// 						<SpaceBackground />
// 					</Canvas>
// 				</div>
// 		  <div className={styles.chat} ref={messageContainerRef}>
// 			{isLoadingChats && <SpinnerOverlay />}
// 			{!isLoadingChats && (
// 			  <>
// 				{chatMessages.length === 0 && placeHolder}
// 				{chatMessages.length !== 0 && chats}
// 				{isLoading && <ChatLoading />}
// 			  </>
// 			)}
// 		  </div>
// 		  <div className={styles.inputContainer}>
// 			<div className={styles.inputArea}>
// 			  <div className={styles.eraseMsgs}>
// 				<motion.img
// 				  variants={logo}
// 				  animate={!deleteChatToggle ? "animate" : "animateReverse"}
// 				  src={upArrow}
// 				  alt="top icon"
// 				  onClick={deleteChatsToggle}
// 				/>
// 				<AnimatePresence>
// 				  {deleteChatToggle && (
// 					<motion.button
// 					  className={styles.eraseBtn}
// 					  onClick={clearChatsHandler}
// 					  variants={logo}
// 					  initial="initialBtn"
// 					  animate="animateBtn"
// 					  exit="exitBtn"
// 					>
// 					  CLEAR CHATS
// 					</motion.button>
// 				  )}
// 				</AnimatePresence>
// 			  </div>
// 			  {isFeedbackMode ? (
// 				<div className={styles.feedbackForm}>
// 				  <textarea
// 					rows={3}
// 					value={feedbackContent}
// 					onChange={(e) => setFeedbackContent(e.target.value)}
// 					placeholder="Your feedback..."
// 				  />
// 				  <div>
// 					<label>Rate your experience:</label>
// 					<div className={styles.starContainer}>{renderStars()}</div>
// 				  </div>
// 				  <button onClick={submitFeedbackHandler}>Submit Feedback</button>
// 				</div>
// 			  ) : (
// 				<>
// 				  <input
// 					type="text"
// 					maxLength={1500}
// 					ref={inputRef}
// 					disabled={isLoadingChats || isLoading}
// 					placeholder="Enter your query here"
// 				  />
// 				  <button className={styles.icon} onClick={sendMsgHandler}>
// 					<img alt="icon" src={sendIcon} />
// 				  </button>
// 				  <button className={styles.endChatButton} onClick={endChatHandler}>End Chat</button>
// 				</>
// 			  )}
// 			</div>
// 		  </div>
// 		</div>
// 	  );
// };

// export default Chat;


import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./Chat.module.css";
import ChatItem from "../components/chat/ChatItem";
import {
  deleteAllChats,
  getAllChats,
  postChatRequest,
} from "../../helpers/api-functions";

import sendIcon from "/logos/send-icon.png";
import noMsgBot from "/logos/no-msg2.png";
import upArrow from "/logos/up-arrow.png";
import ChatLoading from "../components/chat/ChatLoading";

import { useAuth } from "../context/context";
import SpinnerOverlay from "../components/shared/SpinnerOverlay";
import toast from "react-hot-toast";
import { Canvas } from "@react-three/fiber";
import SpaceBackground from "../components/home/SpaceBackground";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [isFeedbackMode, setIsFeedbackMode] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);
  const [feedbackContent, setFeedbackContent] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingChats, setIsLoadingChats] = useState<boolean>(true);
  const [deleteChatToggle, setDeleteChatToggle] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useLayoutEffect(() => {
    if (auth?.user) {
      setEmail(auth.user.email);
    }
    const getChats = async () => {
      try {
        if (auth?.isLoggedIn && auth.user) {
          const data = await getAllChats();
          setChatMessages([...data.chats]);
        }
        setIsLoadingChats(false);
      } catch (err) {
        console.log(err);
        setIsLoadingChats(false);
      }
    };
    getChats();
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  const sendMsgHandler = async (event: any) => {
    if (event.key === "Enter" && inputRef.current?.value.trim()) {
      const content = inputRef.current?.value as string;

      if (inputRef.current) inputRef.current.value = "";

      const newMessage: Message = { role: "user", content };
      setChatMessages((prev) => [...prev, newMessage]);

      // send request to backend
      setIsLoading(true);
      const chatData = await postChatRequest(content);
      setChatMessages([...chatData.chats]);
      setIsLoading(false);
    }
  };

  const deleteChatsToggle = () => {
    setDeleteChatToggle((prevState) => !prevState);
  };

  const clearChatsHandler = async () => {
    try {
      toast.loading("Deleting Messages ...", { id: "delete-msgs" });
      const data = await deleteAllChats();
      setChatMessages(data.chats);
      setDeleteChatToggle(false);
      toast.success("Deleted Messages Successfully", { id: "delete-msgs" });
    } catch (error: any) {
      toast.error(error.message, { id: "delete-msgs" });
    }
  };

  const submitFeedbackHandler = async () => {
    // Validate rating
    if (rating === null || rating < 1 || rating > 5) {
      alert("Please select a valid rating.");
      return;
    }

    // Validate feedback content (assuming feedbackContent is a non-empty string)
    if (!feedbackContent.trim()) {
      alert("Feedback content cannot be empty.");
      return;
    }

    const feedback = {
      message: feedbackContent,
    };

    try {
      const response = await fetch("http://127.0.0.1:5001/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback.");
      }

      const result = await response.json();
      console.log(result);

      // Reset feedback state
      setIsFeedbackMode(false);
      setFeedbackContent("");
      setRating(null);
      toast.success("Feedback submitted successfully!");

      const sendFeedback = {
        comment: feedbackContent,
        sentiment: result,
        rating: rating,
        email: email,
      };

      // Second fetch to store detailed feedback
      const feedbackResponse = await fetch(
        "http://localhost:5001/api/feedback/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendFeedback),
        }
      );

      if (!feedbackResponse.ok) {
        throw new Error("Failed to submit detailed feedback.");
      }

      const feedbackResult = await feedbackResponse.json();
      console.log("Detailed feedback submitted successfully:", feedbackResult);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error(
        "Failed to submit feedback. Please try again later."
      );
    }
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const renderStars = () => {
    const totalStars = 5;
    let stars = [];

    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span
          key={i}
          className={i <= (rating || 0) ? styles.starFilled : styles.star}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }

    return stars;
  };

  const variants = {
    animate: {
      y: [0, -10, 0, -10, 0],
      transition: {
        type: "spring",
        y: { repeat: Infinity, duration: 4, stiffness: 100, damping: 5 },
      },
    },
  };

  const logo = {
    animate: {
      y: [0, -5, 0, -5, 0],
      transition: {
        type: "spring",
        y: {
          repeat: Infinity,
          duration: 4,
          stiffness: 100,
          damping: 5,
        },
      },
    },
    animateReverse: {
      transform: "rotate(180deg)",
      y: "-4",
      transition: {
        duration: 0.5,
      },
    },
    initialBtn: {
      y: "4",
      opacity: 0,
    },
    animateBtn: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exitBtn: {
      y: "-20",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const placeHolder = (
    <div className={styles.no_msgs}>
      <h3>ENTER YOUR QUERY</h3>
      <motion.div
        className={styles.no_msg_logo}
        variants={variants}
        animate="animate"
      >
        <img alt="no msg bot" src={noMsgBot}></img>
      </motion.div>
      <p>
        It's quiet in here! Be the first to break the silence and send a message
        to get the conversation going.
      </p>
      <p>
        Click <span className="text-xl font-semibold text-teal-500">Give Feedback</span> to give feedback
        and ratings.
      </p>
    </div>
  );

  const chats = chatMessages.map((chat) => (
    <ChatItem //@ts-ignore
      key={`${chat.content}${Math.random()}`} //@ts-ignore
      content={chat.content} //@ts-ignore
      role={chat.role}
    />
  ));

  const endChatHandler = () => {
    setIsFeedbackMode(true);
  };

  const cancelFeedbackHandler = () => {
	setIsFeedbackMode(false);
	setFeedbackContent(""); // Reset feedback content
	setRating(null); // Reset rating
  };
  

  return (
    <div className={styles.parent}>
      
      <div className={styles.chat} ref={messageContainerRef}>
        {isLoadingChats && <SpinnerOverlay />}
        {!isLoadingChats && (
          <>
            {chatMessages.length === 0 && placeHolder}
            {chatMessages.length !== 0 && chats}
            {isLoading && <ChatLoading />}
          </>
        )}
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputArea}>
          <div className={styles.eraseMsgs}>
            <motion.img
              variants={logo}
              animate={!deleteChatToggle ? "animate" : "animateReverse"}
              src={upArrow}
              alt="top icon"
              onClick={deleteChatsToggle}
            />
            <AnimatePresence>
              {deleteChatToggle && (
                <motion.button
                  className={styles.eraseBtn}
                  onClick={clearChatsHandler}
                  variants={logo}
                  initial="initialBtn"
                  animate="animateBtn"
                  exit="exitBtn"
                >
                  CLEAR CHATS
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          {isFeedbackMode ? (
            <div className={styles.feedbackForm}>
              <textarea
                rows={3}
                value={feedbackContent}
                onChange={(e) => setFeedbackContent(e.target.value)}
                placeholder="Your feedback..."
              />
              <div>
                <label className="text-lg">Rate your experience:</label>
                <div className={styles.starContainer}>{renderStars()}</div>
              </div>
              <button className="mr-5" onClick={submitFeedbackHandler}>Submit Feedback</button>
			  <button onClick={cancelFeedbackHandler}>Cancel</button>
            </div>
          ) : (
            <>
              <input
                type="text"
                maxLength={1500}
                ref={inputRef}
                disabled={isLoadingChats || isLoading}
                placeholder="Enter your query here"
                onKeyDown={sendMsgHandler} // Handle "Enter" key press
              />
              <button className={styles.icon}>
                <img alt="icon" src={sendIcon} onClick={sendMsgHandler} />
              </button>
              <button className="bg-purple-900 rounded-xl hover:bg-purple-700 duration-300 ml-5 px-2 py-1" onClick={endChatHandler}>
                Give Feedback
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

