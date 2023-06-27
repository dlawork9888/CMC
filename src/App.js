import React from 'react';
import {
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { useState,useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-screens';

//Pages
import Login from './Login';
import Home from './Home'
import FavoriteDesignerMoreItems from './FavoriteDesignerMoreItems';
import AllNewItemsMore from './AllNewItemsMore';
import PopularDesignersByMaterialMore from './PopularDesignersByMaterialMore';
import PopularDesignersByCategoryMore from './PopularDesignersByCategoryMore';
import NewDesignersMore from './NewDesignerMore';
import ProductDetails from './ProductDetails';
import PracticePage from './PracticePage';
import DesignerProfile from './DesignerProfile';
import Search from './Search';
import Custom from './Custom';
import Mypage from './Mypage';
import PracticePage2 from './PracticePage2';
import CraftingRequest from './CraftingRequest';
import MyFavorites from './MyFavorites';
import StoreCenter from './StoreCenter';
import RequestInformation from './RequestInformation';
import RequestApproval from './RequestApproval';
import OrdererInformation from './OrdererInformation';
import ImageResizingExample from './ImageResizingExample';
import ProgressBarExample from './ProgressBarExample';
import UnderwayDetails from './UnderwayDetails';
import CustomerEditProfile from './CutomerEditProfile';
import DesignerEditCategory from './DesignerEditCategory';
import SignUp from './SignUp';
import RequestReject from './RequestReject';
import DesignerEditProfile from './DesignerEditProfile';
import ProductRegistration from './ProductRegistration';
import LoginPractice from './LoginPractice';
import CustomerRequestInformation from './CustomerRequestInformation';
import CustomerRequestApproval from './CustomerRequestApproval';



//UserContext
import UserContext, { UserContextProvider } from './UserContext';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Custom Header
const CustomHeaderWithDM = () => {

  const navigation = useNavigation();

  return (
    <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', backgroundColor:'#FFFFFF', height:60}} >
      <TouchableOpacity onPress={()=>{if(navigation.canGoBack){navigation.goBack()}}}>
        <Image
          source={require('./App/header_back_icon.png')}
          style={{width:49,height:42, resizeMode:'contain'}}
        />
      </TouchableOpacity>
      <Image
        source={require('./App/header_CMC_logo.png')}  
        style={{width:70,height:35, resizeMode:'contain'}}
      />
      <Image
        source={require('./App/header_DM_icon.png')}  
        style={{width:28,height:28, resizeMode:'contain', marginRight:10}}
      />
    </View>
  );
};

const CustomHeaderWithoutDM = () => {

  const navigation = useNavigation();

  return (
    <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', backgroundColor:'#FFFFFF', height:60}} >
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image
          source={require('./App/header_back_icon.png')}
          style={{width:49,height:42, resizeMode:'contain'}}
        />
      </TouchableOpacity>
      <Image
        source={require('./App/header_CMC_logo.png')}  
        style={{width:70,height:35, resizeMode:'contain'}}
      />
      <View style={{width:49,height:42,marginRight:10}}></View>
    </View>
  );
};



function TabNavigator() {

  //UserContext
  const userContext = useContext(UserContext);
  // Tab Nav는 Login 다음에 로드되므로, userType이 -1이 나오는 경우는 없음.(확인했음)
  console.log('TabNav load Complete. UserType : ', userContext.userContext.userType)

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF5160'
      }}>
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          headerShown : true,
          header: () => <CustomHeaderWithDM />,
          title: 'Home',
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={focused ? require('./App/BottomTab_HomeIcon_Pink.png') : require('./App/BottomTab_HomeIcon_Gray.png')}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          ),
        }}  
      />
      <Tab.Screen 
        name="Search" 
        component={Search}
        options={{
          headerShown:true,
          header: () => <CustomHeaderWithoutDM/>,
          title: 'Search',
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={focused ? require('./App/BottomTab_SearchIcon_Pink.png') : require('./App/BottomTab_SearchIcon_Gray.png')}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          ),
        }}   
      />
{/*UserContext의 userType이 0이면 구매자 => 하단 탭 바 커스텀 출력 */}
      {(userContext.userContext.userType === 0) && (
        <Tab.Screen 
          name="Custom" 
          component={Custom}
          options={{
            headerShown:true,
            header: () => <CustomHeaderWithDM/>,
            title: 'Custom',
            tabBarIcon: ({ focused, size }) => (
              <Image
                source={focused ? require('./App/BottomTab_CustomIcon_Pink.png') : require('./App/BottomTab_CustomIcon_Gray.png')}
                style={{ width: size, height: size }}
                resizeMode="contain"
              />
            ),
          }}  
        />
        )
      }
{/*UserContext의 userType이 1이면 디자이너 => 하단 탭 바 스토어센터 출력 */}
      {(userContext.userContext.userType === 1) && (
        <Tab.Screen 
          name="StoreCenter" 
          component={StoreCenter}
          options={{
            headerShown:true,
            header: () => <CustomHeaderWithDM/>,
            title: 'StoreCenter',
            tabBarIcon: ({ focused, size }) => (
              <Image
                source={focused ? require('./App/BottomTab_StoreCenterIcon_Pink.png') : require('./App/BottomTab_StoreCenterIcon_Gray.png')}
                style={{ width: size, height: size }}
                resizeMode="contain"
              />
            ),
          }}  
        />
        )
      }
      <Tab.Screen 
        name="Mypage" 
        component={Mypage}
        options={{
          headerShown:false,
          header: () => <CustomHeaderWithDM/>,
          title: 'Mypage',
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={focused ? require('./App/BottomTab_MypageIcon_Pink.png') : require('./App/BottomTab_MypageIcon_Gray.png')}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          ),
        }}    
      />
    </Tab.Navigator>
  );
}


const App = () => {
  return (
  <UserContextProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = 'Start'
          component = {HomeScreen}
          options = {{headerShown: false}}
        />
        <Stack.Screen
          name = 'Login'
          component = {Login}
          options = {{headerShown: false}}
        />
        <Stack.Screen
          name = 'Tabs'
          component = {TabNavigator}
/*헤더 조심*/
          options = {{headerShown: false}}
        />
        <Stack.Screen
          name = 'FavoriteDesignerMoreItems'
          component = {FavoriteDesignerMoreItems}
          options={{
            headerShown: true,
            header:() => <CustomHeaderWithoutDM/>
          }}
        />
        <Stack.Screen
          name = 'AllNewItemsMore'
          component = {AllNewItemsMore}
          options={{
            headerShown: true,
            header:() => <CustomHeaderWithoutDM/>
          }}
        />
        <Stack.Screen
          name = 'PopularDesignersByMaterialMore'
          component = {PopularDesignersByMaterialMore}
          options={{
            headerShown: true,
            header:() => <CustomHeaderWithoutDM/>
          }}
        />
        <Stack.Screen
          name = 'NewDesignersMore'
          component = {NewDesignersMore}
          options={{
            headerShown: true,
            header:() => <CustomHeaderWithoutDM/>
          }}
        />
        <Stack.Screen
          name = 'PopularDesignersByCategoryMore'
          component = {PopularDesignersByCategoryMore}
          options={{
            headerShown: true,
            header:() => <CustomHeaderWithoutDM/>
          }}
        />
        <Stack.Screen
          name = 'ProductDetails'
          component = {ProductDetails}
          options={{
            headerShown: true,
            header:() => <CustomHeaderWithoutDM/>
          }}
        />
        <Stack.Screen
          name = 'PracticePage'
          component = {PracticePage}
          options={{
            headerShown: true,
            header:() => <CustomHeaderWithoutDM/>
          }}
        />
        <Stack.Screen
          name = 'DesignerProfile'
          component = {DesignerProfile}
          options={{
            headerShown: true,
            header:() => <CustomHeaderWithoutDM/>
          }}
        />
        <Stack.Screen
          name = 'PracticePage2'
          component = {PracticePage2}
          options={{
            headerShown: true,
            header:() => <CustomHeaderWithoutDM/>
          }}
        />
        <Stack.Screen
          name = 'CraftingRequest'
          component = {CraftingRequest}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name = 'MyFavorites'
          component = {MyFavorites}
          options={{
            headerShown: true,
            header:() => <CustomHeaderWithoutDM/>
          }}
        />
        <Stack.Screen
          name = 'RequestInformation'
          component = {RequestInformation}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = 'RequestApproval'
          component = {RequestApproval}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = 'OrdererInformation'
          component = {OrdererInformation}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = 'ProgressBarExample'
          component = {ProgressBarExample}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = 'ImageResizingExample'
          component = {ImageResizingExample}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = 'UnderwayDetails'
          component = {UnderwayDetails}
          options={{
            headerShown: true,
            header:() => <CustomHeaderWithoutDM/>
          }}
        />
        <Stack.Screen
          name = 'CustomerEditProfile'
          component = {CustomerEditProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name = 'DesignerEditCategory'
          component = {DesignerEditCategory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name = 'DesignerEditProfile'
          component = {DesignerEditProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name = 'SignUp'
          component = {SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name = 'RequestReject'
          component = {RequestReject}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name = 'ProductRegistration'
          component = {ProductRegistration}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name = 'LoginPractice'
          component = {LoginPractice}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name = 'CustomerRequestInformation'
          component = {CustomerRequestInformation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name = 'CustomerRequestApproval'
          component = {CustomerRequestApproval}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </UserContextProvider>
  );
};





function HomeScreen({ navigation }) {
//UserContext 적용
  const userContext = useContext(UserContext);

  const handleCustomerLogin = () => {
    navigation.navigate('Login');
    userContext.setUserType(0);
  };

  const handleDesignerLogin = () => {
    navigation.navigate('Login');
    userContext.setUserType(1);
  };

  console.log('App.js Entered(CMC App just started)')
  console.log("userType : ",userContext.userContext.userType)

  return (
      <ImageBackground source={require('./App/Login1_Background.png')} style={styles.imagebackground}>
        <View style={styles.logoContainer}>
            <Image source={require('./App/CMC_logo.png')} style={styles.logo} />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleCustomerLogin}>
            <Image source={require('./App/customer_login_button.png')} style={styles.logo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDesignerLogin}>
            <Image source={require('./App/designer_login_button.png')} style={styles.logo} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagebackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: '25%',
    left: '25%',
    right: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: '20%',
    left: '25%',
    right: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  logo: {
    resizeMode: 'contain',
    opacity: 1,
    marginTop: 10,
  },
});

export default App;
