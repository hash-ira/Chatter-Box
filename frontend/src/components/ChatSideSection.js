import React, { useEffect } from 'react';
import { Grid, Avatar } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { ChatState } from '../context/ChatContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import MyChats from './MyChats';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Button } from '@mui/material';
import SearchedChats from './SearchedChats';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function ChatSideSection({ fetchAgain }) {
  const { user, setChats, chats, setChatUser } = ChatState();
  const [searchValue, setSearchValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [home, setHome] = React.useState(true);
  const navigate = useNavigate();

  const logoutHandler = () => {
    sessionStorage.removeItem("userInfo");
    navigate('/');
  }
 

  const fetchChats = async () => {
    if (!user) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log(data);
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

  const handleHomeBtnClick = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
  
      await axios.delete("/api/chat/", config);
      fetchChats();
      setChatUser({});
      setHome(true);
      
    } catch (error) {
      toast.error("Error occurred while deleting chats");
    }
  }
  

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [user , home, chats]);

  return (
    <Grid item xs={12} lg={3} className='bg-[#F8F9F8]'>
      <div elevation={3} className='flex flex-row my-6 px-4 justify-between items-center ml-1'>
        <div className='flex flex-row items-center justify-around'>
          <Avatar alt="Remy Sharp" src={user?.profilePicture} sx={{ width: 64, height: 64 }} />
          <h2 className='text-[#7095F2] font-semibold text-lg ml-2'>{user?.name}</h2>
        </div>

        <div>
          <Button variant="contained" endIcon={<LogoutIcon />} size="small" onClick={logoutHandler} style={{ backgroundColor: '#6788db', color: '#FFFFFF' }}>
            Logout
          </Button>
        </div>
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
          <IconButton onClick={() => handleHomeBtnClick()}>
            <HomeIcon  className={`text-gray-${home ? "200" : "700"}`}/>
          </IconButton>
      </div>

      { home && <p className="pl-4 pt-2 text-gray-500 font-bold text-sm">Home</p>}
      { !home && <p className="pl-4 pt-2 text-gray-500 font-bold text-sm">Search Results</p>}

      <div>
        {home ? <MyChats/> : <SearchedChats searchResults = {searchResults}/>}
      </div>
    </Grid>
  );
}

export default ChatSideSection;
