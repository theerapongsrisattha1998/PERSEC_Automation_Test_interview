const config = require("../config/config.js");
const { test, expect } = require("@playwright/test");

class MyAccountPage {
  constructor(page) {
    this.page = page;
    this.usernameAcc = page.locator("p.username.py-1");
    this.emailAcc = page.locator("p.email.pb-1");
    this.myAccountMenu = page.locator(".navbar-nav").getByText("My Account");
    this.myAccountBtn = page.getByRole("link", {
      name: "My Account",
      exact: true,
    });
    this.manageDeviceMenu = page
      .locator(".navbar-nav")
      .getByText("Manage device");
    this.wireguardMenu = page
      .locator(".navbar-nav")
      .getByText("WireGuard (Beta)");
    this.changePasswordMenu = page
      .locator(".navbar-nav")
      .getByText("Change Password");
    this.loginTVMenu = page
      .locator(".navbar-nav")
      .getByText("Login on the TV.");
    this.invoiceMenu = page.locator(".navbar-nav").getByText("Invoice");
    this.affiliateMenu = page
      .locator(".navbar-nav")
      .getByText("Affiliate Program");
    this.logoutMenu = page.locator('a[data-target="#modal-confirm-logout"]');
    this.confirmlogoutBtn = page.locator(".modal-delete-device-confirm");
    this.orderBtn = page.locator('a.profile-btn:has-text("Order")');
    this.packtwoYearBtn = page.locator("#price-item-79");
    this.packoneYearBtn = page.locator("#price-item-1");
    this.packoneMonthBtn = page.locator("#price-item-4");
    this.packsixMonthBtn = page.locator("#price-item-2");
    this.packthreeMonthBtn = page.locator("#price-item-3");
    this.packsevenDayBtn = page.locator("#price-item-77");
    this.promtpayQrBtn = page.locator("#headingQr");
    this.creditCardBtn = page.locator("#headingCard");
    this.payPalBtn = page.locator("#headingPaypal");
    this.trueWalletBtn = page.locator("#headingTw");
    this.bankTransferBtn = page.locator("#headingBank");
    this.checkPrice = page.locator(".summary-amount");
  }

  async clickTapMenu(tabMenu, page_path) {
    await tabMenu.click();
    await expect(this.page).toHaveURL(new RegExp(page_path));
  }

  async verifyPackageAndPayment(
    packageBtn,
    paymentTabBtn,
    expectedPrice,
    checkPriceLocator,
  ) {
    await expect(packageBtn).toBeVisible();
    await packageBtn.scrollIntoViewIfNeeded();

    await packageBtn.click();

    await expect(paymentTabBtn).toBeVisible();
    await paymentTabBtn.scrollIntoViewIfNeeded();
    await paymentTabBtn.click();

    const activePriceLocator = checkPriceLocator.locator("visible=true");
    await expect(activePriceLocator).toBeVisible();

    const priceText = await activePriceLocator.innerText();
    expect(priceText).toContain(expectedPrice);
  }

  async Logout(timeout, loginPagePath) {
    await this.logoutMenu.click();

    await expect(this.confirmlogoutBtn).toBeVisible({ timeout });

    await this.confirmlogoutBtn.click();
    await expect(this.page).toHaveURL(new RegExp(loginPagePath));
  }

  async verifyUserProfile(expectedUsername) {
    await expect(this.usernameAcc).toBeVisible();
    await expect(this.usernameAcc).toHaveText(expectedUsername);
  }

  async verifyUserEmail(expectedEmail) {
    await expect(this.emailAcc).toBeVisible();
    await expect(this.emailAcc).toContainText(expectedEmail);
  }

  async click(elementLocator) {
    await expect(elementLocator).toBeVisible();
    await elementLocator.click();
  }
}
module.exports = { MyAccountPage };
