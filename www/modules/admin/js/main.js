$(document).ready(function () {
    "use strict";
    var $helper = $('.helper');
    var $about = $('.about');
    var $searchMain = $('.search-main');

    $helper.popover({'trigger': 'focus'});
    $about.popover({'trigger': 'hover'});

    if ($searchMain.length != 0) {
        $searchMain.typeahead({
            limit: 10,
            highlight: true,
            remote: {
                url: $searchMain.data('target').replace('%25', '%')
            }
        }).on('typeahead:selected', function () {
            $(this).closest('form').submit();
        });
    }

    $.nette.init();

    //Extension of nette ajax calls
    $.nette.ext('main-admin',
        {
            success: function (payload) {
                initAjaxDependend();
            }
        },
        {
            selector: null
        });

    $('.date').not(".grido .date").each(function () {
        var format = $(this).data('format');
        var language = $("html").attr('lang');
        if (!language) {
            language = 'en';
        }

        if (!format) {
            format = 'yyyy-mm-dd';
        }
        $(this).datepicker({'format': format, language: language});

        //Do i need to wrap it into input-group
        if (!$(this).parent('.input-group').length) {
            $(this).wrap('<div class="input-group"></div>');
        }
        var $icon = $('<span class="input-group-addon"><i class="fa fa-calendar"></i></span>');

        var self = $(this);
        $icon.click(function () {
            self.focus();
        });
        $(this).after($icon);
    });

    $('.time').not(".grido .date").each(function () {
        var options2 = {
            minuteStep: 1,
            showSeconds: false,
            showMeridian: false,
            showInputs: false/*,
             orientation: $('body').hasClass('right-to-left') ? { x: 'right', y: 'auto'} : { x: 'auto', y: 'auto'}*/
        }
        $(this).timepicker(options2);


        //Do i need to wrap it into input-group
        if (!$(this).parent('.input-group').length) {
            $(this).wrap('<div class="input-group"></div>');
        }
        var $icon = $('<span class="input-group-addon"><i class="fa fa-clock-o"></i></span>');

        var self = $(this);
        $icon.click(function () {
            self.focus();
        });
        $(this).after($icon);
    });


    //Inits of ajax dependent things to init at load
    initAjaxDependend();


    /**
     * Allow anchored tabs
     */
    //Support for urling tabs
    var url = document.location.toString();
    if (url.match('#')) {
        var name = url.split('#')[1];
        if (name) {
            $('.nav-tabs').find('a[href="#' + name + '"]').tab('show');
        }
    }

    // Change hash for page-reload
    $('.nav-tabs a').on('shown.bs.tab', function (e) {
        window.location.hash = e.target.hash;
    });

    //$('ul.nav.nav-tabs').tabdrop();

    $('.wysiwyg').summernote({
        height: 200,
        tabsize: 2,
        codemirror: {
            theme: 'monokai'
        },
        //modules: $.extend($.summernote.options.modules, {"specialchars": FilesManager}),
        toolbar: [

            ['style', ['style', 'fontname', 'bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['misc', ['fullscreen', 'codeview', 'undo', 'redo', 'link', 'video']]
        ]
    });

    $('.codemirror').each(function () {
        var self = $(this);
        var editor = CodeMirror.fromTextArea(self[0], {
            lineNumbers: true,
            mode: self.data('codemirror-mode') || 'htmlmixed'
        });
    });
});

function initAjaxDependend() {
    $("select").not(".grido tfoot select").select2({'width': 'resolve'});

    $('.invalidator').each(function () {
        var elem = $(this);
        elem.data('oldVal', elem.val());

        // Look for changes in the value
        elem.bind("propertychange change click keyup input paste", function (event) {
            // If value has changed...
            if (elem.data('oldVal') != elem.val()) {
                // Updated stored value
                elem.data('oldVal', elem.val());

                var data = {};
                var parameterName = elem.data('invalidate-parameter') || 'value';
                data[parameterName] = elem.val();
                var url = elem.data('invalidate-url').replace(/&amp;/g, '&');
                $.nette.ajax({
                    type: 'GET',
                    url: url,
                    data: data
                });
            }
        });
    });
}
