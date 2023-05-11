declare global {
    namespace jest {
        interface Matchers<R> {
            toObjEquals(expected: any): R
        }
    }
}

expect.extend({
    toObjEquals(received, expected) {
        const pass = received.equals(expected)
        const matcherName = 'toObjEquals'
        const options = {
            isNot: this.isNot,
            promise: this.promise,
        }
        const message = pass
            ? () =>
                this.utils.matcherHint(matcherName, received, expected, options) +
                '\n\n' +
                `Expected: ${this.utils.printExpected(expected)}\n` +
                `Received: ${this.utils.printReceived(received)}`
            : () => {
                const difference = this.utils.diff(expected, received, { expand: this.expand })

                return (
                    this.utils.matcherHint(matcherName, received, expected, options) +
                    '\n\n' +
                    (difference && difference.includes('- Expect')
                        ? `Difference:\n\n${difference}`
                        : `Expected: ${this.utils.printExpected(expected)}\n` +
                        `Received: ${this.utils.printReceived(received)}`)
                )
            }

        return {
            actual: received,
            expected,
            message,
            name: matcherName,
            pass,
        }
    },
})

export {}
