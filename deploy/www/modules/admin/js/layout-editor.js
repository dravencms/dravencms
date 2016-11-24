$(document).ready(function () {
    function LayoutEditor() {
        var self = this;
        this.$layourEditor = $('.layout-editor');
        this.$rows = $('.rows');
        this.$cols = $('.cols');
        this.$saveButton = $('.save');
        this.$messageBox = this.$layourEditor.find('.message-box');
        this.layoutData = {};
        this.components = {};
        this.savedLayoutData = {};
        this.componentsDataCache = {};


        this.needsSave = function () {
            self.$saveButton.attr('disabled', JSON.stringify(this.layoutData) === JSON.stringify(this.savedLayoutData));
        };

        this.loadLayout = function () {
            $.ajax({
                url: self.$layourEditor.data('uri')
            }).done(function (data) {
                self.layoutData = data.structure;
                self.savedLayoutData = jQuery.extend(true, {}, self.layoutData);
                self.components = data.components;
                self.initUi();
            });
        };

        this.buildComponentSelect = function (col, component, action) {
            var $holder = $('<div>');
            var $select = $('<select>');
            $select.addClass('form-control');

            var $option = $('<option>');
            $select.append($option);
            $.each(this.components, function (module_name, components) {
                var $group = $('<optgroup label="' + module_name + '">');
                $.each(components, function (k, v) {
                    var $option = $('<option>');
                    $option.html(v);
                    $option.val(k);
                    if (component == k) {
                        $option.attr('selected', 'selected');
                    }

                    $group.append($option);
                });
                $select.append($group);
            });

            $holder.append($select);
            //$select.select2({'width': '100%'});

            var $select2 = $('<select>');
            $select2.addClass('form-control');

            var setSelect2Content = function (component) {
                var fillSelect = function (data) {
                    $select2.html('');

                    if (!action)
                    {
                        $.each(data.actions, function (k, v) {
                            col.action = k;
                            return false;
                        });
                    }

                    $.each(data.actions, function (k, v) {
                        var $option = $('<option>');
                        $option.html(v);
                        $option.val(k);

                        if (action == k) {
                            $option.attr('selected', 'selected');
                        }

                        $select2.append($option);
                    });
                };

                if (component in self.componentsDataCache) {
                    fillSelect(self.componentsDataCache[component]);
                }
                else {
                    $.ajax({
                        url: self.$layourEditor.data('curi'),
                        data: {'componentClass': component}
                    }).done(function (data) {
                        self.componentsDataCache[component] = data;
                        fillSelect(data);
                    });
                }

            };

            if (component) {
                setSelect2Content(component);
            }

            $select.change(function () {
                col.component = $select.val();
                setSelect2Content($select.val());
                self.needsSave();
            });

            $select2.on('change click', function () {
                col.action = $select2.val();
                self.needsSave();
            });

            $holder.append($select2);
            //$select2.select2({'width': '100%'});

            return $holder;
        };

        this.initUi = function () {
            $.each(this.layoutData, function (blockName, blockRows) {
                var $block = $('.block-' + blockName);
                $block.find('.rows').val(blockRows.length);
                if (blockRows.length && blockRows[0]) {
                    $block.find('.cols').val(blockRows[0].length).trigger("change");
                }
                else {
                    $block.find('.cols').val(1).trigger("change");
                }
            });


            this.$rows.bind("input change", function () {
                self.setRows(parseInt($(this).val()), $(this).data('block'));
                self.needsSave();
            });

            this.$cols.bind("input change", function () {
                self.setCols(parseInt($(this).val()), $(this).data('block'));
                self.needsSave();
            });

            this.renderLayout();
        };

        this.setCols = function (cols, block) {
            $.each(self.layoutData[block], function (rk, row) {
                $.each(row, function (ck, col) {
                    col.col = (12 / cols);
                });

                if (row.length < cols) {
                    for (x = row.length; x < cols; x++) {
                        row.push({'col': (12 / cols), 'type': 'sm', 'component': '', 'action': ''});
                    }
                }
                else if (row.length > cols) {
                    for (x = row.length; x > cols; x--) {
                        row.pop();
                    }
                }
            });

            this.renderLayout(block);
        };

        this.setRows = function (rows, block) {
            var currentRows = 0;
            if (block in self.layoutData) {
                currentRows = self.layoutData[block].length;
            }

            if (rows > currentRows) {
                if (!(block in self.layoutData) || !self.layoutData[block].length) {
                    //ADD by cloning
                    //self.layoutData[block].push(self.layoutData[block][0]);
                    self.layoutData[block] = [];
                }

                self.layoutData[block].push([{'col': '12', 'type': 'sm', 'component': '', 'action': ''}]);
            }
            else if (rows < currentRows) {
                //Remove
                self.layoutData[block].pop();
            }
            this.renderLayout(block);
        };

        this.renderMessage = function (message, type) {
            var $m = $('<div class="alert alert-' + type + '">');
            $m.html(message);
            var timeout = 5;
            var intervalCountdown = setInterval(function () {
                timeout--;
                if (timeout <= 0) {
                    $m.hide();
                    window.clearInterval(intervalCountdown);
                }
            }, 1000);

            self.$messageBox.html($m);
        };

        this.renderLayout = function (specifiedBlock) {
            var renderBlock = function (blockName, blockRows) {
                var $block = $('.block-' + blockName);

                var $blockContent = $block.find('.col-content-editable');

                //Empty each block
                $blockContent.html('');

                $.each(blockRows, function (rk, row) {
                    // Create ROW
                    var $row = $('<div class="row row-editable">');
                    $.each(row, function (ck, col) {
                        var $col = $('<div class="col-editable col-' + col.type + '-' + col.col + '">');
                        var $colInner = $('<div class="col-editable-holder">');
                        $colInner.html('ROW:' + (rk + 1) + ' COL:' + (ck + 1));
                        $colInner.append(self.buildComponentSelect(col, col.component, col.action));
                        $col.append($colInner);
                        $row.append($col);
                    });
                    $blockContent.append($row);
                });
            };

            if (specifiedBlock) {
                //Rerender only specified block
                renderBlock(specifiedBlock, this.layoutData[specifiedBlock]);
            }
            else {
                //Render all blocks
                $.each(this.layoutData, function (blockName, blockRows) {
                    renderBlock(blockName, blockRows);
                });
            }
        };

        this.init = function () {
            this.loadLayout();
        };

        this.$saveButton.click(function () {
            self.$saveButton.button('loading');
            $.ajax({
                url: self.$layourEditor.data('suri'),
                data: {'structureTree': self.layoutData}
            }).done(function (data) {
                self.renderMessage('Structure has been saved successfully', 'success');
                self.savedLayoutData = jQuery.extend(true, {}, self.layoutData);
                self.$saveButton.button('reset');
                self.needsSave();
            }).fail(function (jqXHR, textStatus) {
                self.$saveButton.button('reset');
                self.renderMessage(textStatus, 'error');
            });
        });
    }

    if ($('.layout-editor').length) {
        var layout = new LayoutEditor();
        layout.init();
    }
});
