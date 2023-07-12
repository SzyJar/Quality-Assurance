const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  
  test('Translation with text and locale fields: POST request to /api/translate', function (done) {
    chai
      .request(server)
      .post('/api/translate')
      .send({ locale: 'british-to-american', text: 'I spent the bank holiday at the funfair.' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.text, 'I spent the bank holiday at the funfair.');
        assert.equal(res.body.translation, 'I spent the <span class="highlight">public</span> holiday at the <span class="highlight">carnival.</span>');
        done();
      });
  });

  test('Translation with text and invalid locale field: POST request to /api/translate', function (done) {
    chai
      .request(server)
      .post('/api/translate')
      .send({ locale: 'british-to-polish', text: 'I spent the bank holiday at the funfair.' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid value for locale field');
        done();
      });
  });

  test('Translation with missing text field: POST request to /api/translate', function (done) {
    chai
      .request(server)
      .post('/api/translate')
      .send({ locale: 'british-to-american' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });

  test('Translation with missing locale field: POST request to /api/translate', function (done) {
    chai
      .request(server)
      .post('/api/translate')
      .send({ locale: '', text: 'text' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });

  test('Translation with empty text: POST request to /api/translate', function (done) {
    chai
      .request(server)
      .post('/api/translate')
      .send({ locale: 'british-to-american', text: '' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'No text to translate');
        done();
      });
  });

  test('Translation with text that needs no translation: POST request to /api/translate', function (done) {
    chai
      .request(server)
      .post('/api/translate')
      .send({ locale: 'british-to-american', text: 'I don\'t need translation!' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.text, 'I don\'t need translation!');
        assert.equal(res.body.translation, 'Everything looks good to me!');
        done();
      });
  });

  after(function() {
    chai.request(server).get('/api');
  });
  
});
