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
    .listen(port, () => {
      puppeteer
        .launch({
          headless: true,
          args: process.env.TRAVIS === 'true' ? [ '--no-sandbox' ] : []
        })
        .then(result => {
          browser = result
          return browser.newPage()
        })
        .then(result => {
          page = result
          done()
        })
    })
})

afterAll(done => {
  browser
    .close()
    .then(() => server.close(done))
})

const tests = readdirSync(join(__dirname, 'browser'))
for (let test of tests) {
  it(`Execute ${test}`, done => {
    let result
    page
      .goto(`http://localhost:${port}/test/browser/${test}`)
      .then(() => page.waitForSelector('.jasmine-overall-result'))
      .then(() => page.evaluate(() => {
        const result = document.querySelector('.jasmine-overall-result')
        return result.classList.contains('jasmine-passed')
      }))
      .then(output => {
        result = output
        return page.evaluate(() => {
          const summary = document.querySelector('.jasmine-overall-result').innerText
          const duration = document.querySelector('.jasmine-duration').innerText
          const results = document.querySelector('.jasmine-results').innerText
          return { summary, duration, results }
        })
      })
      .then(({ summary, duration, results }) => {
        expect(result).toPass(`${summary}; ${duration}\n${results}`)
        done()
      })
  })
}
