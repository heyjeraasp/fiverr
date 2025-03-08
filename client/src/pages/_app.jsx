
// import Footer from '@/components/Footer';
// import NavBar from '@/components/NavBar';
// import { StateProvider } from '@/context/StateContext';
// import reducer, { initialState } from '@/context/StateReducers';
// import "@/styles/globals.css";
// import Head from 'next/head';
// import { useRouter } from 'next/router';

// export default function App({ Component, pageProps }) {
//   const router = useRouter();
//   return (
    
//     <StateProvider initialState={initialState} reducer={reducer}>
//       <Head>
//       <title>Fiverr</title>
//       <link rel='shortcut icon' href='/favicon.ico' />
//     </Head>
//       <div className='relative flex flex-col h-screen justify-between'>
//       <NavBar />
//       <div className={`mb-auto w-full mx-auto ${router.pathname !== "/" ? "mt-36" : "" }`}>
//         <Component {...pageProps} />
//       </div>
      
//       <Footer />
//       </div>
//     </StateProvider>
//   );
// }

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { StateProvider } from '@/context/StateContext';
import reducer, { initialState } from '@/context/StateReducers';
import "@/styles/globals.css";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';  // Import SessionProvider

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <SessionProvider session={pageProps.session}> {/* Wrap with SessionProvider */}
      <StateProvider initialState={initialState} reducer={reducer}>
        <Head>
          <title>Fiverr</title>
          <link rel='shortcut icon' href='/favicon.ico' />
        </Head>
        <div className='relative flex flex-col h-screen justify-between'>
          <NavBar />
          <div className={`mb-auto w-full mx-auto ${router.pathname !== "/" ? "mt-36" : "" }`}>
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </StateProvider>
    </SessionProvider>
  );
}
