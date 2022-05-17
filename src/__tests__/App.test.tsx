import { App } from 'components';
import { render } from './test-utils';

describe('App tests', () => {

  test('Renders without crashing', () => {
    render(<App/>);
  });

});
