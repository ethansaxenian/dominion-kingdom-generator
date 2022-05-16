import App from 'components/App';
import { render } from '../test-utils';

describe('App tests', () => {

  test('Renders without crashing', () => {
    render(<App/>);
  });

});
