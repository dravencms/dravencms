<?php

foreach (array('function_exists', 'version_compare', 'extension_loaded', 'ini_get') as $function) {
	if (!function_exists($function)) 
	{
		die("Error: function '$function' is required by Nette Framework and this Requirements Checker.".PHP_EOL);
	}
}

function iniFlag($var)
{
	$status = strtolower(ini_get($var));
	return $status === 'on' || $status === 'true' || $status === 'yes' || (int) $status;
}

$tests = array();

$tests[] = array(
	'title' => 'PHP version',
	'passed' => version_compare(PHP_VERSION, '5.3.0', '>='),
	'message' => PHP_VERSION,
	'description' => 'Your PHP version is too old. Nette Framework requires at least PHP 5.3.0 or higher.',
);

$tests[] = array(
	'title' => 'Memory limit',
	'message' => ini_get('memory_limit'),
);

$tests['hf'] = array(
	'title' => '.htaccess file protection',
	'description' => 'File protection by <code>.htaccess</code> is not present. You must be careful to put files into document_root folder.',
	'script' => '<script src="assets/denied/checker.js"></script> <script>displayResult("hf", typeof fileProtectionChecker == "undefined")</script>',
);

$tests['hr'] = array(
	'title' => '.htaccess mod_rewrite',
	'description' => 'Mod_rewrite is probably not present. You will not be able to use Cool URL.',
	'script' => '<script src="assets/rewrite/checker"></script> <script>displayResult("hr", typeof modRewriteChecker == "boolean")</script>',
);

$tests[] = array(
	'title' => 'Function ini_set()',
	'passed' => function_exists('ini_set'),
	'description' => 'Function <code>ini_set()</code> is disabled. Some parts of Nette Framework may not work properly.',
);

$tests[] = array(
	'title' => 'Function error_reporting()',
	'passed' => function_exists('error_reporting'),
	'description' => 'Function <code>error_reporting()</code> is disabled. Nette Framework requires this to be enabled.',
);

$tests[] = array(
	'title' => 'Curl is not installed,function curl_init() is not calable',
	'passed' => function_exists('curl_init'),
	'description' => 'Function <code>curl_init()</code> is disabled. Nette Framework requires this to be enabled.',
);

$tests[] = array(
	'title' => 'Function flock()',
	'passed' => flock(fopen(__FILE__, 'r'), LOCK_SH),
	'description' => 'Function <code>flock()</code> is not supported on this filesystem. Nette Framework requires this to process atomic file operations.',
);

$tests[] = array(
	'title' => 'Register_globals',
	'passed' => !iniFlag('register_globals'),
	'message' => 'Disabled',
	'errorMessage' => 'Enabled',
	'description' => 'Configuration directive <code>register_globals</code> is enabled. Nette Framework requires this to be disabled.',
);

$tests[] = array(
	'title' => 'Zend.ze1_compatibility_mode',
	'passed' => !iniFlag('zend.ze1_compatibility_mode'),
	'message' => 'Disabled',
	'errorMessage' => 'Enabled',
	'description' => 'Configuration directive <code>zend.ze1_compatibility_mode</code> is enabled. Nette Framework requires this to be disabled.',
);

$tests[] = array(
	'title' => 'Variables_order',
	'passed' => strpos(ini_get('variables_order'), 'G') !== FALSE && strpos(ini_get('variables_order'), 'P') !== FALSE && strpos(ini_get('variables_order'), 'C') !== FALSE,
	'description' => 'Configuration directive <code>variables_order</code> is missing. Nette Framework requires this to be set.',
);

$tests[] = array(
	'title' => 'Session auto-start',
	'passed' => session_id() === '' && !defined('SID'),
	'description' => 'Session auto-start is enabled. Nette Framework recommends not to use this directive for security reasons.',
);

$tests[] = array(
	'title' => 'Reflection extension',
	'passed' => class_exists('ReflectionFunction'),
	'description' => 'Reflection extension is required.',
);

$tests[] = array(
	'title' => 'SPL extension',
	'required' => TRUE,
	'passed' => extension_loaded('SPL'),
	'description' => 'SPL extension is required.',
);

$tests[] = array(
	'title' => 'PCRE extension',
	'passed' => extension_loaded('pcre') && @preg_match('/pcre/u', 'pcre'),
	'message' => 'Enabled and works properly',
	'errorMessage' => 'Disabled or without UTF-8 support',
	'description' => 'PCRE extension is required and must support UTF-8.',
);

$tests[] = array(
	'title' => 'ICONV extension',
	'passed' => extension_loaded('iconv') && (ICONV_IMPL !== 'unknown') && @iconv('UTF-16', 'UTF-8//IGNORE', iconv('UTF-8', 'UTF-16//IGNORE', 'test')) === 'test',
	'message' => 'Enabled and works properly',
	'errorMessage' => 'Disabled or does not work properly',
	'description' => 'ICONV extension is required and must work properly.',
);

$tests[] = array(
	'title' => 'PHP tokenizer',
	'passed' => extension_loaded('tokenizer'),
	'description' => 'PHP tokenizer is required.',
);

$tests[] = array(
	'title' => 'PDO extension',
	'passed' => $pdo = extension_loaded('pdo') && PDO::getAvailableDrivers(),
	'message' => $pdo ? 'Available drivers: ' . implode(' ', PDO::getAvailableDrivers()) : NULL,
	'description' => 'PDO extension or PDO drivers are absent. You will not be able to use <code>Nette\Database</code>.',
);

$tests[] = array(
	'title' => 'Multibyte String extension',
	'required' => FALSE,
	'passed' => extension_loaded('mbstring'),
	'description' => 'Multibyte String extension is absent. Some internationalization components may not work properly.',
);

$tests[] = array(
	'title' => 'Multibyte String function overloading',
	'passed' => !extension_loaded('mbstring') || !(mb_get_info('func_overload') & 2),
	'message' => 'Disabled',
	'errorMessage' => 'Enabled',
	'description' => 'Multibyte String function overloading is enabled. Nette Framework requires this to be disabled. If it is enabled, some string function may not work properly.',
);

$tests[] = array(
	'title' => 'GD extension',
	'passed' => extension_loaded('gd'),
	'description' => 'GD extension is absent. You will not be able to use <code>Nette\Image</code>.',
);

$tests[] = array(
	'title' => 'Fileinfo extension or mime_content_type()',
	'passed' => extension_loaded('fileinfo') || function_exists('mime_content_type'),
	'description' => 'Fileinfo extension or function <code>mime_content_type()</code> are absent. You will not be able to determine mime type of uploaded files.',
);


$errors = $warnings = FALSE;

foreach ($tests as $id => $requirement)
{
	$requirements[$id] = $requirement = (object) $requirement;
	if (isset($requirement->passed) && !$requirement->passed) {
		die('Error: '.$requirement->title.' '.$requirement->description.PHP_EOL);
	}
}

