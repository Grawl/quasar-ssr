const path = require('path')
const dotEnv = require('dotenv-safe')
const isFile = require('is-file')

const init = (local = '.env', example = '.env.sample') => {
	dotEnv.config({
		allowEmptyValues: true,
		path: isFile(path.join(process.cwd(), local)) ? local : example,
		example,
	})
}
module.exports = init
