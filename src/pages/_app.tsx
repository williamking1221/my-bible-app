import '../styles/BibleStudyContent.css'; // Import the specific CSS for BibleStudyContent
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;