<?php
/**
 * Copyright (C) 2016 Adam Schubert <adam.schubert@sg1-game.net>.
 */

namespace Dravencms\Components;


use Dravencms\Components\Columns\Boolean;

class Grid extends \Grido\Grid
{
    /**
     * @param string $name
     * @param string $label
     * @return Boolean
     */
    public function addColumnBoolean($name, $label)
    {
        $column = new Boolean($this, $name, $label);
        $header = $column->headerPrototype;
        $header->style['width'] ='2%';
        $header->class[] = 'center';
        return $column;
    }
}