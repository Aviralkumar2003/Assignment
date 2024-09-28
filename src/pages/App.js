import { Provider } from 'react-redux';
import store from '../store';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}




// Limitations
// 1) Filtering based on category is not working
// 2) Searching a specific product is not working

// Additions
// 1) Added a photo image, although the data structure does not have a photo attribute
// 2) Used Material UI library for a better UI/UX experience

// Note
// I don't have much hands on experience in the MERN stack but my experience as a developer (Springboot+Angular) has helped me work on this project.
// I leveraged the power of generative AI to help me with the MERN stack as I lack experience in it. This displays my versitality
// as a developer as I am not just a stack specific developer but more of a required skill developer, who can easily transist from one
// stack to other if given some Time.