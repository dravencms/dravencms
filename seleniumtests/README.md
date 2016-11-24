PHPUnit Selenium tests
======================

Selenium tests frontend of application by calling requests on browser, fetching it contents and compare it to our specified rules.

Instalation
-----------

First of all install PEAR phpUnit_Selenium:

    pear config-set auto_discover 1
    pear install phpunit/PHPUnit_Selenium


After Sucessfull install we need install Selenium Server and PHP module in netbeans:

1. Open Netebeans
2. Go to `Tools` -> `Plugins`
3. Go to section `Avaiable plugins`
   * Install plugin `Selenium Server`
   * Install plugin `Selenium module for PHP`

Now we sucessfully installed all need software and plugins, we can run a test:

1. Rightclick on project root
2. Press `Run Selenium Tests`
3. Test Should now open your browser (firefox by default) and start testing

Howto create new PHPUnit Selenium test
--------------------------------------

Create new PHP file with name WhatPresenterTest.php in `Selenium Test Files` (seleniumtests on FS) with this content:

    <?php

    /**
     * WhatPresenterTest
     */
    class WhatPresenterTest extends PHPUnit_Extensions_SeleniumTestCase
    {
      protected function setUp()
      {
        //Definies browser we gonna use for testing
        $this->setBrowser('*firefox');

        //Path to running presenter we want to test
        $this->setBrowserUrl("http://localhost/webadmin3/www/");
      }

      public function testDefault()
      {
        $this->open();
        $this->assertTitle('CONGRATULATIONS!');
        /*$this->type("author", "Jožko");
        $this->type("title", "Titulek");
        $this->type("content", "obsah");
        $this->clickAndWait("save");*/
        //$this->assertTextPresent("byl přidán");
      }
    }


Additional info about PHPUnit Selenium can be found on:

* http://phpunit.de/manual/3.6/en/selenium.html
* http://pla.nette.org/cs/posobota-30-vitek-jezek-selenium
* http://pla.nette.org/cs/navstevni-kniha-a-testovani#toc-kompletni-test-aplikace
* http://www.seleniumhq.org/docs/05_selenium_rc.jsp
