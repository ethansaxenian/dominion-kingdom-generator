import ReactGA from 'react-ga';

const analytics = () => {
  ReactGA.initialize(process.env.REACT_APP_GA_ID as string);
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export default analytics;
