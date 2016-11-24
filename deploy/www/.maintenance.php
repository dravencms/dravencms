<?php

if(isset($_GET['developer_view']))
{
  if($_GET['developer_view'] == 1)
  {
    setcookie('developer_view',true, time() + (86400 * 7));
  }
  else
  {
    setcookie('developer_view',false, time() -20);
  }
}

if((!isset($_COOKIE['developer_view']) || $_COOKIE['developer_view'] != true) && (!isset($_GET['developer_view']) || $_GET['developer_view']==0))
{
  header('HTTP/1.1 503 Service Unavailable');
  header('Retry-After: 3000');

  ?>
  <!DOCTYPE html>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">

  <style>
    body { color: #333; background: white; width: 500px; margin: 100px auto }
    h1 { font: bold 47px/1.5 sans-serif; margin: .6em 0 }
    p { font: 21px/1.5 Georgia,serif; margin: 1.5em 0 }
  </style>

  <title>Site is temporarily down for maintenance</title>

  <h1>We're Sorry / Omlouváme se</h1>

  <p>The site is temporarily down for maintenance. Please try again later.</p>
  <p>Stránka je dočasně mimo provoz z důvodu údržby. Prosím zkuste to později.</p>

  <?php

  exit();
}
