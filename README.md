# Node SLF Logging Adapter
[![npm version](https://badge.fury.io/js/@msamblanet%2Fnode-slf.svg)](https://badge.fury.io/js/@msamblanet%2Fnode-slf)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This project provides a logging framework abstraction.  The name is based off of slf4j.  While similar libraries exist, none of them seem to have the logging frameworks I keep bumpping into and most do not support logging context objects.

Construct the LogAdapter of your choice and use it.  If you need to change logging frameworks, you only need to change the adapter initialization and the rest of your code remains unchanged.

- Notable Features:
  - Supports logging context data for the individual logs.
  - Supports child loggers, but assumes all names are ```:``` delimited.
  - Supports wrapping back into a console-like object for use by other libraries
- Supported Frameworks:
  - Console (or console-like adapters)
  - [debug](https://www.npmjs.com/package/debug)
  - [pino](https://www.npmjs.com/package/pino)
  - [roarr](https://www.npmjs.com/package/roarr)
  - [tslog](https://www.npmjs.com/package/tslog)


## Example Usage

```typescript
// Example initializing with the console
import { ConsoleLogAdapter } from "@msamblanet/node-slf";
const log = new ConsoleLogAdapter();

// Example initializing with debug
import debug from "debug";
import { DebugLogAdapter } from "@msamblanet/node-slf";
const log = new DebugLogAdapter("name", debug);

// Example initializing with pino
import pino from "pino";
import { PinoLogAdapter } from "@msamblanet/node-slf";
const log = new PinoLogAdapter({ pino() });

// Example initializing with roarr
import { Roarr } from "roarr";
import { RoarrLogAdapter } from "@msamblanet/node-slf";
const log = new RoarrLogAdapter(Roarr);

// Example initializing with tslog
import { Logger } from "tslog";
import { TsLogAdapter } from "@msamblanet/node-slf";
const log = new TsLogAdapter({ log: new Logger() });

// Sample usage examples
import { BaseLogAdapter } from "@msamblanet/node-slf";

if (log.isLevelEnabled('silly')) log.silly();
if (log.isLevelEnabled(BaseLogAdapter.LOG_LEVEL_TRACE)) log.trace("Trace");
log.debug({ a: 42 });
log.info("Message %s %o", "Foo", { bar: 12 });
log.warn({ a: 42 }, "Message - %s", "FooBar");
log.error("Message");
log.fatal("...");

// This child logger will have :bar appended to the name
// Details of what this does vary by logger
const childLog = log.getChild("bar");

// Get a console-like object to use in another app
// Note that this is mostly but not 100% functional - some less common methods noop
const consoleLike = log.toConsole();
```
## API

For now, see the source code

## Other Notes

- The core focus of this library is adaptability for normal business applications.  It is not focused on performance although I've tried be reasonable.  Suggestions on performance improvements are welcome but usabilty is a larger concern for this library.

### @msamblanet/node-project-template

This project uses [@msamblanet/node-project-template](https://github.com/msamblanet/node-project-template) to provide boilerplate project content.  See the documentation of that project for details on updating the templated components.
