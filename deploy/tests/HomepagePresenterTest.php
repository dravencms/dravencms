<?php

/**
 * Test of What presenter
 */
class HomepagePresenterTest extends PHPUnit_Framework_TestCase
{
  private $presenter;
  protected function setUp()
  {
    $presenterFactory = Nette\Environment::getContext()->getByType('Nette\Application\IPresenterFactory');
    $this->presenter = $presenterFactory->createPresenter('Front:Homepage');
    $this->presenter->autoCanonicalize = FALSE;
  }
  
  
  public function testRenderDefault()
  {
    $request = new Nette\Application\Request('Homepage', 'GET', array());
    
    $response = $this->presenter->run($request);
    ///*'Nette\Application\Responses\TextResponse'*/ 
    $this->assertInstanceOf('Nette\Application\Responses\RedirectResponse', $response);
  }
}