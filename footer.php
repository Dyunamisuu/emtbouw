</main>
<footer>
  <div class="footer-main">
    <div class="container">
      <div class="reference">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-3">
            <h3>Lorum</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <h3>Lorum ipsum</h3>
            <?php wp_nav_menu([
              'menu_location' => 'footer_1',
              'menu_class' => 'footer-nav'
            ]); ?>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <h3>Ipsum lorum</h3>
            <?php wp_nav_menu([
              'menu_location' => 'footer_2',
              'menu_class' => 'footer-nav'
            ]); ?>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-footer">
    <div class="container">
      <div class="col-12 flex-around">
        <a href="<?= get_privacy_policy_url(); ?>">Privacy Policy</a>
        <a href="https://dunepebbler.nl" target="blank">Website door Dune Pebbler</a>
      </div>

    </div>
  </div>
</footer>
<?php wp_footer(); ?>
</body>

</html>