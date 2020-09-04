export interface ErrorMessage {
    message: string
    stack: Array<{
      line: number
      column: number
      filename: string
    }>
  }

const varName = '[a-zA-Z0-9]+'
const url = `https?://[0-9:.]+/${varName}.js`
const lineOrColumn = '[0-9]+'
const preChrome = `at ${varName}`
const preFireFox = `${varName}@`
const errorPath = new RegExp(
    `(${preChrome} | ${preFireFox})(${url}):(${lineOrColumn}):(${lineOrColumn})`
)

export function parseError(err: Error): ErrorMessage {
    let { message, stack = '' } = err
    
    const result: ErrorMessage = {
        message, 
        stack: []
    }

    let res
    while ((res = stack.match(errorPath))) {
        const [match, filename, line, column] = res
        result.stack.push({
            filename,
            line: +line,
            column: +column
        })
        res.index && (stack = stack.substring(res.index + match.length))
    }

    return result
}