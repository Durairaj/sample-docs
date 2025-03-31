$(function() {

    $('.sidebar-section-title').click(function() {
        console.log('Title clicked:', $(this).text());
        $(this).toggleClass('collapsed');
        $(this).next('.sidebar-section-content').slideToggle(200);
    });

    // Expand active section
    $('.sidebar-section-content').each(function() {
        if ($(this).find('li.active').length > 0) {
            console.log('Expanding section with active item');
            $(this).slideDown(0);
            $(this).prev('.sidebar-section-title').removeClass('collapsed');
        }
    });
    
    // $('.collapse').collapse('hide');
    $('.list-group-item.active').parent().parent('.collapse').collapse('show');


    var pages = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
        // datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,

        prefetch: baseurl + '/search.json'
    });

    $('#search-box').typeahead({
        minLength: 0,
        highlight: true
    }, {
        name: 'pages',
        display: 'title',
        source: pages
    });

    $('#search-box').bind('typeahead:select', function(ev, suggestion) {
        window.location.href = suggestion.url;
    });


    // Markdown plain out to bootstrap style
    $('#markdown-content-container table').addClass('table');
    $('#markdown-content-container img').addClass('img-responsive');


});
