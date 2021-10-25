import { navigate } from '@reach/router';
import axios from 'axios';
import moment from 'moment-timezone'


/**
 * Axios Intercepter
 * To Avoid Dublicates Service call 
 * @param {*} state 
 * @returns 
 */
/* let pending = [];
let cancelToken = axios.CancelToken;
let removePending = ever => {
  for (let p in pending) {
    if (pending[p].u === ever.url + '&' + ever.method) {
      pending[p].f();
      pending.splice(p, 1);
    }
  }
};
axios.interceptors.request.use(
  config => {
    config.cancelToken = new cancelToken(c => {
      if (pending.findIndex(val => val.u == config.url + '&' + config.method) != -1) {
        c();
      } else {
        pending.push({ u: config.url + '&' + config.method, f: c });
      }
    });
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  res => {
    removePending(res.config);
    return res;
  },
  error => {
    if (axios.isCancel(error)) {
      console.log('Canceled repeated request');
    } else {
      console.error(error.response);
    }
    return Promise.reject(error);
  }
);
 */
/**
 * Get getCategory
 */
export const getCategoryList = async (date, country) => {
  let response = await axios.get(`/twitter/api/getDashboardData?date=${date}&country=${country}`)
  return {
    type: 'UPDATE_DASHBOARD',
    payload: response.data.result,
    date,
    country
  };
}


/**
 * Update User Infomation
 */
export const updateUser = async (payload) => {
  return {
    type: 'UPDATE_USER',
    payload: payload
  };
}
export const getUser = async () => {
  let response = await axios.get(`/api/getUser`)
  let payload = response.data.result
/*   if (payload !== null) {

    if (!payload.isProfileUpdate) {
      navigate("/profile")
    } else {
      navigate("/")
    }
 

  }else{
    navigate("/login")
  } */
  return {
    type: 'GET_USER',
    payload: payload
  };

}

/**
 * Update Events
 */
export const getCategoryListforEvents = async (event) => {
  let response = await axios.get(`/events/api/getAllCategories`)
  return {
    type: 'EVENTS_CATEGORY_LIST',
    payload: response.data.result,
  };
}

/**
 * Get all Tag List
 */
export const getAllTags = async () => {
  let response = await axios.get('/events/api/getAllTags')

  return {
    type: 'EVENTS_TAG_LIST',
    payload: response.data.result
  };
}

/**
 * Get all Tag List
 */
 export const getTagsResult = async () => {
  let response = await axios.get('/events/api/getAllTags')

  return {
    type: 'TAGS_LIST',
    payload: response.data.result
  };
}

/**
 * Get all Site Notification
 */
 export const getSiteNotificationResult = async () => {
  let response = await axios.get('/events/api/getSiteNotification')

  return {
    type: 'SITE_NOTIFICATION_LIST',
    payload: response.data.result
  };
}

/**
 * Get DashboardData
 */
export const getDashboardData = async (date, country) => {
  let response = await axios.get(`/twitter/api/getDashboardData?date=${date}&country=${country}`)
  return {
    type: 'UPDATE_DASHBOARD',
    payload: response.data.result,
    date,
    country
  };
}

export const getAllCategories = async () => {
  let response = await axios.get('/events/api/getAllCategories')

  return {
    type: 'GET_ALLCATEGORIES',
    payload: response.data.result
  };
}

export const getAllStdCategories = async () => {
  let response = await axios.get('/events/api/getAllStdCategories')

  return {
    type: 'GET_ALLSTDCATEGORIES',
    payload: response.data.result
  };
}

export const getAllStudents = async (status='') => {
  let response = await axios.get(`/events/api/getAllStudents?status=${status}`)

  return {
    type: 'GET_ALLSTUDENTS',
    payload: response.data.result
  };
}

export const getStudentDetail = async (studentid='') => {
  let response = await axios.get(`/events/api/getStudentDetail?studentid=${studentid}`)

  return {
    type: 'GET_ALLSTUDENTS',
    payload: response.data.result
  };
}

export const getAllEvents = async (status='') => {
  let response = await axios.get(`/events/api/getAllEvents?status=${status}`)

  return {
    type: 'EVENTS_LIST',
    payload: response.data.result
  };
}

export const getAllStudentForms = async (eventid='', studentid='') => {
  let response = await axios.get(`/events/api/getAllStudentForms?eventid=${eventid}&studentid=${studentid}`)

  return {
    type: 'STUDENT_EVENTFORM',
    payload: response.data.result
  };
}

/**
 * Get all Comments
 */
 export const getAllComments = async () => {
  let response = await axios.get('/events/api/getAllComments')

  return {
    type: 'COMMENTS_LIST',
    payload: response.data.result
  };
}