<?php

namespace Dravencms\Components;

use Nette\Forms\IFormRenderer;
use Nette\Localization\ITranslator;
use Minetro\Forms\reCAPTCHA\ReCaptchaValidator;

/**
 * Copyright (C) 2016 Adam Schubert <adam.schubert@sg1-game.net>.
 */
class BaseForm extends BaseControl implements BaseFormFactory
{
    /** @var IFormRenderer */
    private $renderer;

    /** @var ITranslator */
    private $translator;

    /** @var ReCaptchaValidator */
    private $validatorFactory;

    /**
     * BaseForm constructor.
     * @param ReCaptchaValidator $validator
     * @param IFormRenderer|null $renderer
     * @param ITranslator|null $translator
     */
    public function __construct(ReCaptchaValidator $validator, IFormRenderer $renderer = null, ITranslator $translator = null)
    {
        $this->validatorFactory = $validator;
        $this->renderer = $renderer;
        $this->translator = $translator;

        parent::__construct();
    }


    /**
     * @return Form
     */
    public function create()
    {
        $form = new Form($this->validatorFactory);
        $form->setRenderer($this->renderer);
        $form->setTranslator($this->translator);
        $form->addProtection('Please, send form again.');

        return $form;
    }

}