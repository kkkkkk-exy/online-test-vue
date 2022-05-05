// import fetch from "../config/fetch";

// // 登录
// export const login = data => fetch('/auth/login', data, 'POST');

// // 获取用户信息
// export const getAdminInfo = () => fetch('/user/info');

import Axios from 'axios'
import router from '../router'

// if (window.localStorage.getItem('token') != undefined){
//     console.log('yes')
//     Axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')
// } else {
//     console.log('no')
// }

export let instance = Axios.create({
  // baseURL: 'http://kkkkkk.club:8088'
  baseURL: 'http://49.235.238.178:8090'
})

// const forbidList = ["http://localhost:8088/auth/login"]

instance.interceptors.request.use(res => {
  if (window.localStorage.getItem('token') != undefined) {
    console.log('this is token')
    res.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')
  } else {
    console.log('there are no token')
  }
  return res;
})


// response拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          console.log('403')
          localStorage.removeItem('token')
          router.push('/');
        // router.replace({
        //     path: 'login',
        //     query: { redirect: router.currentRoute.fullPath }
        // })
      }
    }
    return Promise.reject(error.response)
  }
)

export const login = (data) => {
  console.log(data)
  return instance.post('/auth/login', data)
}

//新建题集
export const addQuestionSet = (data) => {
  return instance.post('/set/' + data.id + '/' + data.name)
}

//获取老师创建的所有题集
export const getQuestionSet = (teacherId) => {
  return instance.get('/set/' + teacherId)
}

//获取题集中的所有题目
export const getMultiQuestion = (setId) => {
  return instance.get('/' + setId + '/multquestions')
}

//新增单选题
export const addMultQuestion = (setId, data) => {
  return instance.post('/' + setId + '/multiply/add', data)
}

export const getAvatarCategory = () => {
  console.log('发请求ing')
  return instance.get('/avatar/categories')
}
export const getMemeCategory = () => {
  console.log('发请求ing')
  return instance.get('/meme/categories')
}



/* 题目 */

//获取所有题目
export const getAllQuestion = (data) => {
  return instance.get('/questions?setId=' + data.setId + '&pageNum=1&pageSize=7' )
}

/* 题集 */

//获取所有题集
export const getAllSet = () => {
  return instance.get('/sets')
}

//新增题集
export const addSet = (data) => {
  return instance.post('/set', data)
}