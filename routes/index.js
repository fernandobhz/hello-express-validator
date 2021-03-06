const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', body: "" });
});

const nomeValidator = check('nome').notEmpty().withMessage('Nome é requerido');
const idadeValidator = check('idade').isInt().withMessage('Idade é requerido e deve ser um inteiro')

router.post('/', [nomeValidator, idadeValidator]);

router.post('/', function(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors.errors.map(item => `${item.param}: ${item.msg}`).join("\n");
    throw new Error(errorMessage);
  }

  res.render('index', { title: 'Express', body: req.body });
});

module.exports = router;
