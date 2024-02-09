import React from "react";
import { List, ListItem, Avatar } from "@mui/material";
import { ChatState } from "../context/ChatContext";
import axios from "axios";

function SearchedChats({ searchResults }) {
  const { setSelectedChat, setChatUser, chats, user } = ChatState();
  
  const findChatByUsers = (chats, user1Id, user2Id) => {
    for (let chat of chats) {
        const users = chat.users.map(user => user._id);
        const sortedUsers = users.sort();
        const sortedInputUsers = [user1Id, user2Id].sort();

        if (JSON.stringify(sortedUsers) === JSON.stringify(sortedInputUsers)) {
            return chat._id;
        }
    }
    return null; // Return null if no matching chat is found
  }
  
  const addUserToMyChats = async (receiverID) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      const { data } = await axios.post(
        "/api/chat",
        {
          userId: receiverID,
        },
        config
      );
      return data._id;
    } catch (error) {
      console.log("error courred");
      // toast.error("Error ocurred!");
    }
  }

  const handleSelectedChat = async (item) => {
    let chatId = findChatByUsers(chats, user._id, item._id);
    if (!chatId) {
      chatId = await addUserToMyChats(item._id);
    }
    console.log("chatID", chatId);
    setSelectedChat(chatId);
    setChatUser(item);
  };

  return (
    <>
      <List>
        {searchResults?.map((item, index) => (
          <ListItem key={index} button onClick={() => handleSelectedChat(item)}>
            <div elevation={3} className="flex items-center">
              <Avatar
                alt="Remy Sharp"
                src={item?.profilePicture}
                sx={{ width: 40, height: 40 }}
              />
              <div className="flex flex-col ml-2">
                <p className="text-[#7095F2] font-medium text-md">
                  {item?.name}
                </p>
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default SearchedChats;
