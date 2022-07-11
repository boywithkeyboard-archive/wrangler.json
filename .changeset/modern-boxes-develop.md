---
"@darkflare/wjson": patch
---

refactor: exclude cli from typescript compilation

Exclude CLI file from TypeScript compilation to reduce package size. No change for users since the code is internal anyway.
