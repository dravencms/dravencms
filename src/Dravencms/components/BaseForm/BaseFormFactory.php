<?php
/**
 * Copyright (C) 2016 Adam Schubert <adam.schubert@sg1-game.net>.
 */

namespace Dravencms\Components;


interface BaseFormFactory
{
    /**
     * @return BaseForm
     */
    public function create();
}