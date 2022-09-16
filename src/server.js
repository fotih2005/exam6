const http = require("http");
const { read, write } = require("./utils/FS");

const options = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/markets") {
      res.writeHead(200, options);
      res.end(
        JSON.stringify({
          status: 200,
          data: read("markets.json"),
        })
      );
    }

    let params = req.url.split("/")[2];

    if (req.url == `/markets/${params}`) {
      if (read("markets.json").find((e) => e.id == params)) {
        let data = read("markets.json").find((e) => e.id == params);
        data.barnches = read("branches.json").filter(
          (e) => e.marketId === +params
        );
        let workers = read("workers.json");
        let products = read("products.json");
        data.barnches.map((e) =>
          workers.filter((v) => e.id == v.branchId)
            ? (e.worker = workers.filter((v) => v.branchId == e.id))
            : "Ishchilar yo`q"
        );
        data.barnches.map((e) =>
          products.filter((v) => e.id == v.branchId)
            ? (e.product = products.filter((v) => v.branchId == e.id))
            : "Productlar yo`q"
        );

        res.writeHead(200, options);
        res.end(
          JSON.stringify({
            status: 200,
            data,
          })
        );
        return;
      }
      res.writeHead(400, options);
      res.end(
        JSON.stringify({
          status: 400,
          message: "Market not found",
        })
      );
    }

    if (req.url == `/branches/${params}`) {
      const branches = read("branches.json");
      if (branches.filter((e) => e.id === +params)) {
        let branch = branches.filter((e) => e.id === +params);
        res.writeHead(200, options);
        res.end(
          JSON.stringify({
            status: 200,
            data: branch,
          })
        );
      }
    }

    if (req.url === `/products/${params}`) {
      const products = read("products.json");
      if (products.filter((e) => e.id === +params)) {
        let product = products.filter((e) => e.branchId === +params);
        res.writeHead(200, options);
        res.end(
          JSON.stringify({
            status: 200,
            data: product,
          })
        );
      }
    }

    if (req.url === `/workers/${params}`) {
      const workers = read("workers.json");
      if (workers.filter((e) => e.id === +params)) {
        let worker = workers.filter((e) => e.branchId === +params);
        res.writeHead(200, options);
        res.end(
          JSON.stringify({
            status: 200,
            data: worker,
          })
        );
      }
    }
  }

  if (req.method === "POST") {
    if (req.url === "/market") {
      req.on("data", (chunk) => {
        const { name } = JSON.parse(chunk);
        console.log(name);
        const allMarkets = read("markets.json");

        allMarkets.push({ id: allMarkets.at(-1)?.id + 1 || 1, name });

        const newMarket = write("markets.json", allMarkets);

        if (newMarket) {
          res.writeHead(201, options);
          res.end(
            JSON.stringify({
              status: 201,
              message: "Yangi market yaratildi",
            })
          );
        }
      });
    }

    if (req.url === "/branch") {
      req.on("data", (chunk) => {
        const { name, marketId } = JSON.parse(chunk);
        const allBranches = read("branches.json");

        allBranches.push({
          id: allBranches.at(-1)?.id + 1 || 1,
          name,
          marketId,
        });

        const newBranch = write("branches.json", allBranches);

        if (newBranch) {
          res.writeHead(201, options);
          res.end(
            JSON.stringify({
              status: 201,
              message: "Yangi branch yaratildi",
            })
          );
        }
      });
    }

    if (req.url === "/products") {
      req.on("data", (chunk) => {
        const { name, branchId } = JSON.parse(chunk);
        const allProducts = read("products.json");

        allProducts.push({
          id: allProducts.at(-1)?.id + 1 || 1,
          name,
          branchId,
        });

        const newProduct = write("products.json", allProducts);

        if (newProduct) {
          res.writeHead(201, options);
          res.end(
            JSON.stringify({
              status: 201,
              message: "Product qo`shildi",
            })
          );
        }
      });
    }

    if (req.url === "/workers") {
      req.on("data", (chunk) => {
        const { name, age, experience, salary, branchId } = JSON.parse(chunk);
        const allWorkers = read("workers.json");

        allWorkers.push({
          id: allWorkers.at(-1)?.id + 1 || 1,
          name,
          age,
          experience,
          salary,
          branchId,
        });

        const newWorker = write("workers.json", allWorkers);

        if (newWorker) {
          res.writeHead(201, options);
          res.end(
            JSON.stringify({
              status: 201,
              message: "Product qo`shildi",
            })
          );
        }
      });
    }
  }

  if (req.method === "PUT") {
    let params = req.url.split("/")[2];
    if (req.url === `/merkets/${params}`) {
      req.on("data", (chunk) => {
        const { name } = JSON.parse(chunk);
        console.log(read("markets.json"));
        const markets = read("markets.json");

        markets.find((e) => e.id == params).name = name;
        console.log(markets);

        write("markets.json", markets);

        res.end("Marketning nomi o`zgartirildi");
      });
    }

    if (req.url === `/branches/${params}`) {
      req.on("data", (chunk) => {
        const { name } = JSON.parse(chunk);
        const branches = read("branches.json");

        branches.find((e) => e.id == params).name = name;

        write("branches.json", branches);

        res.end("branch o`zgartirildi");
      });
    }

    if (req.url === `/products/${params}`) {
      req.on("data", (chunk) => {
        const { name } = JSON.parse(chunk);
        const products = read("products.json");

        products.find((e) => e.id == params).name = name;

        write("products.json", products);

        res.end("product o`zgartirildi");
      });
    }
  }

  if(req.method === 'DELETE'){
    let params = req.url.split("/")[2];
    if(req.url === `/markets/${params}`){
      let markets = read('markets.json')
      let filteredMarkets = markets.filter(e => e.id !== +params)
      console.log(filteredMarkets);
    }
  }
});

server.listen(9090, console.log(9090));