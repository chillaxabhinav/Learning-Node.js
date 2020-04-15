const getDb = require('../util/database').getDb;

class Product {
	constructor(title, price, description, imageURL){
		this.title = title;
		this.price = price;
		this.imageURL = imageURL;
		this.description = description;
	}

	save(){
		const db = getDb();
		return db.collection('products').insertOne(this)
			.then(result =>{
				console.log('Saved');
			})
			.catch(err => {
				console.log(err);
			});
	}

	static fetchAll(){
		const db = getDb();
		return db.collection('products').find()
			.toArray()
			.then(products => {
				return products;
			})
			.catch(err => 
				{console.log(err);
			})
	}
}


module.exports = Product;