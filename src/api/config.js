import { getBook, removeWish } from 'backend/utils.jsw'
import wixUsers from 'wix-users';
 
let currentUser = wixUsers.currentUser.id;
let wishId;
 
const clearHandler = () => {
	const clearBtn = $w('#clearWishlist');
 
	clearBtn.onClick(() => {
		console.log('asd', wishId);
		removeWish(wishId, currentUser)
        .then((item) => {
		  wishId = [];
		  $w('#wishlistRepeater').data = wishId;
        })
        .catch((err) => console.log(err));
	})
}
 
$w.onReady(function () {
	$w('#wishlistRepeater').hide();
 
	getBook(currentUser)
	.then((result) => {
		console.log(result)
		if(result.length) {
			let booksData = result.items.map((book, i) => {
				let bookItem = {
					_id: book._id,
					title: book.title,
					authors: book.authors,
					publishedDate: book.publishedDate,
					image: book.image
				};
 
				return bookItem;
			});
			wishId = booksData;
			$w('#wishlistRepeater').data = booksData;
 
			$w('#wishlistRepeater').forEachItem(($item, itemData, index) => {
				$item('#title').text = itemData.title;
				$item('#authors').text = itemData.authors;
				$item('#publishedDate').text = itemData.publishedDate;
				$item('#image').src = itemData.image;
			})
 
			$w('#wishlistRepeater').show();
		}
		else {
			$w('#wishlistRepeater').hide();
		}
	})
	.catch(err => console.log(err))
 
	clearHandler();
});