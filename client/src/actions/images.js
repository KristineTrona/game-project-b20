import * as request from 'superagent'
import {baseUrl} from '../constants'

export const GET_IMAGES = 'GET_IMAGES'
export const SELECT_IMAGES = 'SELECT_IMAGES'


const updateImages = images => ({
  type: GET_IMAGES,
  payload: images.images
})

export const getImages = () => (dispatch) => {
  request
    .get(`${baseUrl}/images`)
    .then(result => dispatch(updateImages(result.body)))
    .catch(err => console.error(err))
}

export function selectImages(image){
  return {
    type: SELECT_IMAGES,
    payload: image
  }
}

// export const getImages = () => (dispatch, getState) => {
//   const state = getState()
//   if (!state.currentUser) return null
//   const jwt = state.currentUser.jwt

//   if (isExpired(jwt)) return dispatch(logout())

//   request
//     .get(`${baseUrl}/images`)
//     .set('Authorization', `Bearer ${jwt}`)
//     .then(result => dispatch(updateImages(result.body)))
//     .catch(err => console.error(err))
// }


