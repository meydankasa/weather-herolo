// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixUsers from 'wix-users';
import { getBooks } from 'backend/booksAPI.jsw';
import { addBook, removeBook, checkExist } from 'backend/utils.jsw';

const defaultValue =
    'https://static.wixstatic.com/media/34d294_fd0e499db4184962af15240fa980267b~mv2.png';
let currentUser = wixUsers.currentUser.id;

const likeHandler = () => {
    $w('#booksRepeater').onItemReady(($item, itemData, index) => {
        $item('#like').onClick((e) => {
            let bookItem = {
                bookId: itemData._id,
                title: itemData.title,
                authors: itemData.authors,
                publishedDate: itemData.publishedDate,
                image: itemData.image,
                userId: currentUser,
            };

            addBook(bookItem)
                .then(() => {
                    $item('#like').hide();
                    $item('#unLike').show();
                })
                .catch((err) => console.log(err));
        });
    });
};
const unLikeHandler = () => {
    $w('#booksRepeater').onItemReady(($item, itemData, index) => {
        $item('#unLike').onClick((e) => {
            $item('#unLike').hide();
            $item('#like').show();
            removeBook(itemData.title, currentUser)
                .then((item) => {
                    console.log('Book removed: ', item);
                })
                .catch((err) => console.log(err));
        });
    });
};

$w.onReady(function () {
    const searchBtn = $w('#searchButton');
    const searchInput = $w('#searchInput');

    $w('#numberOfBooks').hide();
    $w('#booksRepeater').hide();
    likeHandler();
    unLikeHandler();

    searchBtn.onClick(() => {
        if (searchInput.value) {
            $w('#emptyInputText').hide();

            getBooks(searchInput.value)
                .then((result) => {
                    $w(
                        '#numberOfBooks'
                    ).text = `Number of books: ${result.totalItems.toString()}`;

                    let booksData = result.items.map((book, index) => {
                        let bookItem = {
                            _id: `book-${index}`,
                            title: book.volumeInfo.title,
                            authors: book.volumeInfo.authors ?
                                book.volumeInfo.authors.join(', ') :
                                '',
                            publishedDate: book.volumeInfo.publishedDate,
                            image: book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail ?
                                book.volumeInfo.imageLinks.smallThumbnail :
                                defaultValue,
                        };

                        return bookItem;
                    });
                    $w('#booksRepeater').data = booksData;

                    $w('#booksRepeater').forEachItem(($item, itemData, index) => {
                        $item('#image').src = itemData.image;
                        $item('#title').text = itemData.title;
                        $item('#publishedDate').text = itemData.publishedDate;
                        $item('#authors').text = itemData.authors;

                        checkExist(itemData.title, currentUser)
                            .then((exist) => {
                                if (exist.items.length > 0) {
                                    $item('#like').hide();
                                    $item('#unLike').show();
                                } else {
                                    $item('#like').show();
                                    $item('#unLike').hide();
                                }
                            })
                            .catch((err) => console.log(err));
                    });

                    $w('#numberOfBooks').show();
                    $w('#booksRepeater').show();
                })
                .catch((error) => console.log(error));
        } else {
            $w('#emptyInputText').show();
        }
    });
});