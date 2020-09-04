import { parseError } from '../src/index'

test('test', () => {
    const error1: Error = {
        name: 'TypeError',
        message: 'Error raised',
        stack: `TypeError: Error raised
          at bar http://192.168.31.8:8000/c.js:2:9
          at foo http://192.168.31.8:8000/b.js:4:15
          at calc http://192.168.31.8:8000/a.js:4:3
          at <anonymous>:1:11
          at http://192.168.31.8:8000/a.js:22:3`,
    }
    const ans1 = {
        message: 'Error raised',
        stack: [
            { line: 2, column: 9, filename: 'http://192.168.31.8:8000/c.js' },
            { line: 4, column: 15, filename: 'http://192.168.31.8:8000/b.js' },
            { line: 4, column: 3, filename: 'http://192.168.31.8:8000/a.js' },
            { line: 22, column: 3, filename: 'http://192.168.31.8:8000/a.js' },
        ],
    }

    expect(parseError(error1)).toStrictEqual(ans1)

    const error2: Error = {
        name: 'Error',
        message: '',
        stack: `
      bar@http://192.168.31.8:8000/c.js:2:9
      foo@http://192.168.31.8:8000/b.js:4:15
      calc@http://192.168.31.8:8000/a.js:4:3
      <anonymous>:1:11
      http://192.168.31.8:8000/a.js:22:3`,
    }

    const ans2 = {
        message: '',
        stack: [
            { line: 2, column: 9, filename: 'http://192.168.31.8:8000/c.js' },
            { line: 4, column: 15, filename: 'http://192.168.31.8:8000/b.js' },
            { line: 4, column: 3, filename: 'http://192.168.31.8:8000/a.js' },
            { line: 22, column: 3, filename: 'http://192.168.31.8:8000/a.js' },
        ],
    }
    expect(parseError(error2)).toStrictEqual(ans2)
})