<?php

namespace Dravencms\FrontModule;

use Nette;


class Error4xxPresenter extends SlugPresenter
{

    public function startup()
    {
        parent::startup();
        if (!$this->getRequest()->isMethod(Nette\Application\Request::FORWARD)) {
            $this->error();
        }
    }


    public function renderDefault(Nette\Application\BadRequestException $exception)
    {
        $message = $exception->getCode().' Stránka nenalezena';
        $this->template->metaDescription = $message;
        $this->template->title = $message;
        $this->template->metaKeywords = $message;
        $this->template->metaRobots = 'noindex, nofallow';
        $this->template->h1 = $message;
        $this->template->showH1 = FALSE;
        $this->template->bodyClass = 'subpage';

        // load template 403.latte or 404.latte or ... 4xx.latte
        $file = __DIR__ . "/../templates/Error/{$exception->getCode()}.latte";
        $this->template->setFile(is_file($file) ? $file : __DIR__ . '/../templates/Error/4xx.latte');
    }

}