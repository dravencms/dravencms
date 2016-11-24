<?php
/**
 * Copyright (C) 2016 Adam Schubert <adam.schubert@sg1-game.net>.
 */

namespace Dravencms\Components;

use Nette\ComponentModel\IContainer;

interface BaseGridFactory
{
    /**
     * @param IContainer $container
     * @param $name
     * @return BaseGrid
     */
    public function create(IContainer $container = null, $name = null);
}