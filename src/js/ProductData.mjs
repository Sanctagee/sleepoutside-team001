const baseURL = import.meta.env.VITE_SERVER_URL;

<<<<<<< HEAD
async function convertToJson(res) {
=======
const mockProducts = {
  tents: [
    {
      Id: "880RR",
      Name: "Marmot Ajax Tent - 3-Person, 3-Season",
      NameWithoutBrand: "Ajax Tent - 3-Person, 3-Season",
      Image: {
        PrimaryMedium:
          "/images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg",
        PrimaryLarge:
          "/images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg",
      },
      Brand: { Name: "Marmot" },
      FinalPrice: 199.99,
      Colors: [{ ColorName: "Pale Pumpkin/Terracotta" }],
      DescriptionHtmlSimple:
        "Get out and enjoy nature with Marmot's Ajax tent.",
    },
    {
      Id: "985RF",
      Name: "The North Face Talus Tent - 4-Person, 3-Season",
      NameWithoutBrand: "Talus Tent - 4-Person, 3-Season",
      Image: {
        PrimaryMedium:
          "/images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg",
        PrimaryLarge:
          "/images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg",
      },
      Brand: { Name: "The North Face" },
      FinalPrice: 199.99,
      Colors: [{ ColorName: "Golden Oak/Saffron Yellow" }],
      DescriptionHtmlSimple:
        "Enjoy a fun night under stars with your favorite people.",
    },
  ],
  backpacks: [
    {
      Id: "BP001",
      Name: "Osprey Atmos AG 65 Backpack",
      NameWithoutBrand: "Atmos AG 65 Backpack",
      Image: {
        PrimaryMedium: "/images/backpacks/osprey-atmos-ag-65.jpg",
        PrimaryLarge: "/images/backpacks/osprey-atmos-ag-65.jpg",
      },
      Brand: { Name: "Osprey" },
      FinalPrice: 279.99,
      Colors: [{ ColorName: "Graphite Grey" }],
      DescriptionHtmlSimple: "Advanced comfort and ventilation for long hikes.",
    },
  ],
  "sleeping-bags": [
    {
      Id: "SB001",
      Name: "REI Co-op Magma 15 Sleeping Bag",
      NameWithoutBrand: "Magma 15 Sleeping Bag",
      Image: {
        PrimaryMedium: "/images/sleeping-bags/rei-magma-15.jpg",
        PrimaryLarge: "/images/sleeping-bags/rei-magma-15.jpg",
      },
      Brand: { Name: "REI Co-op" },
      FinalPrice: 229.99,
      Colors: [{ ColorName: "Deep Lichen Green" }],
      DescriptionHtmlSimple: "Warm, lightweight sleeping bag for backpacking.",
    },
  ],
  hammocks: [
    {
      Id: "HK001",
      Name: "ENO DoubleNest Hammock",
      NameWithoutBrand: "DoubleNest Hammock",
      Image: {
        PrimaryMedium: "/images/hammocks/eno-doublenest.jpg",
        PrimaryLarge: "/images/hammocks/eno-doublenest.jpg",
      },
      Brand: { Name: "ENO" },
      FinalPrice: 69.99,
      Colors: [{ ColorName: "Slate Blue" }],
      DescriptionHtmlSimple:
        "Comfortable two-person hammock for camping and relaxing.",
    },
  ],
};

function convertToJson(res) {
>>>>>>> wpl--individual3
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
  }
}

export default class ProductData {
<<<<<<< HEAD
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  
  async findProductById(id) {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
=======
  constructor() {}

  async getData(category) {
    try {
      console.log(`🔄 Attempting to fetch ${category} from API...`);
      const url = `${baseURL}products/search/${category}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await convertToJson(response);
        console.log(`✅ Successfully fetched ${category} from API`);
        return data.Result || [];
      } else {
        throw new Error(`API returned ${response.status}`);
      }
    } catch (error) {
      console.log(
        `❌ API failed for ${category}, using mock data:`,
        error.message,
      );
      // Fallback para dados mock
      return mockProducts[category] || [];
    }
  }

  async findProductById(id) {
    try {
      console.log(`🔄 Attempting to fetch product ${id} from API...`);
      const url = `${baseURL}product/${id}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await convertToJson(response);
        console.log(`✅ Successfully fetched product ${id} from API`);
        return data.Result;
      } else {
        throw new Error(`API returned ${response.status}`);
      }
    } catch (error) {
      console.log(
        `❌ API failed for product ${id}, using mock data:`,
        error.message,
      );
      // Fallback: encontrar o produto nos dados mock
      for (const category in mockProducts) {
        const product = mockProducts[category].find((p) => p.Id === id);
        if (product) return product;
      }
      return null;
    }
>>>>>>> wpl--individual3
  }
}
