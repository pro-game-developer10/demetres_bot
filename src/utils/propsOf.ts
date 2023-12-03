type PropsFoundStatus = {
    finished: true,
    props: string[]
} | {
    finished: false,
    props: string[],
    objProps: string[]
}
export function propsOf(proppedObj: Record<string, unknown>, prefix?: string): string[] {
    const topLevelPropsResult: PropsFoundStatus = topLevelPropsOf(proppedObj)
    if (topLevelPropsResult.finished) return prefixify(topLevelPropsResult.props, prefix)
    else {
        const objProps = prefixify(topLevelPropsResult.objProps, prefix)
        const subLevelPropResults: PropsFoundStatus[] = objProps.map(prop => topLevelPropsOf(proppedObj[prop] as Record<string, unknown>, prefixifySingleProp(prop)))
        const propLists = {
            finished: [] as string[],
            unfinished: [] as string[],
        }
        subLevelPropResults.forEach(result => {
            if (result.finished) propLists.finished.push(result.props.join(","))
            else {
                propLists.finished.push(result.props.join(","))
                propLists.unfinished.push(result.objProps.join(","))
            }
        })
        propLists.finished = joinListArrays(...propLists.finished)
        propLists.unfinished = joinListArrays(...propLists.unfinished)
        // TODO: Make propsOf() infinitely deep
        return [...prefixify(topLevelPropsResult.props, prefix),...propLists.finished,...propLists.unfinished]
    }
}
export function getMissingProps(propList: string[], proppedObj: Record<string, unknown>): string[] {
    const fullProps = propsOf(proppedObj)
    const missingProps = fullProps.filter(prop => !propList.includes(prop))
    return missingProps
}
function joinListArrays(...lists: string[]): string[] {
    const results: string[] = []
    lists.forEach(list => {
        list.split(",").forEach(element => {
            results.push(element)
        })
    })
    return results
}
export function prefixify(propsArr: string[], prefix?: string): string[] {
    return prefix ? propsArr.map(prop => prefix + "." + prop) : propsArr
}
export function prefixifySingleProp(prop: string, prefix?: string): string {
    return prefix ? prefix + "." + prop : prop
}
function topLevelPropsOf(proppedObj: Record<string, unknown>, prefix?: string): PropsFoundStatus {
    const propsAll = Object.keys(proppedObj ?? {})
    const objProps = propsAll.filter(prop => typeof proppedObj[prop] === "object")
    const nonObjProps = propsAll.filter(prop => !objProps.includes(prop))
    return objProps.length === 0
        ? {
            finished: true,
            props: prefix ? nonObjProps.map(prop => prefix + "." + prop) : nonObjProps,
        }
        : {
            finished: false,
            props: prefix ? nonObjProps.map(prop => prefix + "." + prop) : nonObjProps,
            objProps: prefix ? objProps.map(prop => prefix + "." + prop) : objProps,
        }
}
