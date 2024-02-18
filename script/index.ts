import puppeteer from "puppeteer";
interface Product {
  title: string;
  imgSrc: string;
  price: string;
}

interface Site {
  id: number;
  name: string;
  products: Product[];
}

interface MyComponentProps {
  sites: Site[];
}
const productName = process.argv[2]; // Get productName from command-line arguments
(async () => {
  // console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    userDataDir: "C:\\Users\\dhars\\AppData\\Local\\Google\\Chrome\\User Data",
    args: ["--profile-directory=Default", "--no-sandbox"],
  });
  // console.log("Browser launched successfully!");
  // const browser = await puppeteer.launch({
  //   //   "C:\\Users\\dhars\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1",
  //   headless: false, // Launch a visible browser
  //   executablePath:
  //     "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Path to your installed Chrome browser

  //   userDataDir: `C:\\Users\\dhars\\AppData\\Local\\Google\\Chrome\\User Data`,
  //   args: [
  //     "--profile-directory=Profile 1",
  //     // "--no-sandbox",
  //     // "--disable-features=ImprovedCookieControls",
  //     // "--disable-setuid-sandbox",
  //   ],
  //   // args: [
  //   //   //   "--disable-extensions-except=/path/to/my/extension",
  //   //   //   "--load-extension=/path/to/my/extension",
  //   //   "--user-data-dir=C:\\Users\\dhars\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1",
  //   //   //'--profile-directory=Profile 1'
  //   // ],
  //   // userDataDir:
  // });

  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.com/gp/product/B0B25LQQPC/ref=ox_sc_act_title_1?smid=ATVPDKIKX0DER&th=1"
  );

  // Scrape product title
  const title = await page.$eval("#productTitle", (el) =>
    el?.textContent?.trim()
  );

  // Scrape "About this item" section
  const aboutThisItem = await page.$eval(
    "#feature-bullets ul",
    (el) => el?.textContent?.trim() || ""
  );

  // Scrape product information
  const productInfo = await page.$eval(
    "#productDetails_techSpec_section_1",
    (el) => el?.textContent?.trim() || ""
  );

  await page.waitForSelector("#productDetails`_techSpec_section_2");

  // Scrape product information
  const productInfo2 = await page.evaluate(() => {
    const infoTableRows = Array.from(
      document.querySelectorAll("#productDetails_techSpec_section_2 tr")
    );
    const productInformation: { [key: string]: string } = {};

    infoTableRows.forEach((row) => {
      const key = row.querySelector("th")?.textContent?.trim();
      const value = row.querySelector("td")?.textContent?.trim();
      if (key && value) {
        productInformation[key] = value;
      }
    });
    ``;
    return productInformation;
  });

  // Scrape product description
  const productDescription = await page.$eval(
    "#productDescription p",
    (el) => el?.textContent?.trim() || ""
  );

  const witbSection = await page.waitForSelector("#whatsInTheBoxDeck");

  // Scrape the content of the section
  if (witbSection) {
    const whatsInTheBoxContent = await witbSection.evaluate(() => {
      const contentList = document.querySelectorAll("#witb-content-list li");
      const items = Array.from(contentList).map(
        (item) => item.textContent?.trim() || ""
      );
      return items;
    });
  }

  console.log({ title, aboutThisItem, productInfo, productDescription });
  console.log(productInfo2);
  // Close the browser
  await browser.close();

  // Log the entire object
})();
