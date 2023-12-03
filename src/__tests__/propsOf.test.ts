import { propsOf, getMissingProps } from '../utils/propsOf'
import { describe, test, expect } from "vitest"
describe("utils/propsOf", () => {
    test("propsOf()", () => {
        let subject = {
            a: "b",
            c: {
                b: "a",
                d: "r",
                dbcs: {
                    x: "fdx",
                    xcd: "xdds"
                }
            }
        }
        let props = propsOf(subject)
        console.log(props)
        expect(props).toContain("a")
        expect(props).toContain("c.b")
        expect(props).toContain("c.d")
        expect(props).toContain("c.dbcs")
    })
    test("getMissingProps()", () => {
        let subject = {
            c: "D",
            a: "dsxd",
            bv: "vVv",
            d: {
                s: "Sx"
            }
        }
        let nonMissingProps = ["c","b","d.s"]
        let missingProps = getMissingProps(nonMissingProps, subject)
        console.log(missingProps)
        expect(missingProps).not.toContain("c")
        expect(missingProps).not.toContain("b")
        expect(missingProps).not.toContain("d.s")
        expect(missingProps).toContain("a")
        expect(missingProps).toContain("bv")
    })
})

