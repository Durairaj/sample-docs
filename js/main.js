var baseurl = "{{ site.baseurl }}";
    if (!baseurl) baseurl = "";
    console.log('base url :', baseurl);

    var pages = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: {
        url: baseurl + '/search.json',
        filter: function(data) { console.log('Bloodhound prefetch data:', data); return data; }
      }
    });
    pages.initialize().done(function() { console.log('Bloodhound initialized'); }).fail(function() { console.error('Bloodhound failed'); });

    $(function() {
      $('a[href^="/"]').on('click', function(e) {
        var url = baseurl + $(this).attr('href');
        loadPage(url);
      });

      $(window).on('popstate', function(e) {
        var url = window.location.pathname;
        loadPage(url);
      });

      if (!$('#search-box').hasClass('typeahead-initialized')) {
        $('#search-box').typeahead({
          minLength: 0,
          highlight: true
        }, {
          name: 'pages',
          display: 'title',
          source: pages
        }).addClass('typeahead-initialized');
      }

      $('#search-box').on('typeahead:select', function(ev, suggestion) {
        $('.search-icon').attr('data-url', suggestion.url);
        console.log('suggestion url :', suggestion.url);
        loadPage(suggestion.url);
      });

      $('.search-icon').click(function() {
        var url = $(this).attr('data-url');
        if (url) loadPage(url);
      });

      $('.sidebar-section-title').click(function() {
        $(this).toggleClass('collapsed');
        $(this).next('.sidebar-section-content').slideToggle(200);
      });

      $('.sidebar-section-content').each(function() {
        if ($(this).find('li.active').length > 0) {
          $(this).slideDown(0);
          $(this).prev('.sidebar-section-title').removeClass('collapsed');
        }
      });

      function loadPage(url) {
        $.get(url, function(data) {
          var newContent = $(data).find('.page-content .container .row .main-content').html() || $(data).find('body').html();
          $('.main-content').html(newContent);
          window.history.pushState({ path: url }, '', url);
        }).fail(function(jqXHR, textStatus) {
          console.error('Load failed:', textStatus);
        });
      }

      $('.sidebar-toggle').click(function() {
        $('.confluence-sidebar').toggleClass('active');
        $('body').toggleClass('sidebar-active');
      });
    });