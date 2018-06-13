const fs = require('fs')

// Provide custom regenerator runtime and core-js
require('babel-polyfill')

// Javascript required hook
let babelConfig = JSON.parse(fs.readFileSync('./.babelrc'))
require('babel-register')(babelConfig)

require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});

const Model = require('./model') 
const store = Model.getStore()

function renderFullPage(html, initialState={}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="root">
        <div>
          ${html}
        </div>
      </div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script src="/dist/main.js"></script>
    </body>
    </html>
  `;
}

const Koa = require('koa')
const koaStatic = require('koa-static')
const React = require('react')
const { renderToString } = require('react-dom/server');
const App = require('./app')(store)

const server = new Koa()
server.use(koaStatic(__dirname))
server.use(function(ctx){
  const html = renderToString(App)
  const state = store.getState()
  ctx.body = renderFullPage(html, state)
})

server.listen(3333)

