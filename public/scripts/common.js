export let view = {
    addProductItem: function (book) {
        return $('#pattern').html()
            .replace(/{id}/g, book.id)
            .replace(/{title}/g, book.title)
            .replace(/{author}/g, book.author);
    },
    addProductItems: function (books, doClean) {
        var content = $('#content');
        var contentHTML = ((doClean) ? '' : content.html());

        for (var i in books) {
            contentHTML += view.addProductItem(books[i]);
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
    },
    showError: function(text) {
        Swal.fire('Ооопс!', text, 'error');
    }
};

export function doAjaxQuery(method, url, data, callback) {
    $.ajax({
        type: method,
        url: url,
        contentType: 'application/json',
        dataType: 'json',
        data: ((method == 'POST') ? JSON.stringify(data) : data),
        success: function(res) {
            if (!res.success) {
                view.showError(res.msg);
                return;
            }
            callback(res);
        },
        error: function(jqXHR, textStatus) {
            view.showError('Помилка ' + textStatus);
        }
    });
}

export let global = {
    items_limit_on_page_load: 6,
    number_of_items_onscroll: 3,
    filter: 'menu-cakes'
};