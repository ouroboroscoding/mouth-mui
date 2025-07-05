# @ouroboros/mouth-mui
[![npm version](https://img.shields.io/npm/v/@ouroboros/mouth-mui.svg)](https://www.npmjs.com/package/@ouroboros/mouth-mui) ![Custom License](https://img.shields.io/npm/l/@ouroboros/mouth-mui.svg)

Material-UI Components for interacting with the
[mouth2_oc](https://pypi.org/project/mouth2_oc/) service. It uses
[@ouroboros/mouth](https://npmjs.com/package/@ouroboros/mouth) to handle the
actual connections.

See [Releases](https://github.com/ouroboroscoding/mouth-mui/blob/main/releases.md)
for changes from release to release.

## Installation
```console
foo@bar:~$ npm install @ouroboros/mouth-mui
```

## Using mouth-mui
If you're using react with material-ui, this library provides components for
creating and editing locales and templates.

### Components
- [Locales](#locales)
- [Templates](#templates)

### Locales
`Locales` is used to setup allowable locales on the system, as well as to make
it easier to look up what locales can be chosen. It handles all C.R.U.D.
operations.

```jsx
import { Locales } from '@ouroboros/mouth-mui';
import React from 'react';
import { addError, addMessage } from 'your_module';
function MyLocalesPage(props) {
  return <Locales
    onError={addError}
    onSuccess={(type) => {
      /* type includes [
        'create', 'delete', 'update',
      ] */
      addMessage(`${type} successful!`)
    }}
  />
}
```

| Prop | Type | Optional | Description |
| ---- | ---- | -------- | ----------- |
| onError | <nobr>`error => void`</nobr> | yes | Callback for when an error occurs. `error` is a `responseErrorStruct` from [@ouroboros/body](https://www.npmjs.com/package/@ouroboros/body). |
| onSuccess | <nobr>`type => void`</nobr> | yes | Callback for when any of the following `type`s happen: 'create', 'delete', and 'update'. |

[ [top](#ouroborosmouth-mui) / [components](#components) ]

### Templates
`Templates` is used to setup named templates with individual versions per locale
and method (content). For example, you could make a template with both email
content and sms content so that depending on the user's preference you have
both. Or you could have an email with both English and Spanish content. Or you
could have all instances and have multiple locales setup for both email and sms.
The component handles creating and updating for all these variations.

```jsx
import { Templates } from '@ouroboros/mouth-mui';
import React from 'react';
import { addError, addMessage } from 'your_module';
function MyTemplatesPage(props) {
  return <Templates
    onError={addError}
    onSuccess={(type) => {
      /* type includes [
        'template_create', 'template_update',
        'content_create', 'content_update'
      ] */
      addMessage(`${type} successful!`)
    }}
  />
}
```

| Prop | Type | Optional | Description |
| ---- | ---- | -------- | ----------- |
| onError | <nobr>`error => void`</nobr> | yes | Callback for when an error occurs. `error` is a `responseErrorStruct` from [@ouroboros/body](https://www.npmjs.com/package/@ouroboros/body). |
| onSuccess | <nobr>`type => void`</nobr> | yes | Callback for when any of the following `type`s happen: 'template_create', 'template_update', 'content_create','content_update'. |

[ [top](#ouroborosmouth-mui) / [components](#components) ]
