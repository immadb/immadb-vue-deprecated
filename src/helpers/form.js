import axios from '@/modules/axios'
// import config from '../config'
import Errors from './errors'

class Form {

  constructor (data) {
    this.data = data

    for (let field in data) {
      this[field] = data[field]
    }

    this.errors = new Errors()
  }

  reset () {
    for (let field in this.data) {
      this[field] = this.data[field]
    }

    this.errors.clear()
  }

  getData () {
    let data = {}

    for (let property in this.data) {
      data[property] = this[property]
    }

    return data
  }

  post (url, options) {
    return this.submit('post', url, options)
  }

  put (url, options) {
    return this.submit('put', url, options)
  }

  patch (url, options) {
    return this.submit('patch', url, options)
  }

  delete (url, options) {
    return this.submit('delete', url, options)
  }

  submit (requestType, url, options = {}) {
    return new Promise((resolve, reject) => {
      axios[requestType](url, this.getData())
      // req[requestType](url, this.getData())
      .then(response => {
        this.onSuccess(response.data, options)
        resolve(response.data)
      })
      .catch(error => {
        this.onFail(error.response.data, options)
        reject(error.response.data)
      })
    })
  }

  onSuccess (data, options) {
    if (options.reset === false) return
    this.reset()
  }

  onFail (errors, options) {
    /**
     * Updated to reflect change in L5.5's Consistent Exception Handling, where the error response has an errors
     * property.
     */
    this.errors.attach(errors.errors)
  }
}

export default Form
