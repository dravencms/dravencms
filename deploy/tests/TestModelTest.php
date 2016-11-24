<?php

/**
 * Test of Test model
 */
class TestModelTest extends PHPUnit_Framework_TestCase
{

  /** @var Test */
  private $model;

  protected function setUp()
  {
    $this->model = Nette\Environment::getContext()->test;
    $this->model->truncate();
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

  public function testSelect()
  {
    $this->testInsert();
    $count = $this->model->count('*');
    $this->assertEquals(2, $count);
  }

  public function testDelete()
  {
    $this->testInsert();
    $id = $this->model->min('id');
    
    $this->model->del($id);

    $count = $this->model->count('*');
    $this->assertEquals(1, $count);
  }
}

?>
