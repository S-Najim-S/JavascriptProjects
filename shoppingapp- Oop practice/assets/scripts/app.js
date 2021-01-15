class Product {
	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}
}
class ElementAttribute {
	constructor(attrName, attrValue) {
		this.name = attrName;
		this.value = attrValue;
	}
}

class Component {
	constructor(renderHookId) {
		this.hookId = renderHookId;
		this.render();
	}
	render() {}
	createRootElement(tag, cssClasses, attributes) {
		const rootElement = document.createElement(tag);
		if (cssClasses) {
			rootElement.className = cssClasses;
		}
		if (attributes && attributes.length > 0) {
			for (const attr of attributes) {
				rootElement.setAttribute(attr.name, attr.value);
			}
		}
		document.getElementById(this.hookId).append(rootElement);
		return rootElement;
	}
}

class ShoppingCart extends Component {
	items = [];

	set cartItems(value) {
		this.items = value;
		this.totalOutput.innerHTML = `<h2>Total: $${this.totalAmount.toFixed(
			2
		)}</h2>`;
	}

	get totalAmount() {
		const sum = this.items.reduce((oldVal, curItem) => {
			return oldVal + curItem.price;
		}, 0);
		return sum;
	}

	constructor(renderHookId) {
		super(renderHookId);
	}

	addProduct(product) {
		const updatedItems = [...this.items];
		updatedItems.push(product);
		this.cartItems = updatedItems;
	}

	render() {
		const cartEl = this.createRootElement("section", "cart");
		cartEl.innerHTML = `
			<h2>Total: $${0}</h2>
			<button>Order Now</button>
		`;
		this.totalOutput = cartEl.querySelector("h2");
		return cartEl;
	}
}

class ProductItem extends Component {
	constructor(product, renderHookId) {
		super(renderHookId);
		this.product = product;
	}

	addingToCart() {
		console.log("Adding...", this.product);
		App.addProductToCart(this.product);
	}
	render() {
		const prodEl = this.createRootElement("li", "product-item");
		prodEl.innerHTML = `
		<div>
			<img src="${this.product.imageUrl}">
			<div class="product-item__content">
				<h2>${this.product.title}</h2>
				<h3>$${this.product.price}</h3>
				<p>${this.product.description}</p>
				<button>Add to cart</button>
			</div>
		</div>
		`;
		const addToCart = prodEl.querySelector("button");
		addToCart.addEventListener("click", this.addingToCart.bind(this));
	}
}
class ProductList extends Component {
	products = [
		new Product(
			"A Smart phone",
			"https://images-na.ssl-images-amazon.com/images/I/61WgNw2RO5L._AC_SX679_.jpg",
			"Smart with a pen",
			1024.9
		),
		new Product(
			"A Tv",
			"https://www.homeandsmart.de/var/site/storage/images/_aliases/fixed_col_8/8/8/9/1/401988-1-ger-DE/philips-android-tv.jpg",
			"Smart remote",
			899.9
		),
	];

	constructor(renderHooId) {
		super(renderHooId);
	}

	render() {
		this.createRootElement("ul", "product-list", [
			new ElementAttribute("id", "prod-list"),
		]);
		for (const prod of this.products) {
			new ProductItem(prod, "prod-list");
		}
	}
}
class Shop extends Component {
	constructor() {
		super();
	}
	render() {
		this.cart = new ShoppingCart("app");
		new ProductList("app");
	}
}

class App {
	static init() {
		const shop = new Shop();
		this.cart = shop.cart;
	}
	static addProductToCart(product) {
		this.cart.addProduct(product);
	}
}

App.init();
