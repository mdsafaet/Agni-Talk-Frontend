import { createBrowserRouter } from 'react-router-dom'

import MainLayouts from '../layouts/MainLayouts'

import Home from '../pages/Home'
import Features from '../pages/Features'
import Rates from '../pages/Rates'
import Packages from '../pages/Packages'
import HowItWorks from '../pages/HowItWorks'
import AppScreens from '../pages/AppScreens'
import Security from '../pages/Security'
import About from '../pages/About'
import Blog from '../pages/Blog'
import FAQ from '../pages/FAQ'
import Download from '../pages/Download'
import NotFound from '../pages/NotFound'
// import AboutUs from '../pages/AboutUs'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayouts />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'features',
        element: <Features />,
      },
      {
        path: 'rates',
        element: <Rates />,
      },
      {
        path: 'packages',
        element: <Packages />,
      },
      {
        path: 'how-it-works',
        element: <HowItWorks />,
      },
      {
        path: 'app',
        element: <AppScreens />,
      },
      {
        path: 'security',
        element: <Security />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'faq',
        element: <FAQ />,
      },
      {
        path: 'download',
        element: <Download />,
      },
      // {
      //   path:'about-us',
      //   element: <AboutUs />,
      // },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default router