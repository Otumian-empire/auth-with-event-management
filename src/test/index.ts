import autocannon from "autocannon";

const config = {
    url: "http://localhost:3000",
    connections: 5, // Lowering to 5 to avoid OS socket limits during testing
    duration: 10,
    setupRequest: (request: any) => {
        const uniqueId = Math.floor(Math.random() * 1000000);
        const timestamp = Date.now();

        const body = JSON.stringify({
            firstName: "Daniel",
            lastName: "Samson",
            email: `stress.${uniqueId}.${timestamp}@gmail.com`,
            password: "DannyPass1234$",
        });

        request.body = body;
        // CRITICAL FIX: Update the Content-Length header to match the new body
        request.headers["Content-Length"] = Buffer.byteLength(body);

        return request;
    },
    requests: [
        {
            method: "POST",
            path: "/auth/sign-up",
            headers: {
                "Content-Type": "application/json",
            },
        },
    ],
};

const instance = autocannon(config as any, (err, result) => {
    if (err) {
        console.error("Autocannon Error:", err);
    } else {
        console.log("\n--- Stress Test Audit ---");
        console.log(`Total Requests: ${result.requests.total}`);
        console.log(`Successful (2xx): ${result["2xx"]}`);
        console.log(`Errors: ${result.errors}`);
        console.log(`Avg Latency: ${result.latency.average} ms`);
        console.log("-------------------------\n");
    }
});

autocannon.track(instance, { renderProgressBar: true });
