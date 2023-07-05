'use strict';

const data = [{ _id: 0 }];

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      const project = req.params.project;
      const queryParameters = req.query;
      
      if (Object.keys(queryParameters).length === 0) {
        const foundIssues = data.filter(obj => obj.project === project);
        if (foundIssues.length > 0) {
          res.json(foundIssues);
        } else {
          res.json({ error: 'no issues found' });
        };
      } else {
        const foundIssues = data.filter(obj => {
          if (obj.project !== project) {
            return false;
          }
          return Object.keys(queryParameters).every(param => {
            return obj[param] === queryParameters[param];
          });
        });
    
        if (foundIssues.length > 0) {
          res.json(foundIssues);
        } else {
          res.json({ error: 'no issues found' });
        };
      };
    })
    
    .post(function (req, res){
      let project = req.params.project;
      
      if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by) {
        return res.json({ error: 'required field(s) missing' });
      };
      
      let issue = {
        _id: data[data.length - 1]._id + 1,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_on: new Date(),
        updated_on: new Date(),
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || '',
        open: true,
        status_text: req.body.status_text || '',
        project: project
      };
      data.push(issue);

      let response = {
        _id: data[data.length - 1]._id.toString(),
        issue_title: data[data.length - 1].issue_title,
        status_text: data[data.length - 1].status_text,
        created_on: data[data.length - 1].created_on,
        updated_on: data[data.length - 1].updated_on,
        created_by: data[data.length - 1].created_by,
        assigned_to: data[data.length - 1].assigned_to,
        open: data[data.length - 1].open,
        issue_text: data[data.length - 1].issue_text
      };
      res.json(response);
      
    })
    
    .put(function (req, res){
      let project = req.params.project;
      const params = req.body;
      
      if (!params._id) {
          res.json({ error: 'missing _id' });
        } else if (Object.keys(params).length === 1 && params._id) {
          res.json({ error: 'no update field(s) sent', _id: params._id });
        } else if (Object.keys(params).length >= 2 && params._id) {
          const indexToUpdate = data.findIndex(obj => obj._id == params._id);
          if (indexToUpdate !== -1) {
            data[indexToUpdate] = {
              ...data[indexToUpdate],
              ...params,
              updated_on: new Date()
            };
            res.json({ result: 'successfully updated', _id: params._id });
          } else {
            res.json({ error: 'could not update', _id: params._id });
          };
        } else {
          res.json({ error: 'could not update', _id: params._id });
        };
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      const params = req.body;

      if (!params._id) {
        res.json({ error: 'missing _id' });
      } else if (Object.keys(params).length === 1 && params._id) {
        const indexToDelete = data.findIndex(obj => obj._id == params._id);
        if (indexToDelete !== -1) {
          data.splice(indexToDelete, 1);
          res.json({ result: 'successfully deleted', '_id': params._id });
        } else {
          res.json({ error: 'could not delete', '_id': params._id });
        };
      } else {
        res.json({ error: 'could not delete', '_id': params._id });
      };      
    });
    
};
