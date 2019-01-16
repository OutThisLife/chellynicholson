const { RESTDataSource } = require('apollo-datasource-rest')

module.exports = new class extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://nuh72ar6.api.sanity.io/v1/data/query'
  }

  public async getData(query: string) {
    try {
      const { result } = await this.get(`/gallery?query=${query}`)
      return result
    } catch (err) {
      console.trace(err)
      return {}
    }
  }
}()
