<?php
/**
 * Copyright (C) 2016 Adam Schubert <adam.schubert@sg1-game.net>.
 */

namespace Dravencms\FrontModule;


use Dravencms\FrontModule\Components\Locale\Locale\Switcher\SwitcherFactory;
use Dravencms\FrontModule\Components\Partner\Partner\Main\MainFactory;
use Dravencms\FrontModule\Components\Seo\Seo\Tracking\TrackingFactory;
use Dravencms\FrontModule\Components\Social\Icon\Bar\BarFactory;
use Dravencms\FrontModule\Components\Structure\Menu\Breadcrumb\BreadcrumbFactory;
use Dravencms\FrontModule\Components\Structure\Menu\Front\FrontFactory;
use Dravencms\FrontModule\Components\Structure\Menu\Special\SpecialFactory;
use Salamek\Cms\Cms;

abstract class SlugPresenter extends BasePresenter
{
    /** @var Cms @inject */
    public $cmsFactory;

    /** @var SwitcherFactory @inject */
    public $localeLocaleSwitcherFactory;

    /** @var FrontFactory @inject */
    public $structureMenuFrontFactory;

    /** @var BarFactory @inject */
    public $socialIconBarFactory;

    /** @var SpecialFactory @inject */
    public $structureMenuSpecialFactory;

    /** @var MainFactory @inject */
    public $partnerPartnerMainFactory;

    /** @var BreadcrumbFactory @inject */
    public $structureMenuBreadcrumbFactory;

    /** @var TrackingFactory @inject */
    public $seoSeoTrackingFactory;

    /** @var \Dravencms\FrontModule\Components\Structure\Search\Bar\BarFactory @inject */
    public $structureSearchBarFactory;

    /**
     * @return Components\Structure\Search\Bar
     */
    public function createComponentStructureSearchBar()
    {
        return $this->structureSearchBarFactory->create();
    }

    /**
     * @return Components\Seo\Seo\Tracking
     */
    public function createComponentSeoSeoTracking()
    {
        return $this->seoSeoTrackingFactory->create();
    }

    /**
     * @return Components\Structure\Menu\Breadcrumb
     */
    public function createComponentStructureMenuBreadcrumb()
    {
        return $this->structureMenuBreadcrumbFactory->create();
    }

    /**
     * @return Components\Partner\Partner\Main
     */
    public function createComponentPartnerPartnerMain()
    {
        return $this->partnerPartnerMainFactory->create();
    }

    /**
     * @return Components\Structure\Menu\Special
     */
    public function createComponentStructureMenuSpecial()
    {
        return $this->structureMenuSpecialFactory->create();
    }

    /**
     * @return Components\Social\Icon\Bar
     */
    public function createComponentSocialIconBar()
    {
        return $this->socialIconBarFactory->create();
    }

    /**
     * @return Components\Structure\Menu\Front
     */
    public function createComponentStructureMenuFront()
    {
        return $this->structureMenuFrontFactory->create();
    }
    
    /**
     * @return Components\Locale\Locale\Switcher
     */
    public function createComponentLocaleLocaleSwitcher()
    {
        return $this->localeLocaleSwitcherFactory->create();
    }

    /**
     * @return \WebLoader\Nette\CssLoader
     */
    public function createComponentCss()
    {
        return $this->webLoader->createCssLoader($this->getLayout() ? $this->getLayout(): $this->cmsFactory->getDefaultLayout());
    }

    /**
     * @return \WebLoader\Nette\JavaScriptLoader
     */
    public function createComponentJs()
    {
        return $this->webLoader->createJavaScriptLoader($this->getLayout() ? $this->getLayout(): $this->cmsFactory->getDefaultLayout());
    }

}