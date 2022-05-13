import chai from 'chai'
let assert = chai.assert
import request from 'supertest'

// I want to test app.js, so I import it
import app from '../app.js'

describe('Static Server', () => {
    it('should return index.html if "/" requested', async () => {
        const res = await request(app).get("/")

        assert.equal(res.statusCode, 200)

        assert.include(
            res.text, 
            '<script src="javascripts/index.js"></script>',
            'body has html code we recognize as from index.html')        
    })

    it('status code should be 404 for a non-existant file', async () => {
        const res = await request(app).get("/gdfrhfs;ljdsf;lkjdsa;lkjfdsa.html")

        assert.equal(res.statusCode, 404)
    })
})