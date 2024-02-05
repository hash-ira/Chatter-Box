import React, { useEffect } from 'react';
import { Grid, Avatar } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { ChatState } from '../context/ChatContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import MyChats from './MyChats';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import SearchedChats from './SearchedChats';

function ChatSideSection({ fetchAgain }) {
  const { user, setChats, chats } = ChatState();
  const [searchValue, setSearchValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [home , setHome] = React.useState(true);


  const fetchChats = async () => {
    if (!user) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const getUser = async (searchValue) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${searchValue}`, config);
      setSearchResults(data);
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const handleSearch = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      getUser(searchValue);
      setHome(false);
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [user , home, chats]);

  return (
    <Grid item xs={12} lg={3} className='bg-[#F8F9F8]'>
      <div elevation={3} className='flex my-6 px-4 items-center space-x-2 ml-1'>
        <Avatar alt="Remy Sharp" src={user?.profilePicture} sx={{ width: 64, height: 64 }} />
        <h2 className='text-[#7095F2] font-medium text-lg'>{user?.name}</h2>
      </div>

      <div className="flex justify-center">
        <form className="flex items-center bg-white w-5/6 mx-auto rounded-full px-4 py-0.5 h-9">
          <div className="mr-2">
            <PersonSearchIcon className="text-gray-400" />
          </div>
          <input
            className="flex-1 bg-transparent focus:outline-none text-gray-500"
            placeholder="Search Friends"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
          />
        </form>
          <IconButton onClick={() => setHome(true)}>
            <HomeIcon  className={`text-gray-${home ? "200" : "700"}`}/>
          </IconButton>
      </div>

      { home && <p className="pl-4 pt-2 text-gray-500 font-bold text-sm">Home</p>}
      { !home && <p className="pl-4 pt-2 text-gray-500 font-bold text-sm">Search Results</p>}

      <div>
        {home ? <MyChats/> : <SearchedChats chats = {searchResults}/>}
      </div>
    </Grid>
  );
}

export default ChatSideSection;
