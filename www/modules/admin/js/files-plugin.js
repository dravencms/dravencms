(function (factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function ($) {
  $.extend($.summernote.plugins, {
    'specialchars': function (context) {
      var self = this;
      var ui = $.summernote.ui;

      var $editor = context.layoutInfo.editor;
      var $toolbar = context.layoutInfo.toolbar;
      var $editable = context.layoutInfo.editable;
      var options = context.options;
      var lang = options.langInfo;

      this.initialize = function () {
        var $container = options.dialogsInBody ? $(document.body) : $editor;

        var body = '<style>.note-files-dialog .modal-dialog{  width: 900px;}</style><div class="note-file-manager-holder"></div>';

        this.$dialog = ui.dialog({
          title: "Select file or image you want to insert",
          body: body
        }).render().appendTo($container);


        var button = ui.button({
          className: 'note-btn-bold',
          contents: '<i class="fa fa-archive">',
          click: function (e) {

            // save current range
            context.invoke('editor.saveRange');
            self.showFilesDialog($editable).then(function (path, type, name) {
              // when ok button clicked
              if (type == 'image')
              {
                //editor.insertImage($editable, path, name);
                var $node = $('<img src="' + path +'" class="img-responsive" data-filename="' + name +'" alt="' + name +'">');
                //$editor.insertNode($editable, $node[0]);
                context.invoke('editor.insertNode', $node[0]);
              }
              else
              {
                var $node = $('<a href="' + path +'">' + name + '</a>');
                //$editor.insertNode($editable, $node[0]);
                context.invoke('editor.insertNode', $node[0]);
              }

            }).fail(function () {
              // when cancel button clicked
              context.invoke('editor.restoreRange');
            });
          }
        });

        var buttonGroup = ui.buttonGroup(
         {
           className:'note-btn-group btn-group note-font',
           contents : button.render()
         });

         // generate jQuery element from button instance.
        this.$buttonGroup = buttonGroup.render();
        $toolbar.append(this.$buttonGroup);
      };

      this.showFilesDialog = function ($editable) {
       return $.Deferred(function (deferred) {
        var $filesDialog = self.$dialog;
        var managerUrl = $('.wysiwyg-fileplugin').data('uri');
        var $filesBtn = $filesDialog.find('.note-files-btn');

         $filesDialog.one('shown.bs.modal', function () {
           params = {};
           self.loadFolder($filesDialog, managerUrl, params, deferred);
           $filesBtn.click(function (event) {
             event.preventDefault();
             $filesDialog.modal('hide');
           });
         }).one('hidden.bs.modal', function () {
           if (deferred.state() === 'pending') {
             deferred.reject();
           }
         }).modal('show');
       });
      };

      this.loadFolder = function($filesDialog, managerUrl, params, deferred)
      {
        $fileManagerHolder = $filesDialog.find('.note-file-manager-holder');
        $('<div>').load(managerUrl, params, function(){
          $filesManager = $($(this).html());

          $filesManager.find(".fileitem").click(function(e){
            e.preventDefault();
            e.stopPropagation();

            var filesid = $(this).data('filesid'),
            filespath = $(this).data('filespath'),
            filesname = $(this).data('filesname'),
            filestype = $(this).data('filestype');

            deferred.resolve(filespath, filestype, filesname);

            $filesDialog.modal('hide');
          });

          $filesManager.find(".back").click(function(e){
            e.preventDefault();
            var structureid = $(this).data('backid');
            if (structureid)
            {
              params['structureId'] = structureid;
            }
            else
            {
              delete params['structureId'];
            }
            self.loadFolder($filesDialog, managerUrl, params, deferred);
          });

          $filesManager.find(".folder").click(function(e){
            e.preventDefault();
            var structureid = $(this).data('structureid');
            if (structureid)
            {
              params['structureId'] = structureid;
            }
            else
            {
              delete params['structureId'];
            }

            self.loadFolder($filesDialog, managerUrl, params, deferred);
          });

          $fileManagerHolder.html($filesManager);
        });
      };
    }
  });
}));
