const { join } = require('path')
const connect = require('connect')
const serve = require('serve-static')
const puppeteer = require('puppeteer')
const { blue, cyan, green, magenta, red, yellow } = require('colorette')

const port = 8073

let server
function startServer() {
  return new Promise((resolve, reject) => {
    server = connect()
      .use(serve(join(__dirname, '../out'), { etag: false }))
      .listen(port, err => {
        if (err) reject(err)
        else resolve()
      })
  })
}

function finishServer() {
  return server && new Promise(resolve => server.close(resolve))
}

let browser
async function startBrowser() {
  browser = await puppeteer.launch({
    headless: true,
    args: process.env.TRAVIS === 'true' ? [ '--no-sandbox' ] : []
  })
  return browser.newPage()
}

function finishBrowser() {
  return browser && browser.close()
}

function propagateConsole(page) {
  page
    .on('console', message => {
      const type = message.type().substr(0, 3).toUpperCase()
      const colors = {
        LOG: text => text,
        ERR: red,
        WAR: yellow,
        INF: cyan
      }
      const color = colors[type] || blue
      console.log(color(`${type} ${message.text()}`))
    })
    .on('pageerror', ({ message }) => console.log(red(message)))
    .on('response', response =>
      console.log(green(`${response.status()} ${response.url()}`)))
    .on('requestfailed', request =>
      console.log(magenta(`${request.failure().errorText} ${request.url()}`)))
}

async function runApp(page) {
  await page.goto(`http://localhost:${port}/app.html`)
  await page.waitForSelector('.finished')
}

(async () => {
  await startServer()
  const page = await startBrowser()
  propagateConsole(page)
  await runApp(page)
})()
.finally(() => Promise.allSettled([finishBrowser(), finishServer()]))
