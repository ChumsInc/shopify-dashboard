<?php
/**
 * @package Chums
 * @subpackage Routings
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2012, steve
 */

use chums\ui\WebUI2;
use chums\user\Groups;

require_once ("autoload.inc.php");

/**
 *
 * Helpful hint for PHPStorm: set PHP Include Path to /includes of project intranet.chums.com
 */
$ui = new WebUI2([
    'requiredRoles' => [Groups::WEB_ADMIN],
    'title' => "Shopify Dashboard",
    'description' => "",
    'bodyClassName' => 'container-fluid'
]);

$ui->addManifestJSON('public/js/manifest.json')->render();
