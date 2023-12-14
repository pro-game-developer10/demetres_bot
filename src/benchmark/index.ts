import Benchmark from "benchmark"
import demoBenchmarks from "./demo.bench"

const argv = process.argv.slice(2)
let suites: Benchmark.Suite[] = []

if (!argv.length) {
    suites = [...demoBenchmarks.suites]
} else {
    const argNames = argv.map(arg => arg.slice(2))
    argNames.forEach(async (argName: string) => {
        if (argv.includes(`--${argName}`)) {
            const benchModule = await import(`./${argName}.bench`)
            suites.push(...benchModule.suites)
        }
    })
}

for (const suite of suites) {
    suite.run()
}
