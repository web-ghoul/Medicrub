import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import AppProvider from './context/AppContext';
import DrawersProvider from './context/DrawersContext';
import ModalsProvider from './context/ModalsContext';
import SheetsProvider from './context/SheetsContext';
import TabsProvider from './context/TabsContext';
import UploadImagesProvider from './context/UploadImagesContext';
import "./index.css";
import { router } from './router';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <TabsProvider>
          <SheetsProvider>
            <DrawersProvider>
              <ModalsProvider>
                <UploadImagesProvider>
                  <RouterProvider router={router} />
                </UploadImagesProvider>
              </ModalsProvider>
            </DrawersProvider>
          </SheetsProvider>
        </TabsProvider>
      </AppProvider>
    </Provider>
  </React.StrictMode>
);