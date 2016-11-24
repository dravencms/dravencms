<?php

/**
 * HomepagePresenterTest
 */
class HomepagePresenterTest extends PHPUnit_Extensions_SeleniumTestCase
{

  protected function setUp()
  {
    $this->setBrowser('*firefox');
    $this->setBrowserUrl("http://localhost/~adam/webadmin3/www/");
  }

  public function testDefault()
  {
    $this->open();
    $this->assertTitle('CONGRATULATIONS!');
    /* $this->type("author", "Jožko");
      $this->type("title", "Titulek");
      $this->type("content", "obsah");
      $this->clickAndWait("save"); */
    //$this->assertTextPresent("byl přidán");
  }

}