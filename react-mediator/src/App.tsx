import React, { FC } from 'react';
import { Upload } from './components/upload'

export const App: FC = () => {
  return (
    <div className="container mt-3">
      <h3>React Mediator Pattern</h3>
      <Upload />
    </div>
  ) 
}