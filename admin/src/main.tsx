import { createRoot } from 'react-dom/client'
import './app/layout/index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/router.tsx'
import { Provider } from 'react-redux'
import { store } from './app/redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
