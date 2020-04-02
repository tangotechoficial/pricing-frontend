import {Pipe} from '@angular/core'

export function  mockPipe(options: Pipe) {
      const metadata: Pipe = {
        name: options.name
      }
      return <any>Pipe(metadata)(class MockPipe {
        transform(args: any): any {
          return args
        }
      })
  }
