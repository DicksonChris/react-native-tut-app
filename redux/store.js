import { configureStore } from '@reduxjs/toolkit'
import { campsitesReducer } from '../features/campsites/campsitesSlice'
import { commentsReducer } from '../features/comments/commentsSlice'
import { favoritesReducer } from '../features/favorites/favoritesSlice'
import { partnersReducer } from '../features/partners/partnersSlice'
import { promotionsReducer } from '../features/promotions/promotionsSlice'

export const store = configureStore({
  reducer: {
    campsites: campsitesReducer,
    comments: commentsReducer,
    favorites: favoritesReducer,
    partners: partnersReducer,
    promotions: promotionsReducer,
  },
})
