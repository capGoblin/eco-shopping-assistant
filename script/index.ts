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
    "https://www.amazon.in/Cello-Sportigo-Plastic-Bottle-Assorted/dp/B077Z99BP2/ref=sr_1_4?keywords=Plastic+Items&qid=1708280641&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"
  );

  // Scrape product title
  const title = await page.$eval("#productTitle", (el) =>
    el?.textContent?.trim()
  );

  const overviewSection = await page.waitForSelector(
    "#productOverview_feature_div"
  );

  if (overviewSection) {
    // Expand the product overview section if collapsed
    const expandButton = await overviewSection.$(
      'div#poToggleButton a[data-action="a-expander-toggle"]'
    );
    if (expandButton) {
      await expandButton.click();
      // Wait for the expanded content to load
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Scrape the content of the section
  const productOverview = await overviewSection?.evaluate(() => {
    const attributes: { [key: string]: string } = {}; // Add type annotation for attributes object
    const rows = document.querySelectorAll("table.a-normal tr");
    rows.forEach((row) => {
      const key = row.querySelector("td.a-span3")?.textContent?.trim();
      const value = row.querySelector("td.a-span9")?.textContent?.trim();
      if (key && value) {
        attributes[key] = value;
      }
    });
    return attributes;
  });

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
  let productInfo2 = null;
  try {
    await page.waitForSelector("#productDetails_techSpec_section_2", {
      timeout: 1000,
    });
    // Scrape product information
    productInfo2 = await page.evaluate(() => {
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
      return productInformation;
    });
  } catch (error) {
    console.log(
      "The selector was not found within the timeout period, but we are proceeding anyway."
    );
  }

  // Scrape product description
  let productDescription = "";
  try {
    // Try to scrape product description from the A+ content section
    const descriptionSection = await page.waitForSelector(
      "#aplus_feature_div",
      { timeout: 5000 }
    );
    productDescription = (await descriptionSection?.evaluate(() => {
      const descriptionElement = document.querySelector("#aplus h2");
      if (
        descriptionElement &&
        descriptionElement.nextSibling &&
        descriptionElement.nextSibling.textContent
      ) {
        return descriptionElement.nextSibling.textContent.trim();
      }
      // return "";
    })) as string;
    // if (productDescription) {
    //   return productDescription;
    // }
  } catch (error) {
    console.log(
      "A+ content description not found, falling back to regular product description."
    );
  }

  // let productDescription = "";

  try {
    await page.waitForSelector("#productDescription p", { timeout: 1000 });
    productDescription = await page.$eval(
      "#productDescription p",
      (el) => el?.textContent?.trim() || ""
    );
  } catch (error) {
    console.log(
      "The selector was not found within the timeout period, but we are proceeding anyway."
    );
  }
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

  console.log({
    title,
    productOverview,
    aboutThisItem,
    productInfo,
    productInfo2,
    productDescription,
  });
  // Close the browser
  await browser.close();

  // Log the entire object
})();
