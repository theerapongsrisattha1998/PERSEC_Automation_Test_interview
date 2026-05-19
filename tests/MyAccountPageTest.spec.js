const config = require("../config/config.js");
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../models/LoginPage.js");
const { MyAccountPage } = require("../models/MyAccountPage.js");
import { PATHS, ERROR_MESSAGES, HEADER_MESSAGES, ORDER_PACKAGE_PRICE } from "../utils/constants.js";

test.describe(" BullVPN Playwright ", () => {
  test.describe.configure({ mode: "serial" });

  let page;
  let loginPage;
  let myaccountPage;
  const time = 5000;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      recordVideo: {
        dir: "test-results/videos/",
        size: { width: 1280, height: 720 },
      },
    });
    page = await context.newPage();

    loginPage = new LoginPage(page);
    myaccountPage = new MyAccountPage(page);

    await loginPage.goto();
  });

  test("Login สำเร็จ", async () => {
    await loginPage.login(config.username, config.password);
    await expect(loginPage.page).toHaveURL(
      new RegExp(PATHS.MYACCOUNT_PAGE_PATH),
    );
  });

  test("ตรวจสอบชื่อในหน้า My Account", async () => {
    await myaccountPage.verifyUserProfile(config.username);
  });

  test("ตรวจสอบอีเมลในหน้า My Account", async () => {
    await myaccountPage.verifyUserEmail(config.email);
  });

  test("กดปุ่ม Order ในหน้า My Account", async () => {
    await myaccountPage.click(myaccountPage.orderBtn);
    await expect(page).toHaveURL(new RegExp(PATHS.ORDER_PAGE_PATH));
  });

  test("เลือก Package 2ปี ช่องทางชำระเงิน: QR Code เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packtwoYearBtn,
      myaccountPage.promtpayQrBtn,
      ORDER_PACKAGE_PRICE.TWO_YEAR_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 2ปี ช่องทางชำระเงิน: บัตร Credit เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packtwoYearBtn,
      myaccountPage.creditCardBtn,
      ORDER_PACKAGE_PRICE.TWO_YEAR_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 2ปี ช่องทางชำระเงิน: Paypal เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packtwoYearBtn,
      myaccountPage.payPalBtn,
      ORDER_PACKAGE_PRICE.TWO_YEAR_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 2ปี ช่องทางชำระเงิน: truewallet เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packtwoYearBtn,
      myaccountPage.trueWalletBtn,
      ORDER_PACKAGE_PRICE.TWO_YEAR_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 2ปี ช่องทางชำระเงิน: bank transfer เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packtwoYearBtn,
      myaccountPage.bankTransferBtn,
      ORDER_PACKAGE_PRICE.TWO_YEAR_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 ปี ช่องทางชำระเงิน: QR Code เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneYearBtn,
      myaccountPage.promtpayQrBtn,
      ORDER_PACKAGE_PRICE.ONE_YEAR_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1ปี ช่องทางชำระเงิน: บัตร Credit เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneYearBtn,
      myaccountPage.creditCardBtn,
      ORDER_PACKAGE_PRICE.ONE_YEAR_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 ปี ช่องทางชำระเงิน: Paypal เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneYearBtn,
      myaccountPage.payPalBtn,
      ORDER_PACKAGE_PRICE.ONE_YEAR_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 ปี ช่องทางชำระเงิน: truewallet เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneYearBtn,
      myaccountPage.trueWalletBtn,
      ORDER_PACKAGE_PRICE.ONE_YEAR_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 ปี ช่องทางชำระเงิน: bank transfer เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneYearBtn,
      myaccountPage.bankTransferBtn,
      ORDER_PACKAGE_PRICE.ONE_YEAR_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 เดือน ช่องทางชำระเงิน: QR Code เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneMonthBtn,
      myaccountPage.promtpayQrBtn,
      ORDER_PACKAGE_PRICE.ONE_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 เดือน ช่องทางชำระเงิน: บัตร Credit เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneMonthBtn,
      myaccountPage.creditCardBtn,
      ORDER_PACKAGE_PRICE.ONE_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 เดือน ช่องทางชำระเงิน: Paypal เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneMonthBtn,
      myaccountPage.payPalBtn,
      ORDER_PACKAGE_PRICE.ONE_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 เดือน ช่องทางชำระเงิน: truewallet เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneMonthBtn,
      myaccountPage.trueWalletBtn,
      ORDER_PACKAGE_PRICE.ONE_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 เดือน ช่องทางชำระเงิน: bank transfer เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneMonthBtn,
      myaccountPage.bankTransferBtn,
      ORDER_PACKAGE_PRICE.ONE_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 6 เดือน ช่องทางชำระเงิน: QR Code เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsixMonthBtn,
      myaccountPage.promtpayQrBtn,
      ORDER_PACKAGE_PRICE.SIX_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 6 เดือน ช่องทางชำระเงิน: บัตร Credit เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsixMonthBtn,
      myaccountPage.creditCardBtn,
      ORDER_PACKAGE_PRICE.SIX_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 6 เดือน ช่องทางชำระเงิน: Paypal เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsixMonthBtn,
      myaccountPage.payPalBtn,
      ORDER_PACKAGE_PRICE.SIX_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 6 เดือน ช่องทางชำระเงิน: truewallet เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsixMonthBtn,
      myaccountPage.trueWalletBtn,
      ORDER_PACKAGE_PRICE.SIX_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 6 เดือน ช่องทางชำระเงิน: bank transfer เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsixMonthBtn,
      myaccountPage.bankTransferBtn,
      ORDER_PACKAGE_PRICE.SIX_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 3 เดือน ช่องทางชำระเงิน: QR Code เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packthreeMonthBtn,
      myaccountPage.promtpayQrBtn,
      ORDER_PACKAGE_PRICE.THREE_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 3 เดือน ช่องทางชำระเงิน: บัตร Credit เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packthreeMonthBtn,
      myaccountPage.creditCardBtn,
      ORDER_PACKAGE_PRICE.THREE_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 3 เดือน ช่องทางชำระเงิน: Paypal เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packthreeMonthBtn,
      myaccountPage.payPalBtn,
      ORDER_PACKAGE_PRICE.THREE_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 3 เดือน ช่องทางชำระเงิน: truewallet เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packthreeMonthBtn,
      myaccountPage.trueWalletBtn,
      ORDER_PACKAGE_PRICE.THREE_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 3 เดือน ช่องทางชำระเงิน: bank transfer เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packthreeMonthBtn,
      myaccountPage.bankTransferBtn,
      ORDER_PACKAGE_PRICE.THREE_MONTH_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 7 วัน ช่องทางชำระเงิน: QR Code เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsevenDayBtn,
      myaccountPage.promtpayQrBtn,
      ORDER_PACKAGE_PRICE.SEVEN_DAY_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 7 วัน ช่องทางชำระเงิน: บัตร Credit เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsevenDayBtn,
      myaccountPage.creditCardBtn,
      ORDER_PACKAGE_PRICE.SEVEN_DAY_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 7 วัน ช่องทางชำระเงิน: truewallet เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsevenDayBtn,
      myaccountPage.trueWalletBtn,
      ORDER_PACKAGE_PRICE.SEVEN_DAY_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 7 วัน ช่องทางชำระเงิน: bank transfer เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsevenDayBtn,
      myaccountPage.bankTransferBtn,
      ORDER_PACKAGE_PRICE.SEVEN_DAY_PRICE,
      myaccountPage.checkPrice,
    );
  });

  test("กดปุ่ม My Account", async () => {
    await myaccountPage.click(myaccountPage.myAccountBtn);
    await expect(loginPage.page).toHaveURL(
      new RegExp(PATHS.MYACCOUNT_PAGE_PATH),
    );
  });

  test("Logout สำเร็จ", async () => {
    await myaccountPage.Logout(time, PATHS.LOGIN_PAGE_PATH);
  });
});
