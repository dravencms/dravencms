<?php
/**
 * Copyright (C) 2016 Adam Schubert <adam.schubert@sg1-game.net>.
 */

namespace Dravencms\FrontModule;

use Dravencms\GlobalPresenter;
use Nette\Application\UI\Presenter;

class BasePresenter extends GlobalPresenter
{
    public function startup()
    {
        $this->invalidLinkMode = Presenter::INVALID_LINK_EXCEPTION;
        $this->getUser()->getStorage()->setNamespace('Front');
        parent::startup();
    }
}