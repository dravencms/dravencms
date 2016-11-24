<?php
/**
 * Copyright (C) 2016 Adam Schubert <adam.schubert@sg1-game.net>.
 */

namespace Dravencms\Components;

use Minetro\Forms\reCAPTCHA\ReCaptchaField;
use Minetro\Forms\reCAPTCHA\ReCaptchaHolder;
use Minetro\Forms\reCAPTCHA\ReCaptchaValidator;

class Form extends \Nette\Application\UI\Form
{
    /** @var ReCaptchaValidator */
    private $validator;

    /**
     * Form constructor.
     * @param ReCaptchaValidator $validator
     */
    public function __construct(ReCaptchaValidator $validator)
    {
        parent::__construct();

        $this->validator = $validator;
    }


    /**
     * @param  string  $name   Field name
     * @param  string  $label  Html label
     * @return ReCaptchaField
     */
    public function addReCaptcha($name = 'recaptcha', $label = NULL)
    {
        $recaptcha = $this[$name] = new ReCaptchaField(ReCaptchaHolder::getSiteKey(), $label);

        $recaptcha->addRule([$this->validator, 'validateControl'], 'You`re bot!');
        $recaptcha->setRequired(true);

        return $recaptcha;
    }

}