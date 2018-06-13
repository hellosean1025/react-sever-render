import Container from './containers/index'
import React from 'react'
import { Provider } from 'react-redux'

module.exports = (store)=>{
  return <Provider store={store}>
    <Container />
  </Provider>
}