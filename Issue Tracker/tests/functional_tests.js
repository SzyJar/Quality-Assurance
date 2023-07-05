const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Create an issue with every field: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/test')
      .send({
        issue_title: "issue_title_test",
        issue_text: "issue_text_test",
        created_by: "created_by_test",
        assigned_to: "assigned_to_test",
        status_text: "status_text_test",
      })
      .end(function (err, res) {
        assert.equal(res.body.issue_title, "issue_title_test")
        assert.equal(res.body.issue_text, "issue_text_test")
        assert.equal(res.body.created_by, "created_by_test")
        assert.equal(res.body.assigned_to, "assigned_to_test")
        assert.equal(res.body.status_text, "status_text_test")
        done()
      });
  });

  test('Create an issue with only required fields: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/test')
      .send({
        issue_title: "issue_title_test",
        issue_text: "issue_text_test",
        created_by: "created_by_test",
      })
      .end(function (err, res) {
        assert.equal(res.body.issue_title, "issue_title_test")
        assert.equal(res.body.issue_text, "issue_text_test")
        assert.equal(res.body.created_by, "created_by_test")
        done()
      });
  });

  test('Create an issue with missing required fields: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/test')
      .send({
        assigned_to: "assigned_to_test",
        status_text: "status_text_test",
      })
      .end(function (err, res) {
        assert.equal(res.body.error, "required field(s) missing")
        done()
      });
  });

  test('View issues on a project: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .get('/api/issues/test')
      .query({})
      .end(function (err, res) {
        assert.isArray(res.body, "is Array")
        done()
      });
  });

  test('View issues on a project with one filter: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .get('/api/issues/test')
      .query({
        issue_title: "issue_title_test"
      })
      .end(function (err, res) {
        assert.equal(res.body[0].issue_title, "issue_title_test")
        done()
      });
  });

  test('View issues on a project with multiple filters: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .get('/api/issues/test')
      .query({
        issue_title: "issue_title_test",
        issue_text: "issue_text_test"
      })
      .end(function (err, res) {
        assert.equal(res.body[0].issue_title, "issue_title_test")
        assert.equal(res.body[0].issue_text, "issue_text_test")
        done()
      });
  });

  test('Update one field on an issue: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/test')
      .send({
        _id: "1",
        issue_text: "issue_text_test_updated"
      })
      .end(function (err, res) {
        assert.equal(res.body.result, "successfully updated")
        assert.equal(res.body._id, "1")
        done()
      });
  });

  test('Update multiple fields on an issue: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/test')
      .send({
        _id: "1",
        issue_text: "issue_text_test_updated",
        status_text: "status_text_test_updated",
      })
      .end(function (err, res) {
        assert.equal(res.body.result, "successfully updated")
        assert.equal(res.body._id, "1")
        done()
      });
  });

  test('Update an issue with missing _id: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/test')
      .send({
        issue_text: "issue_text_test_updated",
        status_text: "status_text_test_updated",
      })
      .end(function (err, res) {
        assert.equal(res.body.error, "missing _id")
        done()
      });
  });

  test('Update an issue with no fields to update: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/test')
      .send({
        _id: "1"
      })
      .end(function (err, res) {
        assert.equal(res.body.error, "no update field(s) sent")
        done()
      });
  });

  test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/test')
      .send({
        _id: "invalid",
        status_text: "status_text_test_updated",
      })
      .end(function (err, res) {
        assert.equal(res.body.error, "could not update")
        assert.equal(res.body._id, "invalid")
        done()
      });
  });

  test('Delete an issue: DELETE request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .delete('/api/issues/test')
      .send({
        _id: "1",
      })
      .end(function (err, res) {
        assert.equal(res.body.result, "successfully deleted")
        assert.equal(res.body._id, "1")
        done()
      });
  });

  test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .delete('/api/issues/test')
      .send({
        _id: "invalid",
      })
      .end(function (err, res) {
        assert.equal(res.body.error, "could not delete")
        assert.equal(res.body._id, "invalid")
        done()
      });
  });

  test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .delete('/api/issues/test')
      .send({})
      .end(function (err, res) {
        assert.equal(res.body.error, "missing _id")
        done()
      });
  });
  
  after(function() {
    chai.request(server).get('/api');
  });
});
