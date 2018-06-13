import React from 'react'
import { render } from 'react-dom'
import App from './app.js'
import Model from './model'

const store = Model.getStore()
const Root = App(store)

render(
  Root,
  document.getElementById('root')
)
