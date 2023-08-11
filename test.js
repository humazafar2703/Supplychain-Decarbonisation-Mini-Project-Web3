const { expect } = require("chai");

describe("SupplyChain", function() {
  it("Should add a new product and retrieve its details", async function() {
    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    const supplyChain = await SupplyChain.deploy();
    await supplyChain.deployed();

    await supplyChain.addProduct("ProductA", 100);
    const product = await supplyChain.getProduct(0);
    
    expect(product.name).to.equal("ProductA");
    expect(product.carbonFootprint.toNumber()).to.equal(100);
  });

  it("Should allow transferring product ownership", async function() {
    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    const supplyChain = await SupplyChain.deploy();
    await supplyChain.deployed();

    const [owner, addr1] = await ethers.getSigners();
    await supplyChain.addProduct("ProductB", 150);
    await supplyChain.transferProduct(0, addr1.address);

    const product = await supplyChain.getProduct(0);
    expect(product.owner).to.equal(addr1.address);
  });
});
