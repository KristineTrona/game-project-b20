import {GET_IMAGES} from '../actions/images'

const inititalState = {allImages: null, selectedImages:[]}

export default function reducer (state = inititalState, action = {}) {
	switch (action.type) {
    case GET_IMAGES:
      return {...state,
        allImages: [...state.allImages = action.payload]
      }
		default:
      return state
	}
}
