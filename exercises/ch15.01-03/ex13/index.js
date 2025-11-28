//nav 要素内のリンク (`<a>`)
const navLinks = document.querySelectorAll('nav a');
console.log("nav 内のリンク:", navLinks);

// 商品リスト (.product-list) 内の最初の商品 (.product-item)
const firstProduct = document.querySelector('.product-list .product-item');
console.log("最初の商品:", firstProduct);

//カートアイコンの画像 (`<img>`)
const cartIcon = document.querySelector('.cart-icon img');
console.log("カートアイコンの画像:", cartIcon);

//商品リスト (.product-list) 内の価格 (.price) を表示する要素
const productPrices = document.querySelectorAll('.product-list .price');
console.log("商品価格:", productPrices);

//商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (`<img>`)
const productImages = document.querySelectorAll('.product-list .product-item img');
console.log("商品画像:", productImages);

//検索バー (.search-bar) 内の検索ボタン (`<button>`)
const searchButton = document.querySelector('.search-bar button');
console.log("検索ボタン:", searchButton);

//フッター (footer) 内のパラグラフ (`<p>`) 要素
const footerParagraph = document.querySelector('footer p');
console.log("フッターパラグラフ:", footerParagraph);

//商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
const evenProducts = document.querySelectorAll('.product-list .product-item:nth-child(even)');
console.log("偶数番目の商品:", evenProducts);

//ヘッダー (header) 内のアカウントリンク (.account) の画像 (`<img>`)
const accountLinkImage = document.querySelector('header .account img');
console.log("アカウントリンクの画像:", accountLinkImage);

//ナビゲーションリンクのうち、"会社情報" のリンク
const companyInfoLink = document.querySelector('nav a[href*="company"]');
console.log("会社情報リンク:", companyInfoLink);