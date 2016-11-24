<?php

namespace Dravencms\Components;

use Grido\Components\Filters\Filter;
use Grido\Customization;
use Nette\ComponentModel\IContainer;
use Nette\Forms\IFormRenderer;
use Nette\Localization\ITranslator;

/**
 * Copyright (C) 2016 Adam Schubert <adam.schubert@sg1-game.net>.
 */
class BaseGrid extends BaseControl implements BaseGridFactory
{
    /** @var IFormRenderer */
    private $renderer;

    /** @var ITranslator */
    private $translator;

    public function __construct(IFormRenderer $renderer = null, ITranslator $translator = null)
    {
        $this->renderer = $renderer;
        $this->translator = $translator;

        parent::__construct();
    }

    /**
     * @param IContainer $container
     * @param $name
     * @return Grid
     */
    public function create(IContainer $container = null, $name = null)
    {
        $grid = new Grid($container, $name);
        $grid->setTranslator($this->translator);
        $grid->setFilterRenderType(Filter::RENDER_INNER);
        $grid->setRememberState(true);
        $grid->setStrictMode(false);
        $customization = new Customization($grid);
        $customization->useTemplateBootstrap();

        return $grid;
    }

}