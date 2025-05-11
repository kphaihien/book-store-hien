import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'


import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
import { store } from './redux/store.js'

import 'sweetalert2/dist/sweetalert2.js'

createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
