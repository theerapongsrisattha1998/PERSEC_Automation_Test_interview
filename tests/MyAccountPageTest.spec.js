const config = require("../config/config.js");
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../models/LoginPage.js");
const { MyAccountPage } = require("../models/MyAccountPage.js");
import { PATHS, ERROR_MESSAGES, HEADER_MESSAGES } from "../utils/constants.js";

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
      myaccountPage.twoyearPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 2ปี ช่องทางชำระเงิน: บัตร Credit เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packtwoYearBtn,
      myaccountPage.creditCardBtn,
      myaccountPage.twoyearPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 2ปี ช่องทางชำระเงิน: Paypal เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packtwoYearBtn,
      myaccountPage.payPalBtn,
      myaccountPage.twoyearPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 2ปี ช่องทางชำระเงิน: truewallet เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packtwoYearBtn,
      myaccountPage.trueWalletBtn,
      myaccountPage.twoyearPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 2ปี ช่องทางชำระเงิน: bank transfer เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packtwoYearBtn,
      myaccountPage.bankTransferBtn,
      myaccountPage.twoyearPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 ปี ช่องทางชำระเงิน: QR Code เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneYearBtn,
      myaccountPage.promtpayQrBtn,
      myaccountPage.oneyearPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1ปี ช่องทางชำระเงิน: บัตร Credit เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneYearBtn,
      myaccountPage.creditCardBtn,
      myaccountPage.oneyearPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 ปี ช่องทางชำระเงิน: Paypal เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneYearBtn,
      myaccountPage.payPalBtn,
      myaccountPage.oneyearPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 ปี ช่องทางชำระเงิน: truewallet เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneYearBtn,
      myaccountPage.trueWalletBtn,
      myaccountPage.oneyearPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 ปี ช่องทางชำระเงิน: bank transfer เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneYearBtn,
      myaccountPage.bankTransferBtn,
      myaccountPage.oneyearPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 เดือน ช่องทางชำระเงิน: QR Code เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneMonthBtn,
      myaccountPage.promtpayQrBtn,
      myaccountPage.onemonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 เดือน ช่องทางชำระเงิน: บัตร Credit เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneMonthBtn,
      myaccountPage.creditCardBtn,
      myaccountPage.onemonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 เดือน ช่องทางชำระเงิน: Paypal เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneMonthBtn,
      myaccountPage.payPalBtn,
      myaccountPage.onemonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 เดือน ช่องทางชำระเงิน: truewallet เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneMonthBtn,
      myaccountPage.trueWalletBtn,
      myaccountPage.onemonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 1 เดือน ช่องทางชำระเงิน: bank transfer เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packoneMonthBtn,
      myaccountPage.bankTransferBtn,
      myaccountPage.onemonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 6 เดือน ช่องทางชำระเงิน: QR Code เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsixMonthBtn,
      myaccountPage.promtpayQrBtn,
      myaccountPage.sixmonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 6 เดือน ช่องทางชำระเงิน: บัตร Credit เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsixMonthBtn,
      myaccountPage.creditCardBtn,
      myaccountPage.sixmonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 6 เดือน ช่องทางชำระเงิน: Paypal เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsixMonthBtn,
      myaccountPage.payPalBtn,
      myaccountPage.sixmonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 6 เดือน ช่องทางชำระเงิน: truewallet เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsixMonthBtn,
      myaccountPage.trueWalletBtn,
      myaccountPage.sixmonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 6 เดือน ช่องทางชำระเงิน: bank transfer เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsixMonthBtn,
      myaccountPage.bankTransferBtn,
      myaccountPage.sixmonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 3 เดือน ช่องทางชำระเงิน: QR Code เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packthreeMonthBtn,
      myaccountPage.promtpayQrBtn,
      myaccountPage.threemonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 3 เดือน ช่องทางชำระเงิน: บัตร Credit เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packthreeMonthBtn,
      myaccountPage.creditCardBtn,
      myaccountPage.threemonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 3 เดือน ช่องทางชำระเงิน: Paypal เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packthreeMonthBtn,
      myaccountPage.payPalBtn,
      myaccountPage.threemonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 3 เดือน ช่องทางชำระเงิน: truewallet เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packthreeMonthBtn,
      myaccountPage.trueWalletBtn,
      myaccountPage.threemonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 3 เดือน ช่องทางชำระเงิน: bank transfer เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packthreeMonthBtn,
      myaccountPage.bankTransferBtn,
      myaccountPage.threemonthPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 7 วัน ช่องทางชำระเงิน: QR Code เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsevenDayBtn,
      myaccountPage.promtpayQrBtn,
      myaccountPage.sevendayPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 7 วัน ช่องทางชำระเงิน: บัตร Credit เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsevenDayBtn,
      myaccountPage.creditCardBtn,
      myaccountPage.sevendayPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 7 วัน ช่องทางชำระเงิน: truewallet เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsevenDayBtn,
      myaccountPage.trueWalletBtn,
      myaccountPage.sevendayPrice,
      myaccountPage.checkPrice,
    );
  });

  test("เลือก Package 7 วัน ช่องทางชำระเงิน: bank transfer เช็คราคารวม", async () => {
    await myaccountPage.verifyPackageAndPayment(
      myaccountPage.packsevenDayBtn,
      myaccountPage.bankTransferBtn,
      myaccountPage.sevendayPrice,
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
