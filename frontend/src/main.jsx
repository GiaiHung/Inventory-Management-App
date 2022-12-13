import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './store/app'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster position="bottom-center" reverseOrder={false} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
