if (Products.find({}).count() === 0) {
    console.log('load sample products');

    Products.insert({
        name: 'Apple Tree',
        price: 49.67,
        image: 'AppleTree.jpg'
    });
    Products.insert({
        name: 'Birch Tree',
        price: 99.67,
        image: 'BirchTree1.jpg'
    });
    Products.insert({
        name: 'Cherry Tree',
        price: 62.67,
        image: 'AppleTree.jpg'
    });
    Products.insert({
        name: 'Maple Tree',
        price: 49.67,
        image: 'MapleTreeGreen.jpg'
    });
    Products.insert({
        name: 'Olive Tree',
        price: 349.67,
        image: 'OliveTree.jpg'
    });

}