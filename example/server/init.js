if(Products.find({}).count() === 0){
	console.log('load sample products');
	for(i = 0; i < 6; i++){
		Products.insert({
			name: Random.choice(['Cool', 'Sweet', 'Wowzer', 'Nice']) + " Shirt",
			price: Math.floor(Math.random()*10000)/100
		});
	}
}