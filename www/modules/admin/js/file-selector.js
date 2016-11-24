$(document).ready(function () {
    "use strict";
    /* File selector */
    var $button = $('.file-manager-selector-button');

    var loadItem = function ($sId, filesid) {
        var $imageHolder = $sId.next('.filemanager').find('.file-manager-selector-file');

        if (filesid) {
            $('<div>').load($imageHolder.data('link'), {'filesStructureFilesId': filesid}, function () {
                var $selectedImage = $($(this).html());

                $selectedImage.mouseenter(function () {
                    $(this).find(".box:not(.back)").animate({
                        top: "-26px"
                    }, {
                        queue: !1,
                        duration: 300
                    });
                }).mouseleave(function () {
                    $(this).find(".box:not(.back)").animate({
                        top: "0px"
                    }, {
                        queue: !1,
                        duration: 300
                    });
                });

                $selectedImage.find('.rename').hide();
                $selectedImage.find('.info').hide();
                $selectedImage.find('.download').hide();
                $selectedImage.find('.delete').click(function (e) {
                    e.preventDefault();
                    $sId.val(null);
                    $selectedImage.remove();
                });


                $imageHolder.html($selectedImage);
            });
        }
    };

    var loader = function (obj, params) {
        var $target = $(obj.data('target'));
        $('<div>').load(obj.data('link'), params, function () {
            var $manager = $($(this).html());
            $manager.find(".fileitem").click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                var filesid = $(this).data('filesid');
                var $sId = obj.next('.file-manager-selector-id');
                $sId.val(filesid);
                loadItem($sId, filesid);

                $target.modal('hide');
            });

            $manager.find(".back").click(function (e) {
                e.preventDefault();
                var structureid = $(this).data('backid');
                if (structureid) {
                    params['structureId'] = structureid;
                }
                else {
                    delete params['structureId'];
                }
                loader(obj, params);
            });

            $manager.find(".folder").click(function (e) {
                e.preventDefault();
                var structureid = $(this).data('structureid');
                if (structureid) {
                    params['structureId'] = structureid;
                }
                else {
                    delete params['structureId'];
                }
                loader(obj, params);
            });

            $target.find(".modal-content").html($manager);
        });
    };

    $button.each(function () {
        var $sId = $(this).next('.file-manager-selector-id');
        loadItem($sId, $sId.val());
    });

    $button.click(function () {
        var params = {};
        params['type'] = $(this).data('filetype');
        loader($(this), params);
    });
});
