import {GET_IMAGES, SELECT_IMAGES } from '../actions/images'

const inititalState = {allImages: null, selectedImages:[]}

export default function reducer (state = inititalState, action = {}) {
	switch (action.type) {
    case GET_IMAGES:
      return {...state,
        allImages: [...state.allImages = action.payload]
      }
    case SELECT_IMAGES:
      return { ...state, 
        selectedImages: [...state.selectedImages, action.payload ]
        }
		default:
      return state
	}
}
