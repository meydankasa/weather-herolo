import { getBooks } from 'backend/googleBooksApi';
import wixData from 'wix-data';
import wixUsers from 'wix-users';

let currentUser = wixUsers.currentUser.id;
let defaultImage = 'https://static.wixstatic.com/media/34d294_fd0e499db4184962af15240fa980267b~mv2.png'

$w.onReady(function () {
    $w('#booksRepeater').hide();
    $w('#numberOfBooks').hide();
    $w('#unLike').hide();
    $w('#searchButton').onClick(e => {
        getBooks($w('#searchInput').value)

            .then(response => {
                $w('#numberOfBooks').text = `Number of books:  ${response.totalItems.toString()}`;
                $w('#booksRepeater').show();
                $w('#numberOfBooks').show();
                $w('#booksRepeater').data = response.items.map((item, i) => {

                    let book = {
                        _id: `book-${i}`,
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors ?
                            item.volumeInfo.authors.join(', ') : '',
                        publishedDate: item.volumeInfo.publishedDate,
                        image: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail ?
                            item.volumeInfo.imageLinks.smallThumbnail : defaultImage,
                    }
                    return book;
                })
                $w('#booksRepeater').onItemReady(($item, itemData, index) => {
                    let imageUrl = itemData.image;
                    console.log(itemData)
                    $item('#title').text = itemData.title;
                    $item('#publishedDate').text = itemData.publishedDate;
                    $item('#authors').text = itemData.authors;
                    $item('#image').src = imageUrl ? imageUrl : defaultImage;
                })

            })
            .catch(err => {
                console.log(err);
            })
    })

    like_click();
    unLike_click();
});

function like_click() {
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

            wixData.insert('wishList', bookItem)
                .then((result) => {
                    $item('#like').hide();
                    $item('#unlike'.show());
                    return result;
                })
                .catch((err) => {
                    console.log(err);
                });
        });

    });
}

function unLike_click() {
    $w('#booksRepeater').onItemReady(($item, itemData, index) => {
        $item('#unLike').onClick((e) => {
            $item('#unLike').hide();
            $item('#like').show();
            wixData.query('wishList')
                .eq('title', itemData.title)
                .eq('userId', currentUser)
                .find()
                .then((result) => {
                    let rawId = result.items[0]._id;
                    return wixData.remove('wishList', rawId);
                })
                .then((res) => {
                    return res;
                })
                .catch(err => console.log(err))
        });
    });
}