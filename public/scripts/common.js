export var view = {
    addBookItem: function (book) {
        return $('#pattern').html()
            .replace(/{id}/g, book.id)
            .replace(/{title}/g, book.title)
            .replace(/{author}/g, book.author);
    },
    addBooksItems: function (books, doClean) {
        var content = $('#content');
        var contentHTML = ((doClean) ? '' : content.html());

        for (var i in books) {
            contentHTML += view.addBookItem(books[i]);
        }

        content.html(contentHTML);
        $('.blockI').matchHeight(); // Aligns all the height of the book
    },
    addBooksListRow: function (book) {
        return $('#pattern').html()
            .replace(/{id}/g, book.id)
            .replace(/{title}/g, book.title)
            .replace(/{author}/g, book.author)
            .replace(/{year}/g, book.year)
            .replace(/{clicks}/g, book.clicks)
    },
    addBooksList: function (res) {
        var content = $('#table-content');
        var contentHTML = '';
        for (var i in res) {
            contentHTML += view.addBooksListRow(res[i]);
        }

        content.html(contentHTML);
    },
    fillBookInfo: function (book) {
        view.fillFields(book, 'title,author,year,pages,isbn,description', "html");
        $('#id').attr({
            'book-id': book.id,
            'busy': book.event
        });
        $('#bookImg img').attr('src', '../images/' + book.id + '.jpg');
        $('.description').html(book.description);
    },
    addMiniItemSearch: function (pathUrl, book) {
        var id = (book.id == 'no-cover') ? '#not_found' : '#miniItem';
        return $(id).html()
            .replace(/{id}/g, book.id)
            .replace(/{path}/g, pathUrl)
            .replace(/{title}/g, book.title)
            .replace(/{author}/g, book.author);
    },
    addMiniItemsSearch: function (pathUrl, books, text) {
        var content = $('#list');
        content.html('');
        var contentHTML = content.html();
        var limitImetsInSearch = 3;
        var n = 0;
        for (var i in books) {
            n++;
            if (i <= limitImetsInSearch) {
                contentHTML += view.addMiniItemSearch(pathUrl, books[i]);
                content.attr('size', n);
            }
        }
        if (n > limitImetsInSearch) {
            contentHTML += $('#more').html()
                .replace(/{text}/g, text)
                .replace(/{pathUrl}/g, pathUrl);
        }
        content.html(contentHTML);
        content.show('fast');
    }
};