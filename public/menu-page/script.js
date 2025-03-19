import { doAjaxQuery } from '../scripts/common.js'
import { view } from '../scripts/common.js';
import { global } from '../scripts/common.js';
// import { setSidebarActiveButton } from './sidebar.js';

var drawItems;
export var isScrollRunning = false;
let numberOfBooks = 0;

$(document).ready(function () {

    (function () {
        var data = {
            filter: getParameterByName('filter') || global.filter,
            offset: getParameterByName('offset'),
            limit: getParameterByName('count') || global.items_limit_on_page_load
        };
        // setSidebarActiveButton(null, data.filter); ??
        doAjaxQuery('GET', '/api/products', data, function (res) {
            view.addProductItems(res.data, true);
            drawItems = initDrawItems(res.total);
            // numberOfBooks += res.data.books.length;
            // checkCountBooks(numberOfBooks, res.data.total.amount)
        });
    }());

    // $('#nextBtn').on('click', function () {
    //     drawItems();
    // })

    // $('#prevBtn').on('click', function () {
    //     backDrawItems();
    // })
});

export function getParameterByName(name, url) {
    if (!url) url = $(location).attr('href');
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var initDrawItems = function (maxItems) {
    var maxNumOfItems = maxItems,
        limit = global.number_of_items_onscroll
        offset = parseInt(getParameterByName('count')) || global.items_limit_on_page_load;

    return function () {
        offset = parseInt(getParameterByName('count')) || global.items_limit_on_page_load;
        if (offset < maxNumOfItems) {
            var data = {
                'filter': getParameterByName('filter') || global.filter,
                'offset': offset,
                'limit': limit
            };
            doAjaxQuery('GET', '/api/products', data,
                function (res) {
                    isScrollRunning = false;
                    view.addProductItems(res.data, false);
                    changeHistoryStateWithParams("replace", res.data.type);
                    // numberOfBooks += res.data.books.length;
                    // checkCountBooks(numberOfBooks, res.data.total.amount)
                }
            );
            offset += limit;
        }
    }
};

export function loadIndexPage(reqData) {
    doAjaxQuery('GET', '/api/products', reqData, function (res) {
        view.addProductItems(res.data, true);
        changeHistoryStateWithParams('push', res.data.type);
        drawItems = initDrawItems(res.total);
        
        // numberOfBooks = 0;
        // numberOfBooks += res.data.books.length;
        // checkCountBooks(numberOfBooks, res.data.total.amount)
    });
}

function changeHistoryStateWithParams(action, filter) {
    if (action = '') {
        return;
    }

    offset = parseInt(offset);
    let count = offset ? global.number_of_items_onscroll : global.items_limit_on_page_load;
    let queryString = '?filter=' + filter + '&count=' + (offset + count);
    if (action === 'push') {
        window.history.pushState('', queryString);
    } else {
        window.history.replaceState('', queryString);
    }
}

/**
 * For pagination button "back"
 */
function backDrawItems() {
    let limit = global.number_of_items_onscroll,
        offset = parseInt(getParameterByName('count')) || 0;

    if (offset - global.items_limit_on_page_load < 18) {
        offset = 0;
        limit = global.items_limit_on_page_load
    }
    else {
        offset = offset - global.items_limit_on_page_load
    }

    var data = {
        'filter': getParameterByName('filter') || "new",
        'offset': offset,
        'limit': limit
    };
    doAjaxQuery('GET', '/api/v1/books', data,
        function (res) {
            isScrollRunning = false;
            view.addBooksItems(res.data.books, true);
            changeHistoryStateWithParams("replace", res.data.filter);
            // numberOfBooks = numberOfBooks - (numberOfBooks - res.data.books.length);
            // checkCountBooks(numberOfBooks, res.data.total.amount)
        }
    );
}

/**
 * Check parameters books and enable or disable buttons pagination
 * @param {*} countBooks number books on page
 * @param {*} totalBooks total books from database
 */
function checkCountBooks(countBooks, totalBooks) {
    if (countBooks < totalBooks && countBooks === global.items_limit_on_page_load) {
        enableElement($('#nextBtn'))
        disableElement($('#prevBtn'))
    }
    else if (countBooks < totalBooks && countBooks > global.items_limit_on_page_load) {
        enableElement($('#nextBtn'))
        enableElement($('#prevBtn'))
    }
    else if (countBooks < global.items_limit_on_page_load && countBooks === totalBooks) {
        disableElement($('#nextBtn'))
        disableElement($('#prevBtn'))
    }
    else if (countBooks === totalBooks) {
        enableElement($('#prevBtn'))
        disableElement($('#nextBtn'))
    }
}

/**
 * Enable button pagination
 * @param {*} element the button that was pressed
 */
function enableElement(element) {
    $(element).removeAttr('disabled')
}

/**
 * Disable button pagination
 * @param {*} element the button that was pressed
 */
function disableElement(element) {
    $(element).attr('disabled', 'disabled')
}