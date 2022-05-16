# Lighthouse

## Table of Contents

```
0. 前提
1. lighthouseをProjectに入れる
2. Cypress Commandを追加する
```

## 0. 前提

```
lighthouse
  version "9.6.1"
cypress
  version "9.6.1"
typescript
  version "4.6.4"
```

## 1. lighthouseをProjectに入れる

```
$ yarn add lighthouse
```

## 2. lighthouseコマンドを追加する

`cypress/support/commands`以下に新しいコマンドを記載する。

```cypress/support/commands
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    lighthouse(url: string): Promise<any>
  }
}

Cypress.Commands.add("lighthouse", (url: string) => {
  // https://github.com/GoogleChrome/lighthouse#using-the-node-cli
  cy.exec(`lighthouse ${url} --output json --chrome-flags="--headless"`).then(({ stdout }) => {
    const { categories, ...data } = JSON.parse(stdout)
    console.log(categories, data)
    return Object.keys(categories).reduce((curr, key) => {
      return {
        ...curr,
        [key]: categories[key].score
      }
    }, {});
  });
})
```


```cypress/integration/sample.spec.ts
describe("", () => {
    beforeEach(() => {
        cy.visit("/")
    })

    it("/", () => {
        cy.location().url().should("include", "/")
        cy.lighthouse("http://localhost:3000").then(res => {
            cy.wrap(res).its("accessibility").should("gt", 0.9)
            cy.wrap(res).its("best-practices").should("gt", 0.9)
            cy.wrap(res).its("performance").should("gt", 0.9)
            cy.wrap(res).its("pwa").should("gt", 0.9)
            cy.wrap(res).its("seo").should("gt",0.9)
        });
    })
})

```

上記のように対応するとScoreの計測が可能です。
ですが、めちゃめちゃ遅い。

Github ActionsでCloneを利用すれば、いくらか対応策はありそうです。。。