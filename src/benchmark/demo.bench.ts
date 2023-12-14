import Benchmark from "benchmark";

const demoSuite = new Benchmark.Suite("Demo Suite")

demoSuite
    .add("demo 1", () => 2 ** 100)
    .add("demo 2", () => 3 ** 1000)
    .on("cycle", (e: Benchmark.Event) => {
        console.log(`${demoSuite?.name}: ${e.target}`)
    })

export default {
    suites: [demoSuite]
}
