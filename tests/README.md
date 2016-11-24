PHPUnit tests
=============

PHPUnit testing is used to test functionality of all components of project on one click.

Instalation
-----------

First of all install PEAR phpUnit:

    pear config-set auto_discover 1
    pear install pear.phpunit.de/PHPUnit


After Sucessfull install set absolute path to phpUnit binary in netbeans:

1. Open Netebeans
2. Go to `Tools` -> `Options`
3. Go to section `PHP` -> `Unit Testing`
4. Set `PHPUnit Script` to point on PHPUnit script location (Absolute path) eg.: `/usr/bin/phpunit` in UNIX Like systems
5. Rightclick on project and press `Test`, Unit test should start

Howto create new PHPUnit test
-----------------------------

There are two types of PHPUnit tests in W3:

* Presenter tests, usualy named WhatPresenterTest.php
* Model tests, usualy named WhatModelTest.php

For new PHPUnit test create file with apropriate name in `Test Files` of Netbeans project (tests directory on FS) with this content for Presenter:

    <?php
    /**
     * Test of What presenter
     */
    class WhatPresenterTest extends PHPUnit_Framework_TestCase
    {
      private $presenter;
      protected function setUp()
      {
        $presenterFactory = Nette\Environment::getContext()->getByType('Nette\Application\IPresenterFactory');
        //Get presenter we need
        $this->presenter = $presenterFactory->createPresenter('Front:Homepage');
        $this->presenter->autoCanonicalize = FALSE;
      }


      public function testRenderDefault()
      {
        //Call request we want to test
        $request = new Nette\Application\Request('Homepage', 'GET', array());

        $response = $this->presenter->run($request);

        //Test a type or content of responce
        $this->assertInstanceOf('Nette\Application\Responses\RedirectResponse', $response);
      }
    }

or for Model:

    <?php
    /**
     * Test of What model
     */
    class WhatModelTest extends PHPUnit_Framework_TestCase
    {

      /** @var What */
      private $model;

      protected function setUp()
      {
        $this->model = Nette\Environment::getContext()->what;
      }

      public function testInsert()
      {
        $values = array(
            'test' => 'LOrem bordelr'
        );
        $this->model->insert($values);
        $this->model->insert($values);

        $count = $this->model->where($values)->count('*');
        $this->assertEquals(2, $count);
      }
    }

More production examples can be found in Test Files` of Netbeans project (tests directory on FS)

Additional info about Unit testing can be found on:

* http://www.zdrojak.cz/clanky/testovani-v-php-asserty-a-constraints/
* http://pla.nette.org/cs/navstevni-kniha-a-testovani
* http://forum.nette.org/cs/4358-jak-na-phpunit-a-nette (Deprecated)
