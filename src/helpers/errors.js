class Errors {

  constructor () {
    this.errors = {}
  }

  first (field) { // or get()...?
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }

  attach (errors) { // or record()...?
    this.errors = errors
  }

  clear (field) {
    if (field) {
      delete this.errors[field]
      return
    }
    this.reset()
  }

  has (field) {
    return this.errors.hasOwnProperty(field)
  }

  any () {
    return (Object.keys(this.errors).length > 0)
  }

  reset () {
    this.errors = {}
  }
}

export default Errors
