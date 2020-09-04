interface StackMessage {
    line: number
    column: number
    filename: string
}

export interface ErrorMessage {
    message: string
    stack: Array<StackMessage>
}

export function parseError(err: Error): ErrorMessage {
    const stack: Array<string> = (err.stack || '').split('\n').slice(1)

    const parsedStack = stack
        .map(
            (msg: string): StackMessage => {
                const detail =
                    /([^\s|@]+\.[^\.]+)?:(\d+):(\d+)$/.exec(msg) || []
                const [, filename, line, column] = detail
                return {
                    line: Number(line),
                    column: Number(column),
                    filename: filename || '',
                }
            },
        )
        .filter((detail: StackMessage): boolean => detail.filename !== '')

    return {
        message: err.message,
        stack: parsedStack,
    }
}