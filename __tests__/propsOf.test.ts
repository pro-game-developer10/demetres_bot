import { propsOf } from '../src/utils/propsOf'
describe("Utility functions", () => {
    test("propsOf", () => {
        let subject = {
            a: "b",
            c: {
                b: "a",
                d: "r",
                dbcs: {
                    x: "fdx",
                    xcd: {
                        xc: "s",
                        xd: {
                            f: "ff",
                            doubel_f: {
                                a: "a",
                                za: "az"
                            }
                        }
                    }
                }
            }
        }
        let props = propsOf(subject)
        console.log(props)
        expect(props).toContain("a")
        expect(props).toContain("c.b")
    },5000)
})
