<?php

namespace Dravencms;

use Gedmo\Translatable\TranslatableListener;
use IPub\Gravatar\TGravatar;
use Kdyby\Translation\Translator;
use WebLoader\Nette\LoaderFactory;
use Dravencms\Model\Locale\Repository\LocaleRepository;

/**
 * Base presenter for all application presenters.
 */
abstract class GlobalPresenter extends \Nette\Application\UI\Presenter
{
    use TGravatar;

    public $forceLoggedIn = false;

    /** @persistent */
    public $locale;

    /** @var LocaleRepository @inject */
    public $localeLocaleRepository;

    /** @var Translator @inject */
    public $translator;

    /** @var LoaderFactory @inject */
    public $webLoader;

    /** @var \Dravencms\Components\BaseFormFactory @inject */
    public $baseFormFactory;

    public function startup()
    {
        $this->template->lang = $this->locale;

        /** @var TranslatableListener $gedmoTranslatable */
        $gedmoTranslatable = $this->context->getService('gedmo.gedmo.translatable');
        $gedmoTranslatable->setDefaultLocale($this->localeLocaleRepository->getDefault()->getLanguageCode());
        $gedmoTranslatable->setTranslationFallback(true);
        $gedmoTranslatable->setTranslatableLocale($this->localeLocaleRepository->getCurrentLocale()->getLanguageCode());

        parent::startup();
    }

    /**
     * Formats layout template file names.
     * @return array
     */
    public function formatLayoutTemplateFiles()
    {
        $name = $this->getName();
        $presenter = substr($name, strrpos(':' . $name, ':'));
        $className = trim(str_replace($presenter . 'Presenter', '', get_class($this)), '\\');
        $exploded = explode('\\', $className);
        $moduleName = str_replace('Module', '', end($exploded));
        $layout = $this->layout ? $this->layout : 'layout';
        $dir = dirname($this->getReflection()->getFileName());
        $dir = is_dir("$dir/templates") ? $dir : dirname($dir);
        $list = array(
            "$dir/templates/$moduleName/$presenter/@$layout.latte",
            "$dir/templates/$moduleName/$presenter.@$layout.latte",
        );
        do {
            $list[] = "$dir/templates/@$layout.latte";
            $dir = dirname($dir);
        } while ($dir && ($name = substr($name, 0, strrpos($name, ':'))));

        $list[] = realpath(__DIR__."/..").'/'.$this->getNamespace()."Module/templates/@$layout.latte";

        return $list;
    }

    /**
     * Formats view template file names.
     * @return array
     */
    public function formatTemplateFiles()
    {
        $name = $this->getName();
        $presenter = substr($name, strrpos(':' . $name, ':'));
        $className = trim(str_replace($presenter . 'Presenter', '', get_class($this)), '\\');
        $exploded = explode('\\', $className);
        $moduleName = str_replace('Module', '', end($exploded));
        $dir = dirname($this->getReflection()->getFileName());
        $dir = is_dir("$dir/templates") ? $dir : dirname($dir);
        return array(
            "$dir/templates/$moduleName/$presenter/$this->view.latte",
            "$dir/templates/$moduleName/$presenter.$this->view.latte",
        );
    }

    /**
     * @return mixed
     */
    public function getNamespace()
    {
        return $this->getUser()->getStorage()->getNamespace();
    }

    /**
     * @return \Nette\Security\IIdentity|NULL
     */
    public function getUserEntity()
    {
        return $this->getUser()->getIdentity();
    }

    /**
     * @return bool
     */
    public function isLoggedIn()
    {
        return $this->getUser()->isLoggedIn();
    }
}
