const Common = require('./common');
const async = require('async');
const WishModel = require('../models/wish');
const Constant = require('../constant/constant');
const Wish = require('../models/wish');

let exportObj = {
  getList,
  add,
};
module.exports = exportObj;
function getList(req, res) {
  let tasks = {
    query: (cb) => {
      WishModel.findAll({
        limit: 10,
        order: [['created_at', 'DESC']],
      })
        .then(function (result) {
          let list = [];
          result.forEach((v, i) => {
            let obj = {
              id: v.id,
              name: v.name,
              content: v.content,
            };
            list.push(obj);
          });
          cb(null, list);
        })
        .catch(function (err) {
          console.log(err);
          cb(Constant.DEFAULT_ERROR);
        });
    },
  };
  async.auto(tasks, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        list: result['query'],
      });
    }
  });
}

function add(req, res) {
  let tasks = {
    checkParams: (cb) => {
      Common.checkParams(req.body, ['name', 'content'], cb);
    },
    add: [
      'checkParams',
      (results, cb) => {
        WishModel.create({
          name: req.body.name,
          content: req.body.content,
        })
          .then(function (result) {
            cb(null);
          })
          .catch(function (err) {
            console.log(err);
            cb(Constant.DEFAULT_ERROR);
          });
      },
    ],
  };
  async.auto(tasks, function (err, result) {
    if (err) {
      console.log(err);
      let result = '失败';
      let msg = '添加失败，出现错误';
      if (err.code === 199) {
        msg = '添加失败，姓名和愿望都要填上哦';
      }
      res.render('result', {
        result: result,
        msg: msg,
      });
    } else {
      res.render('result', {
        result: '成功！',
        msg: '添加成功，返回去看一下',
      });
    }
  });
}
