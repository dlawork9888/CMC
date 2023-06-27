import React from 'react';

const APIcontext = React.createContext({
  
  /*auth*/
  
  auth_signup_member: 'http://3.39.131.14:8080/api/v1/auth/signup/member',
  auth_signup_designer: 'http://3.39.131.14:8080/api/v1/auth/signup/designer',
  auth_signin_member: 'http://3.39.131.14:8080/api/v1/auth/signin/member',
  auth_signin_designer: 'http://3.39.131.14:8080/api/v1/auth/signin/designer',
  
  
  /*여기까지 완료!*/
  

  /*Member*/
  put_members_bodyinfo: 'http://3.39.131.14:8080/api/v1/members/body-info', //CustomerEditProfile
  post_members_bodyinfo: 'http://3.39.131.14:8080/api/v1/members/body-info', //CustomerEditProfile
  put_members_bodyinfo: 'http://3.39.131.14:8080/api/v1/members/body-info', //CustomerEditProfile
  get_members_bodyinfo: 'http://3.39.131.14:8080/api/v1/members/body-info', //CustomerEditProfile
  get_menbers_bodyinfo_filled: 'http://3.39.131.14:8080/api/v1/members/profiles/status', //CustomerEditProfile
  get_members_detail: 'http://3.39.131.14:8080/api/v1/members/detail', //CustomerEditProfile



  /*Designer*/
  //디자이너 카테고리 조회
  get_designer_my_category: 'http://3.39.131.14:8080/api/v1/designers/categories',
  patch_designer_my_category:'http://3.39.131.14:8080/api/v1/designers/categories',


  /*Member Custom*/
  //커스텀 요청 
  post_crafting_request: 'http://3.39.131.14:8080/api/v1/members/custom',


  /*Designer Custom*/
  //커스텀 요청 보기(새주문)
  get_all_custom_request: 'http://3.39.131.14:8080/api/v1/designers/custom',

  /*Product API*/
  //좋아요 순 디자이너 조회
  get_likes_descend_designers:'http://3.39.131.14:8080/api/v1/designers/ranks/like',
  //신규 디자이너 조회
  get_new_designers:'http://3.39.131.14:8080/api/v1/designers/ranks/fresh',
  //홈화면 전체 인기 상품 조회
  get_popular_products: 'http://3.39.131.14:8080/api/v1/product/popularity',
  //홈화면 전체 신제품 조회
  get_all_products :'http://3.39.131.14:8080/api/v1/product/latest'
  
});
export default APIcontext;
