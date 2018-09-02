/* global jasmine, beforeAll, afterAll, it, expect */

const { join } = require('path')
const { readdirSync } = require('fs')
const connect = require('connect')
const serve = require('serve-static')
const puppeteer = require('puppeteer')

const port = 8073

let server
let browser
let page

const customMatchers = {
  toPass: function () {
    return {
      compare: function (result, message) {
        return {
          pass: result,
          message: () => message
        }
      }
    }
  }
}

beforeAll(done => {
  jasmine.addMatchers(customMatchers)
  server = connect()
    .use(serve(join(__dirname, '..'), { etag: false }))
    .listen(port, async () => {
      browser = await puppeteer.launch({
        headless: true,
        args: process.env.TRAVIS === 'true' ? [ '--no-sandbox' ] : []
      })
      page = await browser.newPage()
      done()
    })
})

afterAll(async done => {
  await browser.close()
  server.close(done)
})

const tests = readdirSync(join(__dirname, 'browser'))
for (let test of tests) {
  it(`Execute ${test}`, async () => {
    await page.goto(`http://localhost:${port}/test/browser/${test}`)
    await page.waitForSelector('.jasmine-overall-result')
    const result = await page.evaluate(x => {
      const result = document.querySelector('.jasmine-overall-result')
      return result.classList.contains('jasmine-passed')
    })
    const {
      summary, duration, results
    } = await page.evaluate(x => {
      const summary = document.querySelector('.jasmine-overall-result').innerText
      const duration = document.querySelector('.jasmine-duration').innerText
      const results = document.querySelector('.jasmine-results').innerText
      return {
        summary, duration, results
      }
    })
    expect(result).toPass(`${summary}; ${duration}\n${results}`)
  })
}
