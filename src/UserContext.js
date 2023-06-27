import React, { useState } from 'react';

//검색 기록 예시
const DATA = [
  "성수", "생로랑" ,
];


const UserContext = React.createContext({
  
  
  userContext: { 
    userType: -1, 
    accessToken:'', 
    refreshToken:'' ,
    userId:'',
    clickedCustomId:'',
    clickedDesignerId: -1,
    clickedProductId:-1,
    searchHistory:[],
    currentCustomResultId: -1,
    myDesignerId:-1
  },
  setUserType: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
  setUserId:()=>{},
  setClickedCustomId: ()=>{},
  setClickedDesignerId: ()=>{},
  setClickedProductId: ()=>{},
  setSearchHistory:()=>{},
  setCurrentCustomResultId:()=>{},
  setMyDesignerId:()=>{}
});

//userType = 0 구매자 
//userType = 1 디자이너
export const UserContextProvider = ({ children }) => {
  const [userType, setUserType] = useState(-1);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [userId, setUserId] = useState(-1);
  const [clickedCustomId, setClickedCustomId] = useState('');
  const [clickedDesignerId, setClickedDesignerId] = useState(-1);
  const [clickedProductId, setClickedProductId] = useState(-1);
  const [searchHistory,setSearchHistory] = useState(DATA);
  const [currentCustomResultId,setCurrentCustomResultId] = useState(-1);
  const [myDesignerId, setMyDesignerId] = useState(-1);


  const userContext = {
    userContext: { 
      userType,
      accessToken,
      refreshToken,
      userId,
      clickedCustomId,
      clickedDesignerId,
      clickedProductId,
      searchHistory,
      currentCustomResultId,
      myDesignerId,
    },
    setUserType: (value) => setUserType(value),
    setAccessToken: (value) => setAccessToken(value),
    setRefreshToken: (value) => setRefreshToken(value),
    setUserId: (value) => setUserId(value),
    setClickedCustomId: (value) => setClickedCustomId(value),
    setClickedDesignerId: (value) => setClickedDesignerId(value),
    setClickedProductId: (value) => setClickedProductId(value),
    setSearchHistory:(value)=> setSearchHistory(value),
    setCurrentCustomResultId:(value)=>setCurrentCustomResultId(value),
    setMyDesignerId:(value)=>setMyDesignerId(value)
  };


  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
};

export default UserContext;