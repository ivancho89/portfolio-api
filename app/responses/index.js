
module.exports = class Response {
	static ok(data) {
		return this.contentType('json')
			.status(200)
			.json(data)
	}

	static badRequest(data) {
		return this.contentType('json')
			.status(400)
			.json(data)
	}

	static notFound(data) {
		return this.contentType('json')
			.status(404)
			.json(data)
	}

	static serverError(data) {
		return this.contentType('json')
			.status(500)
			.json(data)
	}
}