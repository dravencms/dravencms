<?php

use Nette\Application\Routers\Route;
use Nette\Application\Routers\RouteList;
use Dravencms\Model\Structure\Repository\MenuRepository;
use Salamek\Cms\SlugRouter;

/**
 * Router factory.
 */
class RouterFactory
{

    /** @var MenuRepository @inject */
    private $structureMenuRepository;

    /**
     * RouterFactory constructor.
     * @param MenuRepository $structureMenuRepository
     */
    public function __construct(MenuRepository $structureMenuRepository)
    {
        $this->structureMenuRepository = $structureMenuRepository;
    }

    /**
     * @return Nette\Application\IRouter
     */
    public function createRouter()
    {
        $router = new RouteList();

        $router[] = $admin = new RouteList('Admin');

        $admin[] = new Route('admin/index.php', 'Homepage:Homepage:default', Route::ONE_WAY);
        $admin[] = new Route('admin/[<locale [a-z]{2}>/]<presenter>/<action>[/<id [0-9]+>]', 'Homepage:Homepage:default');

        $router[] = $frontEnd = new RouteList('Front');
        $frontEnd[] = new Route('sitemap.xml', 'Seo:Sitemap:default');
        $frontEnd[] = new Route('sitemap.xsl', 'Seo:Sitemap:stylesheet');
        $frontEnd[] = new Route('robots.txt', 'Seo:Robots:default');

        $frontEnd[] = new SlugRouter('[<locale [a-z]{2}>/][<slug .*>]', $this->structureMenuRepository);
        $frontEnd[] = new Route('[<locale [a-z]{2}>/]<presenter>/<action>[/<id [0-9]+>]', []);

        return $router;
    }

}
