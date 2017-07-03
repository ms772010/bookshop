
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var books=require('../models/db');
var globname;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});
router.get('/shop', function(req, res) {
 	 res.render('shop', { title: 'shop' });
});


router.get('/login', function(req, res) {
  	res.render('login', { title: 'login' });
});
router.get('/infos', function(req, res) {
  	books.find(function(err, docs){
		console.log(docs);

		res.render('infos',{Books:docs});
	});
	
});
router.get('/manage', function(req, res) {
  	books.find(function(err, docs){
		console.log(docs);

		res.render('manage',{Books:docs});
	});
});
router.get('/ad',function(req,res){
	res.render('ad', { title: 'ad' });
});
router.post('/ad',function(req, res, next) {
	console.log( req.body.name);
	
	//自定义实例方法
	var book2 = new books();
	book2.addbook({
		_id:null,
		name: req.body.name,
		price: req.body.price,
		amount:req.body.amount
	});
	res.send("<a href='/'>添加成功 点击返回主页</a>");
});
router.get("/delete/:name", function(req, res) {
	console.log(req.params.name);
  books.remove({name: req.params.name}, function(err){
	 	console.log(req.params.name);
	 	res.redirect('/manage');
	});
 
});
router.get("/updat/:name", function(req, res) {
	console.log(req.params.name);
	globname=req.params.name
  res.render('updat',{title:'updat'});
 
});
router.post('/updat',function(req, res, next) {
	var condition = {name:globname},
		update = {$set: {price: req.body.price,amount:req.body.amount}},
		options = {multi: true};
	books.update(condition, update, options, function(err){
		console.log('update error');
	});
	res.send("<a href='/'>更新成功 点击返回主页</a>");
});
router.get("/searc/:name", function(req, res) {
	
 books.find({name:req.params.name},function(err, docs){
		console.log(docs);

		res.render('infos',{Books:docs});
	});
});
module.exports = router;
