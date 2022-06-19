import { RenderOptions, render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactElement, ReactNode } from 'react';
import { theme } from 'theme';
import { store } from 'state';
import { Provider } from 'react-redux';

const AllProviders = ({ children }: { children?: ReactNode }) => (
  <ChakraProvider theme={theme}>
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
);

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
