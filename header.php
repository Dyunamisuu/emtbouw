<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title><?php wp_title(); ?></title>
  <?php wp_head(); ?>
</head>

<body <?php body_class() ?>>
  <header>
    <nav>
      <div class="container">
        <div class="row">
          <div class="col-12 nav-container static">

            <div class="logo">
              <a href="/" title="Home">
                <img src="<?php echo get_template_directory_uri(); ?>/images/logoipsum.svg" alt="Bedrijfs logo" />
              </a>
            </div>

            <!-- menu items (mobile and desktop)-->
            <div id="nav-items">
              <div id="cross">
                <div class="cross-line-1"></div>
                <div class="cross-line-2"></div>
              </div>
              <?php
              wp_nav_menu([
                'theme_location' => 'primary',
                'menu_class' => 'primary-nav',
              ]);
              ?>
              <div class="search">
                <form role="search" method="get" class="searchform" action="/">
                  <input type="text" placeholder="Zoek uw product.." name="s" id="s">
                  <button type="submit" class="search-btn"><i class="far fa-search"></i></button>
                </form>
              </div>
            </div>
            <!-- end menu items -->

            <div class="hamburger">
              <div class="hamburger-line"></div>
              <div class="hamburger-line"></div>
              <div class="hamburger-line"></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </nav>
  </header>
  <main>