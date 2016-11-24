<?php

namespace Dravencms\Components\Columns;

/**
 * Copyright (C) 2016 Adam Schubert <adam.schubert@sg1-game.net>.
 */
class Boolean extends \Grido\Components\Columns\Text
{
    public function getCellPrototype($row = NULL)
    {
        $cell = parent::getCellPrototype($row = NULL);
        $cell->class[] = 'center';
        return $cell;
    }
    /**
     * @param $value
     * @return \Nette\Utils\Html
     */
    protected function formatValue($value)
    {
        $icon = $value ? 'ok' : 'remove';
        return \Nette\Utils\Html::el('i')->class("glyphicon glyphicon-$icon icon-$icon");
    }
}