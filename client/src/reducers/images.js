import {GET_IMAGES} from '../actions/images'

export default function reducer (state = null, action = {}) {
	switch (action.type) {
    case GET_IMAGES:
      return action.payload
		default:
      return state
	}
}
