'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const locale = req.body.locale;
      const text = req.body.text;

      if(text === undefined || !locale) {
        return res.json({ error: 'Required field(s) missing' });
      };

      if (text.trim() === '') {
        return res.json({ error: 'No text to translate' });
      };
      
      if (locale === 'british-to-american') {
        let translation = translator.britishToAmerican(text);
        
        if (text === translation){
          return res.json({ text: text, translation: 'Everything looks good to me!'})
        } else {
          return res.json({ text: text, translation: translator.addSpanElement(text, translation) });
        };        
      };
      
      if (locale === 'american-to-british') {
        let translation = translator.americanToBritish(text);

        if (text === translation){
          return res.json({ text: text, translation: 'Everything looks good to me!'})
        } else {
          return res.json({ text: text, translation: translator.addSpanElement(text, translation) });
        };
      };

      res.json({ error: 'Invalid value for locale field' });
      
    });
};
