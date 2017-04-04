/**
 * Created by lev on 4/4/17.
 */
const assert = require('assert');
const urlParser = require('url');

describe('Test koa.com site with sending browser headers', () => {
	it('Test get with headers', (done) => {
		const followingRedirect = require('..');
		const options = urlParser.parse('http://koa.com');
		options.headers = {
			"Connection": "keep-alive",
			"Cache-Control": "max-age=0",
			"Upgrade-Insecure-Requests": 1,
			"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
			"Accept-Encoding": "gzip, deflate, sdch",
			"Accept-Language": "en-US,en;q=0.8,ru;q=0.6"
		};
		followingRedirect.http.get(options, (res) => {
			console.log(res.responseUrl);
			assert.equal(res.responseUrl.toLowerCase().indexOf('error'), -1, "Wrong url returned");
			done();
		}).on('error',(err) => {
			done(err);
		});

 	}).timeout(10000);

	it('Test head with headers', (done) => {
		const followingRedirect = require('..');
		const options = urlParser.parse('http://koa.com');
		followingRedirect.http.head(options, (res) => {
			console.log(res.responseUrl);
			assert.equal(res.responseUrl.toLowerCase().indexOf('error'), -1, "Wrong url returned");
			done();
		}).on('error',(err) => {
			done(err);
		});

	}).timeout(10000);
});

