<!-- Hero Car Image Graphic Banner -->
    <div class="design-graphic" style="background: url('<?= APP_URL ?? '' ?>/img/hero_car.png') center/cover no-repeat; align-items: center; justify-content: center; flex-direction: column; text-align: center; box-shadow: inset 0 0 100px rgba(0,0,0,0.5);">
        <h1 style="color: #FFF; font-size: 38px; font-weight: 800; text-shadow: 0 4px 12px rgba(0,0,0,0.8); margin: 0; letter-spacing: -0.5px;"><?= $lang->get('welcome_msg') ?? 'Welcome' ?></h1>
        <p style="color: #8EB9FF; font-size: 16px; margin-top: 8px; margin-bottom: 0px; font-weight: 500; text-shadow: 0 2px 4px rgba(0,0,0,0.8);"><?= $lang->get('welcome_bio') ?? 'Manage all your rental agreements with ease.' ?></p>
    </div>

    <!-- Tags -->
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1.5rem;">
        <a href="<?= APP_URL ?? '' ?>/page/car-rental-agreement" class="design-pill" style="text-decoration: none;"><?= $lang->get('car_rental') ?? 'Car Rental Agreement' ?></a>
        <a href="<?= APP_URL ?? '' ?>/page/boat-rental-agreement" class="design-pill" style="text-decoration: none;"><?= $lang->get('boat_rental') ?? 'Boat Rental Agreement' ?></a>
        <a href="<?= APP_URL ?? '' ?>/page/equipment-rental-agreement" class="design-pill" style="text-decoration: none;"><?= $lang->get('equip_rental') ?? 'Equipment Rental Agreement' ?></a>
    </div>

    <!-- Legal Pages Content -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        <a href="<?= APP_URL ?? '' ?>/page/terms" class="design-message interactive" style="text-decoration: none; display: flex; flex-direction: column;">
            <strong style="color: #8C8C91; font-size: 17px; margin-bottom: 6px;"><?= $lang->get('terms_of_use') ?? 'Terms of Service' ?></strong>
            <span style="font-size: 14px; color: #BDBDBD;"><?= $lang->get('terms_desc') ?? 'Review the rules and guidelines for using the platform.' ?></span>
        </a>
        <a href="<?= APP_URL ?? '' ?>/page/accessibility" class="design-message interactive" style="text-decoration: none; display: flex; flex-direction: column;">
            <strong style="color: #8C8C91; font-size: 17px; margin-bottom: 6px;"><?= $lang->get('accessibility') ?? 'Accessibility Statement' ?></strong>
            <span style="font-size: 14px; color: #BDBDBD;"><?= $lang->get('accessibility_desc') ?? 'Our ongoing commitment to digital accessibility for all users.' ?></span>
        </a>
        <a href="<?= APP_URL ?? '' ?>/page/privacy" class="design-message interactive" style="text-decoration: none; display: flex; flex-direction: column;">
            <strong style="color: #8C8C91; font-size: 17px; margin-bottom: 6px;"><?= $lang->get('privacy') ?? 'Privacy Statement' ?></strong>
            <span style="font-size: 14px; color: #BDBDBD;"><?= $lang->get('privacy_desc') ?? 'Information on how we collect, use, and protect your data.' ?></span>
        </a>
        <a href="<?= APP_URL ?? '' ?>/page/cookie" class="design-message interactive" style="text-decoration: none; display: flex; flex-direction: column;">
            <strong style="color: #8C8C91; font-size: 17px; margin-bottom: 6px;"><?= $lang->get('cookie') ?? 'Cookie Statement' ?></strong>
            <span style="font-size: 14px; color: #BDBDBD;"><?= $lang->get('cookie_desc') ?? 'Details regarding our use of cookies and tracking tech.' ?></span>
        </a>
    </div>
