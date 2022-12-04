expect.extend({
  toPass(result, message) {
    return {
      pass: result,
      message: () => message
    }
  }
})
