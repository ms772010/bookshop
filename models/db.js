var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/books');
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(callback){});
var bookSchema=mongoose.Schema({
	_id:String,
	name:String,
	price:Number,
	amount:Number
});
bookSchema.methods.addbook = function(book, callback) {
	this._id=book._id;
	this.name = book.name;
	this.price = book.price;
	this.amount=book.amount;
	this.save(callback);
}

var books=mongoose.model('books',bookSchema);

module.exports=books;